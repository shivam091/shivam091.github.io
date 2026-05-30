class ContactSubmission
  include Mongoid::Document

  store_in collection: "contact_submissions"

  field :name,      type: String
  field :email,     type: String
  field :message,   type: String
  field :createdAt, type: Time
end
