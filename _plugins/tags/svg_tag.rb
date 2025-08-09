# _plugins/svg_tag.rb
# frozen_string_literal: true

module Jekyll
  class SvgTag < Liquid::Tag
    SYNTAX = /
      (?<name>[a-z0-9._\/-]+)
      (?:
        \s+class:"(?<class>[^"]+)"
      )?
      (?:
        \s+size:(?<size>\d+)
      )?
      (?:
        \s+label:"(?<label>[^"]+)"
      )?
      (?:
        \s+id:"(?<id>[^"]+)"
      )?
    /ix

    def initialize(tag_name, markup, tokens)
      super
      @raw_markup = markup
    end

    def render(context)
      site = context.registers[:site]
      config = site.config["svg_tag"] || {}
      parse_markup(context, config)

      svg_path = File.join(site.source, config["directory"] || "assets/svg", @name)
      svg_path += ".svg" unless File.extname(svg_path).downcase == ".svg"

      return "<!-- SVG file #{@name} not found -->" unless File.exist?(svg_path)

      svg_content = File.read(svg_path)

      svg_content.sub!(/<svg\b([^>]*)>/i) do |match|
        existing_attrs = Regexp.last_match(1).to_s.strip

        # Build new/override attributes
        attrs = []
        attrs << "id='#{@id}'" if @id
        attrs << "class='#{merge_classes(existing_attrs)}'"
        attrs << size_attr if @size
        attrs << label_attr
        attrs << focusable_attr

        # Merge with existing attributes (avoid duplicates)
        merged_attrs = merge_attributes(existing_attrs, attrs)

        "<svg #{merged_attrs}>"
      end

      svg_content
    end

    private

    def parse_markup(context, config)
      evaluated = Liquid::Template.parse(@raw_markup).render(context)

      if evaluated.strip =~ SYNTAX
        @name  = Regexp.last_match[:name]
        extra_class = Regexp.last_match[:class]
        @size  = Regexp.last_match[:size]  || config["default_size"]
        @label = Regexp.last_match[:label]
        @id    = Regexp.last_match[:id]

        base_class = config["base_class"] || "icon"
        @class = extra_class ? "#{base_class} #{extra_class}" : base_class
      else
        raise SyntaxError,
              "Invalid syntax for svg tag. Usage: {% svg name class:\"optional\" size:24 label:\"desc\" id:\"optional-id\" %}"
      end
    end

    def merge_classes(existing_attrs)
      if existing_attrs =~ /\bclass=['"]([^'"]*)['"]/
        existing_classes = Regexp.last_match(1)
        (existing_classes.split + @class.split).uniq.join(" ")
      else
        @class
      end
    end

    def merge_attributes(existing_attrs, new_attrs)
      # Remove any duplicates where the attribute name matches
      new_hash = Hash[new_attrs.map { |a| a.split("=", 2) }]
      existing_parts = existing_attrs.split(/\s+/).reject do |attr|
        attr_name = attr.split("=", 2).first
        new_hash.key?(attr_name)
      end
      (existing_parts + new_attrs).join(" ")
    end

    def size_attr
      "width='#{@size}' height='#{@size}'"
    end

    def label_attr
      @label ? "role='img' aria-label='#{@label}'" : "aria-hidden='true'"
    end

    def focusable_attr
      "focusable='false'"
    end
  end
end

Liquid::Template.register_tag("svg", Jekyll::SvgTag)
