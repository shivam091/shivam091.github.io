# -*- frozen_string_literal: true -*-

require_relative "word_count_filter"

module Jekyll
  include WordCountFilter

  module ReadTimeFilter
    def read_time(input)
      words_per_minute = @context.registers[:site].config.dig("post", "read_time", "words_per_minute") || 200
      words = words(input)

      (words / words_per_minute.to_f).ceil
    end
  end
end

Liquid::Template.register_filter(Jekyll::ReadTimeFilter)
