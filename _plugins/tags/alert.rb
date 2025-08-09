# frozen_string_literal: true

require_relative "./../helpers/svg_helper"

module Jekyll
  class Alert < Liquid::Block
    include SvgHelper

    ICON_MAP = {
      accent: "info-circle",
      success: "bulb",
      attention: "exclamation-triangle",
      danger: "times"
    }.freeze

    SYNTAX = /
      type:"(?<type>accent|success|attention|danger)"
      (?:
        \s+dismissible:(?<dismissible>true|false)
      )?
      (?:
        \s+outlined:(?<outlined>true|false)
      )?
      (?:
        \s+markdown:(?<markdown>true|false)
      )?
    /ix

    def initialize(tag_name, markup, tokens)
      super
      @type = "accent"
      @dismissible = @outlined = @markdown = false

      if markup.strip =~ SYNTAX
        @type = ICON_MAP.key?(Regexp.last_match(:type)&.to_sym) ? Regexp.last_match(:type) : "accent"
        @dismissible = Regexp.last_match(:dismissible) == "true"
        @outlined = Regexp.last_match(:outlined) == "true"
        @markdown = Regexp.last_match(:markdown) == "true"
      end
    end

    def render(context)
      raw = super.strip
      rendered = Liquid::Template.parse(raw).render(context)

      content = @markdown ? Kramdown::Document.new(rendered).to_html : rendered

      <<~HTML
        <div class="#{classes}" role="alert" aria-live="polite" tabindex="0">
          <div class="alert-icon">
            #{alert_icon(context)}
          </div>
          <div class="alert-content">
            #{content}
          </div>
          #{dismiss_button(context)}
        </div>
      HTML
    end

    private

    def classes
      classes = ["alert", "alert-#{@type}"]
      classes << "alert-dismissible" if @dismissible
      classes << "alert-outlined" if @outlined

      classes.join(" ")
    end

    def alert_icon(context)
      <<~HTML
        #{inline_svg(context, "#{icon_href}.svg")}
      HTML
    end

    def icon_href
      ICON_MAP.fetch(@type.to_sym)
    end

    def dismiss_button(context)
      return "" unless @dismissible

      <<~HTML
        <button type="button" class="alert-dismiss" aria-label="Dismiss">
          #{inline_svg(context, "times.svg")}
        </button>
      HTML
    end
  end
end

Liquid::Template.register_tag("alert", Jekyll::Alert)
