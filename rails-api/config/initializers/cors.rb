Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch("ALLOWED_ORIGIN", "http://localhost:3000")

    resource "/api/*",
      headers: :any,
      methods: [:get, :post, :patch, :delete, :options],
      expose: [],
      max_age: 600
  end
end
