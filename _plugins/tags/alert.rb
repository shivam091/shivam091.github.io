# frozen_string_literal: true

module Jekyll
  class Alert < Liquid::Block
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
            #{alert_icon}
          </div>
          <div class="alert-content">
            #{content}
          </div>
          #{dismiss_button}
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

    def alert_icon
      <<~HTML
        <svg role="img" aria-hidden="true" focusable="false">
          <use href="/assets/img/sprite.svg#icon-#{icon_href}" />
        </svg>
      HTML
    end

    def icon_href
      ICON_MAP.fetch(@type.to_sym)
    end

    def dismiss_button
      return "" unless @dismissible

      <<~HTML
        <button type="button" class="alert-dismiss" aria-label="Dismiss">
          <svg role="img" aria-hidden="true" focusable="false">
            <use href="/assets/img/sprite.svg#icon-times" />
          </svg>
        </button>
      HTML
    end
  end
end

Liquid::Template.register_tag("alert", Jekyll::Alert)
