class City < ActiveRecord::Base
  has_many :postalcodes
  has_many :restaurants, through: :postalcodes
end
