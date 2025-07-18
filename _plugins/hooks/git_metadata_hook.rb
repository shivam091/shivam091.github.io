# frozen_string_literal: true

require "time"
require "set"

Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |post|
    path = post.path
    return unless File.exist?(path)
    return unless system("git", "ls-files", "--error-unmatch", path, out: File::NULL, err: File::NULL)

    # Full changelog with markdown support and ISO strict date+time+tz format
    log_entries = `git log --reverse --pretty="%H|%ad|%an|%ae|%B---END---" --date=iso-strict "#{path}"`

    seen = Set.new
    changelog = {}
    published_at, last_modified_at = nil

    log_entries.split("---END---").each_with_index do |entry, idx|
      parts = entry.strip.split("|", 5)
      next unless parts.size == 5

      hash, datetime_raw, author, email, message = parts.map(&:strip)
      next if seen.include?(hash) || message.empty?

      seen << hash

      begin
        datetime = Time.parse(datetime_raw).iso8601
      rescue ArgumentError
        next
      end

      published_at ||= datetime
      last_modified_at = datetime  # Last one will be latest due to `--reverse`

      date_key = datetime[0..9] # "YYYY-MM-DD"
      type = message[/^(feat|fix|refactor|chore|docs|test|style)(?=\:)/i, 1]&.downcase || "other"

      changelog[date_key] ||= []
      changelog[date_key] << {
        "hash" => hash,
        "datetime" => datetime,
        "author" => author,
        "email" => email,
        "type" => type,
        "message" => message
      }
    end

    post.data["published_at"] = published_at
    post.data["last_modified_at"] = last_modified_at
    post.data["changelog"] = changelog unless changelog.empty?
  end
end
