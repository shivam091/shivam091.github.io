# frozen_string_literal: true

module Jekyll
  module TitleifyFilter
    def titleify(input)
      site = @context.registers[:site]
      converter = site.find_converter_instance(
        Jekyll::Converters::Markdown
      )
      html = converter.convert(input.to_s).strip

      # Remove a single outer <p>...</p> with optional attributes
      if html =~ /\A<p(?:\s+[^>]*)?>(.*)<\/p>\z/m
        html = Regexp.last_match(1)
      end

      html
    end
  end
end

Liquid::Template.register_filter(Jekyll::TitleifyFilter)
