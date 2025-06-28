# frozen_string_literal: true

require "loofah"

module Jekyll
  module LazyImageFilter
    def lazyify_images(input)
      return input unless input.respond_to?(:to_s)

      doc = Loofah.fragment(input.to_s)

      doc.css("img").each do |img|
        next if img["data-src"] || !img["src"]

        original_src = img["src"]
        placeholder = "/assets/img/placeholder.svg"

        # Setup lazy attributes
        img["data-src"] = original_src
        img["src"] = placeholder unless original_src.include?("placeholder")
        img["class"] = [img["class"], "lazy"].compact.join(" ")

        # Create fallback <noscript><img></noscript>
        fallback_html = %(<noscript><img src="#{original_src}" alt="#{img["alt"]}"#{optional_attrs(img)}></noscript>)
        fallback = Loofah.fragment(fallback_html).children.first
        img.add_next_sibling(fallback)
      end

      doc.to_html
    end

    private

    def optional_attrs(img)
      %w[width height title loading].map do |attr|
        img[attr] ? %( #{attr}="#{img[attr]}") : nil
      end.compact.join
    end
  end
end

Liquid::Template.register_filter(Jekyll::LazyImageFilter)
