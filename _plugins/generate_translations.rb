# _plugins/generate_translations.rb
require 'json'
require 'fileutils'

module Jekyll
  class GenerateTranslations < Generator
    safe true
    priority :low

    def generate(site)
      locales_dir = File.join(site.source, "_data", "locales")
      output_dir = File.join(site.dest, "assets", "locales")

      FileUtils.mkdir_p(output_dir)

      Dir.glob(File.join(locales_dir, "*.y{a,}ml")).each do |file|
        locale_code = File.basename(file, File.extname(file))
        data = YAML.load_file(file)

        json_path = File.join(output_dir, "#{locale_code}.json")
        File.write(json_path, JSON.pretty_generate(data))
      end
    end
  end
end
