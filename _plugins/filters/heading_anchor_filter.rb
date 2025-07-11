# frozen_string_literal: true

require "loofah"
require "jekyll/utils"

module Jekyll
  module HeadingAnchorFilter
    def anchorify_headings(html)
      return html unless html.is_a?(String)

      # Parse with Loofah (wraps Nokogiri)
      fragment = Loofah.fragment(html)

      # Add IDs and anchors to headings
      fragment.css("h2, h3, h4, h5, h6").each do |heading|
        text = heading.text.strip
        slug = heading["id"] || Jekyll::Utils.slugify(text, mode: "default", cased: false)
        heading["id"] ||= slug

        anchor = heading.document.create_element("a", "#", {
          "href" => "##{slug}",
          "class" => "heading-anchor",
          "aria-label" => "Permalink: #{text}"
        })

        heading.add_child(anchor)
      end

      # Return transformed HTML
      fragment.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::HeadingAnchorFilter)
