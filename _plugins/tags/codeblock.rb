# frozen_string_literal: true

require_relative "./../filters/language_label_filter"
require_relative "./../filters/regex_filters"

module Jekyll
  class CodeblockBlock < Liquid::Block
    include RegexFilters, LanguageLabelFilter

    def render(context)
      highlighted_code = super.strip
      lang_label = detected_language(highlighted_code)

      <<~HTML
        <div class="code-block" tabindex="0" data-copy-code>
          <div class="code-block-header" role="region" aria-labelledby="code-lang-label">
            <div class="code-block-button-group" aria-hidden="true">
              <svg role="img" aria-hidden="true" focusable="false" class="code-block-action code-close">
                <use href="/assets/img/sprite.svg#icon-circle-fill" />
              </svg>
              <svg role="img" aria-hidden="true" focusable="false" class="code-block-action code-minimize">
                <use href="/assets/img/sprite.svg#icon-circle-fill" />
              </svg>
              <svg role="img" aria-hidden="true" focusable="false" class="code-block-action code-maximize">
                <use href="/assets/img/sprite.svg#icon-circle-fill" />
              </svg>
            </div>
            <div class="code-lang" id="code-lang-label">
              <svg role="img" aria-hidden="true" focusable="false">
                <use href="/assets/img/sprite.svg#icon-code" />
              </svg>
              <span class="visually-hidden">Code language:</span>
              #{lang_label}
            </div>
            <div class="code-actions">
              <button type="button" class="btn btn-sm btn-copy" aria-label="Copy code" data-tooltip="Copy">
                <svg role="img" aria-hidden="true" focusable="false">
                  <use href="/assets/img/sprite.svg#icon-copy" />
                </svg>
              </button>
            </div>
          </div>
          #{highlighted_code}
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag("codeblock", Jekyll::CodeblockBlock)
