# frozen_string_literal: true

require "loofah"

Jekyll::Hooks.register [:pages, :posts], :post_render do |doc|
  next unless doc.output_ext == ".html"

  # Parse with Loofah (wraps Nokogiri)
  fragment = Loofah.fragment(doc.output)

  # Limit to headers inside .post-content
  fragment.css(".post-content").each do |content_block|
    content_block.css("h2, h3, h4, h5, h6").each do |heading|
      text = heading.text.strip

      # Generate a slugified ID (safe for URLs)
      slug = text.downcase.strip.gsub(/[^\w\- ]+/, "").gsub(/\s+/, "-")

      heading["id"] ||= slug

      # Create an anchor element with class and href
      anchor = heading.document.create_element("a", "#", {
        "href" => "##{slug}",
        "class" => "header-anchor",
        "aria-label" => "Permalink: #{text}"
      })

      heading.add_child(anchor)
    end
  end

  # Replace HTML output with the transformed version
  doc.output = fragment.to_html
end
