# frozen_string_literal: true

module Jekyll
  class IconTag < Liquid::Tag
    SYNTAX = /
      (?<name>[a-z0-9_-]+)
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

    def parse_markup(context)
      evaluated = Liquid::Template.parse(@raw_markup).render(context)

      if evaluated.strip =~ SYNTAX
        @name = Regexp.last_match[:name]
        extra_class = Regexp.last_match[:class]
        @size = Regexp.last_match[:size]
        @label = Regexp.last_match[:label]
        @id = Regexp.last_match[:id]

        base_class = "icon icon-#{@name}"
        @class = extra_class ? "#{base_class} #{extra_class}" : base_class
      else
        raise SyntaxError, "Invalid syntax for icon tag. Usage: {% icon name class:\"optional\" size:24 label:\"desc\" id:\"icon-id\" %}"
      end
    end

    def render(context)
      parse_markup(context)

      <<~HTML.strip
        <svg #{id_attr} class='#{@class}' #{size_attr} #{label_attr} #{focusable_attr}>
          <use href="/assets/img/sprite.svg#icon-#{@name}" />
        </svg>
      HTML
    end

    private

    def size_attr
      @size ? "width='#{@size}' height='#{@size}'" : ""
    end

    def label_attr
      @label ? "role='img' aria-label='#{@label}'" : "aria-hidden='true'"
    end

    def id_attr
      @id ? "id='#{@id}'" : ""
    end

    def focusable_attr
      "focusable='false'"
    end
  end
end

Liquid::Template.register_tag("icon", Jekyll::IconTag)
