# # frozen_string_literal: true
#
# module Jekyll
#   class SeriesPage < Page
#     def initialize(site, base, dir, series_name, posts)
#       @site = site
#       @base = base
#       @dir  = dir
#       @name = "index.html"
#
#       self.process(@name)
#       self.read_yaml(File.join(base, '_layouts'), 'series.html')
#
#       self.data['layout'] = 'series'
#       self.data['title'] = series_name
#       self.data['series'] = series_name
#       self.data['posts'] = posts.sort_by { |p| (p.data.dig('series', 'part') || 0).to_i }
#       self.data['excerpt'] = "Posts from the “#{series_name}” blog series."
#       self.data['permalink'] = "/series/#{Jekyll::Utils.slugify(series_name)}/"
#     end
#   end
#
#   class SeriesGenerator < Generator
#     safe true
#     priority :low
#
#     def generate(site)
#       Jekyll.logger.info "▶ Series:", "Generating series pages..."
#
#       series_posts = site.posts.docs.select do |p|
#         p.data['series'].is_a?(Hash) && p.data['series']['name']
#       end
#
#       series_map = {}
#
#       series_posts.each do |post|
#         name = post.data['series']['name']
#         (series_map[name] ||= []) << post
#       end
#
#       series_map.each do |name, posts|
#         dir = File.join("series", Jekyll::Utils.slugify(name))
#         site.pages << SeriesPage.new(site, site.source, dir, name, posts)
#       end
#     end
#   end
# end


# frozen_string_literal: true

module Jekyll
  class SeriesPage < Page
    def initialize(site, base, dir, series_id, meta, posts)
      @site = site
      @base = base
      @dir  = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'series.html')

      self.data['layout'] = 'series'
      self.data['title'] = meta["title"] || series_id
      self.data['series_id'] = series_id
      self.data['series_meta'] = meta
      self.data['excerpt'] = meta["description"] || "Posts from the “#{meta["title"] || series_id}” blog series."
      self.data['cover'] = meta["cover"]

      # Order posts based on slug order from _data
      ordered_posts = (meta["parts"] || []).map do |slug|
        posts.find { |p| p.data['slug'] == slug }
      end.compact

      self.data['posts'] = ordered_posts
      self.data['permalink'] = "/series/#{series_id}/"
    end
  end

  class SeriesGenerator < Generator
    safe true
    priority :low

    def generate(site)
      Jekyll.logger.info "▶ Series:", "Generating series pages..."

      series_data = site.data["series"] || {}
      all_posts = site.posts.docs

      series_data.each do |series_id, meta|
        slugs = meta["parts"] || []

        # collect all posts matching the slugs
        posts = slugs.map do |slug|
          all_posts.find { |p| p.data['slug'] == slug }
        end.compact

        if posts.empty?
          Jekyll.logger.warn "⚠ Series '#{series_id}' has no valid posts"
          next
        end

        dir = File.join("series", series_id)
        site.pages << SeriesPage.new(site, site.source, dir, series_id, meta, posts)
      end
    end
  end
end
