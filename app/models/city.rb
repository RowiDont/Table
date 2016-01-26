class City < ActiveRecord::Base
  has_many :postalcodes
  has_many :restaurants, through: :postalcodes

  def count
    self.restaurants.count("id")
  end
end
