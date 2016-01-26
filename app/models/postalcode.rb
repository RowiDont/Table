class Postalcode < ActiveRecord::Base
  belongs_to :city
  has_many :restaurants, foreign_key: "postal_code", primary_key: "code"
end
