# frozen_string_literal: true

require_relative "./../helpers/logger_helper"

module Jekyll
  class SvgTag < Liquid::Tag
    include LoggerHelper

    def initialize(tag_name, markup, tokens)
      super
      @raw_markup = markup.strip
    end

    def render(context)
      file_name = Liquid::Template.parse(@raw_markup).render(context).strip

      site = context.registers[:site]
      config = site.config["svg_tag"] || {}

      svg_path = File.join(site.source, config["directory"] || "assets/svg", file_name)
      svg_path += ".svg" unless File.extname(svg_path).downcase == ".svg"

      if File.exist?(svg_path)
        File.read(svg_path)
      else
        warn("SVG Tag:", "File not found: #{svg_path}")
      end
    end
  end
end

Liquid::Template.register_tag("svg", Jekyll::SvgTag)
