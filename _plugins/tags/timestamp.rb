# frozen_string_literal: true

require "date"

module Jekyll
  class TimestampTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @raw_markup = markup.strip
    end

    def render(context)
      parsed_markup = Liquid::Template.parse(@raw_markup).render(context).strip
      date_str, options_str = parsed_markup.split(/\s*,\s*/, 2)

      args = extract_arguments(options_str || "")
      date = parse_date(date_str.strip)

      datetime_attr = date.strftime("%Y-%m-%dT%H:%M:%S%:z")
      display_text  = date.strftime(args["format"] || "%B %d, %Y")
      tooltip_text  = date.strftime("%a, %B %d, %Y %I:%M %p")

      html_attrs = build_attributes(
        datetime: datetime_attr,
        label: args["label"],
        wrap: args["wrap"] || "time",
        klass: args["class"],
        tooltip: args["tooltip"],
        tooltip_position: args["tooltip_position"] || "bottom",
        tooltip_text: tooltip_text
      )

      <<~HTML
        <#{html_attrs[:wrap]} #{html_attrs[:attrs].join(" ")}>
          #{display_text}
        </#{html_attrs[:wrap]}>
      HTML
    end

    private

    def extract_arguments(markup)
      args = {}

      markup.scan(/(\w+):"([^"]+)"/) do |key, value|
        args[key] = value
      end

      markup.scan(/(\w+):(true|false)/i) do |key, value|
        args[key] = value.downcase == "true"
      end

      args
    end

    def parse_date(token)
      return Time.now if token.downcase == "now"
      Time.parse(token)
    rescue
      Time.now
    end

    def build_attributes(datetime:, label:, wrap:, klass:, tooltip:, tooltip_position:, tooltip_text:)
      attrs = []
      attrs << "datetime='#{datetime}'"
      attrs << "aria-label='#{label}'" if label
      attrs << "role='time'" if wrap == "time"
      attrs << "class='#{klass}'" if klass
      if tooltip
        attrs << "data-tooltip='#{tooltip_text}'"
        attrs << "data-tooltip-position='#{tooltip_position}'"
        attrs << "tabindex='0'"
      end

      { wrap: wrap, attrs: attrs }
    end
  end
end

Liquid::Template.register_tag("timestamp", Jekyll::TimestampTag)
