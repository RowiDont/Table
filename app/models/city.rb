class City < ActiveRecord::Base
  include PgSearch

  has_many :postalcodes
  has_many :restaurants, through: :postalcodes

  # multisearchable against: :name


  def count
    self.restaurants.count("id")
  end
end
