# Create the initial admin user.
# Run with: bin/rails db:seed
# Or from console: AdminUser.create!(email: ENV["ADMIN_EMAIL"], password: "changeme123")

email    = ENV.fetch("ADMIN_EMAIL", "admin@example.com")
password = ENV.fetch("ADMIN_PASSWORD", "changeme123")

unless AdminUser.where(email:).exists?
  AdminUser.create!(email:, password:, password_confirmation: password)
  puts "Created admin user: #{email}"
else
  puts "Admin user already exists: #{email}"
end
