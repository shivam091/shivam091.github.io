# frozen_string_literal: true

require "loofah"

module Jekyll
  class TocTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
    end

    def render(context)
      page = context.registers[:page]
      content = page["content"]

      return "" unless content
      return unless page["toc"]

      @min_level = page["toc_min"]&.to_i || 2
      @max_level = page["toc_max"]&.to_i || 3

      doc = Loofah.fragment(content)
      selector = (@min_level..@max_level).map { |i| "h#{i}" }.join(",")
      headings = doc.css(selector).reject { |h| h["data-toc-skip"] }
      return "" if headings.empty?

      result = build_toc(headings)

      <<~HTML
        <div class="toc-wrapper">
          <h2 id="toc-heading">
            Table of contents
          </h2>
          <nav class="toc" aria-labelledby="toc-heading" role="doc-toc">
            #{result}
          </nav>
        </div>
      HTML
    end

    private

    def slugify(text)
      text.downcase.strip.gsub(/[^\w\- ]+/, "").gsub(/\s+/, "-")
    end

    def build_toc(headings)
      toc = +""
      stack = []
      previous_level = nil

      headings.each do |heading|
        level = heading.name[1].to_i
        text = heading.text.strip

        id = heading["id"] || slugify(text)
        heading["id"] = id

        link = <<~HTML.chomp
          <li><a href="##{id}">#{text}</a>
        HTML

        if previous_level.nil?
          toc << <<~HTML
            <ul class="toc-level toc-level-#{level}">
            #{link}
          HTML
          stack.push(level)
        elsif level > previous_level
          toc << <<~HTML
            <ul class="toc-level toc-level-#{level}">
            #{link}
          HTML
          stack.push(level)
        elsif level == previous_level
          toc << <<~HTML
            </li>
            #{link}
          HTML
        else
          while stack.any? && stack.last > level
            toc << <<~HTML
              </li>
              </ul>
            HTML
            stack.pop
          end
          toc << <<~HTML
            </li>
            #{link}
          HTML
        end

        previous_level = level
      end

      # Close remaining open tags
      toc << "</li>\n"
      stack.size.times { toc << "</ul>\n" }

      toc
    end
  end
end

Liquid::Template.register_tag("toc", Jekyll::TocTag)
