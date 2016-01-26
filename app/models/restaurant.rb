class Restaurant < ActiveRecord::Base
  has_one :city, through: :postalcode

  belongs_to :postalcode, foreign_key: "postal_code", primary_key: "code"
  
  # TODO: Add validations for when admins create restaurants
end
