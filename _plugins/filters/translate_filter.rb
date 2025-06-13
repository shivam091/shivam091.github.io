module Jekyll
  module TranslateFilter
    def t(input, locale = nil)
      site = @context.registers[:site]

      # Use locale from page, site config, or fallback to 'en'
      locale ||= @context['page']['locale'] ||
                 @context['site']['default_locale'] ||
                 'en'

      # Try to load the locale file from _data/locales/#{locale}.yml
      translations = site.data.dig('locales', locale)

      # Fallback to 'en' if not found
      fallback = site.data.dig('locales', 'en')

      if translations && translations[input]
        translations[input]
      elsif fallback && fallback[input]
        fallback[input]
      else
        "[#{input}]" # Show key if translation missing
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TranslateFilter)
