# frozen_string_literal: true

module Jekyll
  module RegexFilters
    # Finds the first regex match and returns the matched string
    def regex_find_first(input, pattern)
      return "" unless input && pattern
      match = input.match(Regexp.new(pattern))
      match ? match[0] : ""
    end

    # Optionally: return first captured group
    def regex_capture_group(input, pattern, group = 1)
      return "" unless input && pattern
      match = input.match(Regexp.new(pattern))
      match ? match[group] : ""
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegexFilters)
