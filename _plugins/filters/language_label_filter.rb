# frozen_string_literal: true

module Jekyll
  module LanguageLabelFilter
    COMMON_LANGUAGES = {
      "actionscript" => "ActionScript", "as" => "ActionScript", "as3" => "ActionScript",
      "applescript" => "AppleScript",
      "bash" => "Shell", "zsh" => "Shell", "ksh" => "Shell", "sh" => "Shell",
      "brightscript" => "BrightScript", "bs" => "BrightScript", "brs" => "BrightScript",
      "cfscript" => "CFScript", "cfc" => "CFScript",
      "clojure" => "Clojure", "clj" => "Clojure",
      "coffeescript" => "CoffeeScript", "coffee" => "CoffeeScript", "coffee-script" => "CoffeeScript",
      "cpp" => "C++",
      "cs" => "C#", "csharp" => "C#",
      "dart" => "Dart",
      "elixir" => "Elixir", "ex" => "Elixir", "exs" => "Elixir",
      "erl" => "Erlang",
      "fsharp" => "F#", "fs" => "F#", "fsi" => "F#", "fsx" => "F#",
      "go" => "Go", "golang" => "Go",
      "graphql" => "GraphQL",
      "groovy" => "Groovy", "gvy" => "Groovy", "gy" => "Groovy", "grvy" => "Groovy",
      "haskell" => "Haskell", "hs" => "Haskell",
      "html" => "HTML",
      "javascript" => "JavaScript", "js" => "JavaScript",
      "json" => "JSON",
      "julia" => "Julia", "jl" => "Julia",
      "kotlin" => "Kotlin", "kt" => "Kotlin", "kts" => "Kotlin",
      "latex" => "LaTex",
      "make" => "Makefile", "mf" => "Makefile", "gnumake" => "Makefile", "bsdmake" => "Makefile",
      "markdown" => "Markdown", "md" => "Markdown", "mkd" => "Markdown",
      "m" => "Matlab",
      "nim" => "Nim", "nimrod" => "Nim",
      "ocaml" => "OCaml", "ml" => "OCaml",
      "objective_c" => "Objective-C", "objc" => "Objective-C", "obj-c" => "Objective-C", "obj_c" => "Objective-C", "objectivec" => "Objective-C",
      "perl" => "Perl", "pl" => "Perl",
      "php" => "PHP", "php3" => "PHP", "php4" => "PHP", "php5" => "PHP",
      "powershell" => "PowerShell", "ps1" => "PowerShell", "psm1" => "PowerShell",
      "py" => "Python", "python" => "Python",
      "r" => "R",
      "rb" => "Ruby",
      "rs" => "Rust", "no_run" => "Rust", "ignore" => "Rust", "should_panic" => "Rust",
      "sass" => "Sass",
      "scala" => "Scala", "sc" => "Scala",
      "scss" => "SCSS",
      "smalltalk" => "Smalltalk", "st" => "Smalltalk", "squeak" => "Smalltalk",
      "sql" => "SQL",
      "swift" => "Swift",
      "tex" => "TeX",
      "text" => "Plain Text", "plaintext" => "Plain Text",
      "toml" => "TOML",
      "ts" => "TypeScript", "typescript" => "TypeScript",
      "vb" => "Visual Basic", "visualbasic" => "Visual Basic",
      "vue" => "Vue.js", "vuejs" => "Vue.js",
      "yaml" => "YAML", "yml" => "YAML"
    }.freeze

    EXTENDED_LANGUAGES = {
      "asciidoc" => "AsciiDoc", "adoc" => "AsciiDoc",
      "docker" => "Dockerfile", "dockerfile" => "Dockerfile",
      "diff" => "Diff", "patch" => "Diff",
      "git" => "Git", "gitconfig" => "Git",
      "ini" => "INI",
      "hcl" => "HCL", "terraform" => "Terraform", "tf" => "Terraform",
      "rst" => "reStructuredText",
      "csv" => "CSV"
    }.freeze

    UPPERCASE_LANGS = %w[c css html json scss sql toml xml yaml].freeze

    def lang_label(lang)
      return "" unless lang
      lang = lang.to_s.strip.downcase

      COMMON_LANGUAGES[lang] ||
        EXTENDED_LANGUAGES[lang] ||
        (UPPERCASE_LANGS.include?(lang) ? lang.upcase : lang.capitalize)
    end
  end
end

Liquid::Template.register_filter(Jekyll::LanguageLabelFilter)




# frozen_string_literal: true

# module Jekyll
#   module LanguageLabelFilter
#     def lang_label(lang)
#       return "" unless lang
#
#       case lang
#       when "actionscript", "as", "as3"
#         "ActionScript"
#       when "applescript"
#         "AppleScript"
#       when "brightscript", "bs", "brs"
#         "BrightScript"
#       when "cfscript", "cfc"
#         "CFScript"
#       when "coffeescript", "coffee", "coffee-script"
#         "CoffeeScript"
#       when "cpp"
#         "C++"
#       when "cs", "csharp"
#        "C#"
#       when "erl"
#         "Erlang"
#       when "graphql"
#        "GraphQL"
#       when "haskell", "hs"
#        "Haskell"
#       when "javascript", "js"
#         "JavaScript"
#       when "make", "mf", "gnumake", "bsdmake"
#         "Makefile"
#       when "md", "mkd"
#         "Markdown"
#       when "m"
#         "Matlab"
#       when "objective_c", "objc", "obj-c", "obj_c", "objectivec"
#         "Objective-C"
#       when "perl", "pl"
#         "Perl"
#       when "php","php3","php4","php5"
#         "PHP"
#       when "py"
#         "Python"
#       when "rb"
#         "Ruby"
#       when "rs","no_run","ignore","should_panic"
#         "Rust"
#       when "bash", "zsh", "ksh", "sh"
#         "Shell"
#       when "st", "squeak"
#         "Smalltalk"
#       when "tex"
#         "TeX"
#       when "latex"
#         "LaTex"
#       when "text", "plaintext"
#         "Plain Text"
#       when "ts", "typescript"
#         "TypeScript"
#       when "vb", "visualbasic"
#         "Visual Basic"
#       when "vue", "vuejs"
#         "Vue.js"
#       when "yml"
#         "YAML"
#       when "c", "css", "sql", "html", "scss", "ssh", "toml", "xml", "yaml", "json"
#         lang.upcase
#       else
#         lang.capitalize
#       end
#     end
#   end
# end
#
# Liquid::Template.register_filter(Jekyll::LanguageLabelFilter)
