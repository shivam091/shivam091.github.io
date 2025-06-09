# -*- frozen_string_literal: true -*-

module Jekyll
  module WordCountFilter
    def words(input)
      strip_html(input.to_s).split.size
    end
  end
end

Liquid::Template.register_filter(Jekyll::WordCountFilter)
