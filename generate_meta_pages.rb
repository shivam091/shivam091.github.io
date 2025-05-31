require 'yaml'
require 'fileutils'

POSTS_DIR = '_posts'
TAGS_DIR = 'tags'
CATEGORIES_DIR = 'categories'

def slugify(str)
  str.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

def extract_front_matter(filepath)
  content = File.read(filepath)
  if content =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
    YAML.safe_load($1)
  else
    {}
  end
end

def collect_metadata
  tags = Set.new
  categories = Set.new

  Dir.glob("#{POSTS_DIR}/**/*.md").each do |file|
    front_matter = extract_front_matter(file)
    Array(front_matter['tags']).each { |tag| tags << tag }
    Array(front_matter['categories']).each do |cat|
      # flatten nested categories like ["tech", "rails"] => "tech/rails"
      categories << (cat.is_a?(Array) ? cat.join('/') : cat)
    end
  end

  [tags.to_a.sort, categories.to_a.sort]
end

def write_markdown_file(dir, name, type)
  slug = slugify(name)
  path = "#{dir}/#{slug}.md"

  FileUtils.mkdir_p(dir)

  unless File.exist?(path)
    File.open(path, 'w') do |f|
      f.puts "---"
      f.puts "layout: meta"
      f.puts "#{type}: #{name.inspect}"
      f.puts "title: Posts #{type == 'tag' ? 'tagged' : 'categorized'} with '#{name}'"
      f.puts "permalink: /#{type}/#{slug}/"
      f.puts "---"
    end
    puts "Generated: #{path}"
  end
end

tags, categories = collect_metadata

tags.each { |tag| write_markdown_file(TAGS_DIR, tag, 'tag') }
categories.each { |cat| write_markdown_file(CATEGORIES_DIR, cat, 'category') }
