# frozen_string_literal: true

module Jekyll
  module SvgHelper
    # Render inline SVG via custom {% svg %} tag
    def inline_svg(context, name)
      Liquid::Template.parse("{% svg #{name} %}").render(context)
    end
  end
end
