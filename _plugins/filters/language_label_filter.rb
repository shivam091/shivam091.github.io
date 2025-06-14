# frozen_string_literal: true

require_relative "regex_filters"

module Jekyll
  include RegexFilters

  module LanguageLabelFilter
    LANGUAGE_LABELS = {
      %w[actionscript as as3] => "ActionScript",
      %w[applescript] => "AppleScript",
      %w[brightscript bs brs] => "BrightScript",
      %w[cfscript cfc] => "CFScript",
      %w[coffeescript coffee coffee-script] => "CoffeeScript",
      %w[cpp] => "C++",
      %w[cs csharp] => "C#",
      %w[erl] => "Erlang",
      %w[graphql] => "GraphQL",
      %w[haskell hs] => "Haskell",
      %w[javascript js] => "JavaScript",
      %w[make mf gnumake bsdmake] => "Makefile",
      %w[md mkd markdown] => "Markdown",
      %w[m] => "Matlab",
      %w[objective_c objc obj-c obj_c objectivec] => "Objective-C",
      %w[perl pl] => "Perl",
      %w[php php3 php4 php5] => "PHP",
      %w[powershell ps1 psm1] => "PowerShell",
      %w[py] => "Python",
      %w[rb] => "Ruby",
      %w[rs no_run ignore should_panic] => "Rust",
      %w[bash zsh ksh sh] => "Shell",
      %w[st squeak] => "Smalltalk",
      %w[tex] => "TeX",
      %w[latex] => "LaTeX",
      %w[text plaintext] => "Plain Text",
      %w[ts typescript] => "TypeScript",
      %w[vb visualbasic] => "Visual Basic",
      %w[vue vuejs] => "Vue.js",
      %w[yml] => "YAML"
    }.freeze

    UPPERCASE_LANGUAGES = %w[
      c css sql html scss ssh toml xml yaml json
    ].freeze

    def detected_language(input)
      return "" unless input

      code_lang = regex_capture_group(input, /class\s*=\s*["']language-([a-zA-Z0-9#.+-]+)["']/)
      return "" unless code_lang

      LANGUAGE_LABELS.each do |aliases, label|
        return label if aliases.include?(code_lang)
      end

      return code_lang.upcase if UPPERCASE_LANGUAGES.include?(code_lang)

      code_lang.gsub("-", " ").split.map(&:capitalize).join(" ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::LanguageLabelFilter)
