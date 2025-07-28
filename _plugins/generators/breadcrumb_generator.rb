# frozen_string_literal: true

require_relative "./../helpers/logger_helper"

module Jekyll
  class BreadcrumbsGenerator < Generator
    include LoggerHelper

    safe true
    priority :lowest

    def generate(site)
      info("▶ BreadcrumbsGenerator:", "Generating breadcrumbs")

      all_docs = site.pages + site.posts.docs
      all_docs.each do |page|
        page.data["breadcrumbs"] = generate_breadcrumbs(site, page)
      end
    end

    private

    def generate_breadcrumbs(site, page)
      crumbs = []
      crumbs << { "title" => "Home", "url" => "/" }

      if post?(page)
        crumbs << { "title" => "Posts", "url" => "/posts" }
        crumbs << { "title" => page.data["title"], "url" => page.url }
      elsif series?(page)
        crumbs << { "title" => "Series", "url" => "/series" }
        crumbs << { "title" => page.data["title"], "url" => page.permalink }
      elsif archive?(page)
        if page.type == "tag"
          crumbs << { "title" => "Tags", "url" => "/tags" }
        elsif page.type == "category"
          crumbs << { "title" => "Categories", "url" => "/categories" }
        end
        crumbs << { "title" => page.title, "url" => page.url }
      else
        crumbs << { "title" => page.data["title"], "url" => page.url }
      end

      crumbs
    end

    def post?(page)
      page.respond_to?(:collection) && page.collection.label == "posts"
    end

    def series?(page)
      page.data["layout"].to_s.eql?("series")
    end

    def archive?(page)
      page.data["layout"].to_s.eql?("archive")
    end
  end
end
