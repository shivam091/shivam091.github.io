class AdminUser
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable, :rememberable, :validatable

  field :email,               type: String, default: ""
  field :encrypted_password,  type: String, default: ""
  field :remember_created_at, type: Time
end
