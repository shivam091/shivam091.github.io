# frozen_string_literal: true

require "nokogiri"

Jekyll::Hooks.register :posts, :post_render do |post|
  next unless post.output_ext == ".html"
  img_path = post.data["img_path"]
  return unless img_path

  doc = Nokogiri::HTML::DocumentFragment.parse(post.output)
  puts "#{doc.css("img")}"
  doc.css("img").each do |img|
    src = img["src"]
    next if src.nil? || src =~ %r{^https?://} || src.start_with?("/")

    # Prepend img_path to relative images
    img["src"] = File.join(img_path, src).gsub(%r{([^:])/+}, '\1/')

    # Wrap in figure if not already
    parent = img.parent
    puts "------------> #{parent}"
    puts "#{img["src"]}"
    unless parent.name == "figure"
      figure = Nokogiri::XML::Node.new("figure", doc)
      img.remove
      figure.add_child(img)

      # Add figcaption if alt text exists
      if img["alt"] && !img["alt"].empty?
        caption = Nokogiri::XML::Node.new("figcaption", doc)
        caption.content = img["alt"]
        figure.add_child(caption)
      end

      parent.add_child(figure)
    end
  end

  post.output = doc.to_html
end
