# frozen_string_literal: true

require "uri"
require "kramdown"
require "kramdown/converter/html"

module Kramdown
  module Converter
    class HtmlExtended < Html
      GLOBAL_DIR = "auto"

      def initialize(root, options)
        super
        @global_dir = GLOBAL_DIR
      end

      class << self
        def convert(root, options)
          new(root, options).convert(root)
        end
      end

      def convert_p(el, opts)
        add_dir_attr(el)

        %Q(<p #{html_attributes(el.attr)}>#{inner(el, opts)}</p>)
      end

      def convert_img(el, indent)
        attrs = el.attr.dup
        real_src = attrs.delete("src")
        lqip_src = attrs.delete("lqip")
        alt_text = ERB::Util.html_escape(el.attr["alt"] || "")

        # Lazy loading image attributes
        lazy_attrs = {
          "alt" => alt_text,
          "class" => "lazy-img",
          "data-src" => real_src,
          "loading" => "lazy"
        }

        lazy_attrs.merge!("src" => lqip_src, "data-lqip" => true) if lqip_src

        # <img> and <noscript><img>
        lazy_img = %Q(<img #{html_attributes(lazy_attrs)} />)
        fallback_img = %Q(<noscript><img #{html_attributes(attrs.merge({"src" => real_src, "alt" => alt_text}))} /></noscript>)
        combined_html = %Q(#{lazy_img}\n#{fallback_img})

        format_as_indented_block_html("div", {"class" => "markdown-img-wrapper lazy-wrapper"}, combined_html, indent)
      end

      def convert_blockquote(el, opts)
        add_dir_attr(el)

        %Q(
          <blockquote #{html_attributes(el.attr)}>
            #{inner(el, opts)}
          </blockquote>
        )
      end

      def convert_ul(el, opts)
        add_dir_attr(el)

        %Q(
          <ul #{html_attributes(el.attr)}>
            #{inner(el, opts)}
          </ul>
        )
      end

      def convert_ol(el, opts)
        add_dir_attr(el)

        %Q(
          <ol #{html_attributes(el.attr)}>
            #{inner(el, opts)}
          </ol>
        )
      end

      def convert_header(el, indent)
        add_dir_attr(el)
        level = output_header_level(el.options[:level])

        %Q(<h#{level} #{html_attributes(el.attr)}>#{inner(el, indent)}</h#{level}>)
      end

      def convert_codespan(el, opts)
        el.attr["class"] = append_class(el.attr["class"], "highlighter-rouge notranslate")

        %Q(<code #{html_attributes(el.attr)}>#{escape_html(el.value)}</code>)
      end

      def convert_table(el, opts)
        add_dir_attr(el)
        el.attr["role"] = "table"
        el.attr["class"] = append_class(el.attr["class"], "markdown-table")

        content =
        %Q(
          <table #{html_attributes(el.attr)}>
            #{inner(el, opts)}
          </table>
        )
      end

      def convert_a(el, opts)
        href = el.attr["href"]

        if external_link?(href)
          el.attr["target"] = "_blank"
          el.attr["rel"] = append_rel(el.attr["rel"], "noopener noreferrer nofollow")
          el.attr["aria-label"] ||= "External link to #{href}"
          el.attr["class"] = append_class(el.attr["class"], "external-link")
        end

        %Q(<a #{html_attributes(el.attr)}>#{inner(el, opts)}</a>)
      end

      def convert_footnote(el, _indent)
        repeat = ""
        name = @options[:footnote_prefix] + el.options[:name]

        if (footnote = @footnotes_by_name[name])
          number = footnote[2]
          repeat = ":#{footnote[3] += 1}"
        else
          number = @footnote_counter
          @footnote_counter += 1
          @footnotes << [name, el.value, number, 0]
          @footnotes_by_name[name] = @footnotes.last
        end

        formatted_link_text = sprintf(@options[:footnote_link_text], number)

        %Q(
          <sup id="fnref:#{name}#{repeat}">
            <a href="#fn:#{name}" class="footnote" rel="footnote" role="doc-noteref" aria-describedby="footnote-label">#{formatted_link_text}</a>
          </sup>
        )
      end

      def footnote_content
        return "" if @footnotes.empty?

        ol = Element.new(:ol, nil, {class: "footnote-list"})
        attributes = {class: "footnotes", role: "doc-endnotes", dir: @global_dir}

        @footnotes.each do |name, data, *_|
          link_raw = %Q(
            <a href="#fnref:#{name}" class="reverse-footnote" aria-label="Back to reference #{name}" role="doc-backlink">&#8617;</a>
          )

          li = Element.new(:li, nil, {"id" => "fn:#{name}", class: "footnote-list-item"})
          li.children = data.children.map(&:dup)

          # Try to append the reverse link to the last paragraph
          if (last = li.children.reverse.find { |c| c.type == :p })
            last.children << Element.new(:raw, "&nbsp;")
            last.children << Element.new(:raw, link_raw)
          else
            # If no <p>, create one and append the link
            p = Element.new(:p)
            p.children << Element.new(:raw, link_raw)
            li.children << p
          end

          ol.children << Element.new(:raw, convert(li, 2))
        end

        heading = %Q(
          <h2 id="footnote-label" class="visually-hidden" dir="#{@global_dir}">Footnotes</h2>
        )
        content = heading + convert(ol, 2)

        format_as_indented_block_html("section", attributes, content, 0)
      end

      private

      def add_attr(el, key, value)
        el.attr[key] ||= value
      end

      def add_dir_attr(el)
        add_attr(el, "dir", @global_dir)
      end

      def append_class(existing, new_class)
        classes = (existing || "").split(" ")
        classes << new_class unless classes.include?(new_class)
        classes.join(" ")
      end

      def append_rel(existing, new_rel)
        values = (existing || "").split(" ")
        values << new_rel unless values.include?(new_rel)
        values.join(" ")
      end

      def external_link?(href)
        return false unless href
        return false if href.start_with?("#", "/")

        site_url = @options["site_url"] || "http://localhost"
        uri = URI.parse(href) rescue nil
        return false unless uri&.host

        URI.parse(site_url).host != uri.host
      end
    end
  end

  class Document
    def to_html_extended
      Kramdown::Converter::HtmlExtended.convert(self.root, @options)
    end
  end
end

module Jekyll
  module Converters
    class Markdown < Converter
      safe true
      priority :low

      def matches(ext)
        %w[.md .markdown].include?(ext.downcase)
      end

      def output_ext(ext)
        ".html"
      end

      def convert(content)
        configuration = @config["kramdown"].dup || {}
        configuration["site_url"] = @config["url"]

        doc = Kramdown::Document.new(content, configuration)
        doc.to_html_extended
      end
    end
  end
end
