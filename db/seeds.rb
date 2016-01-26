require_relative 'opentable_api.rb'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Make a city!
new_york = City.create!(name: "New York");

# ----------------------------- #

# Make all the zipcodes!
for i in 10001..10040
  Postalcode.create!(city_id: new_york.id, code: "#{i}")
end

Postalcode.create!(city_id: new_york.id, code: "10065")
Postalcode.create!(city_id: new_york.id, code: "10069")
Postalcode.create!(city_id: new_york.id, code: "10075")
Postalcode.create!(city_id: new_york.id, code: "10103")
Postalcode.create!(city_id: new_york.id, code: "10128")
Postalcode.create!(city_id: new_york.id, code: "10280")

# ----------------------------- #

# Make the restaurants

# API calls, careful!

include OpenTable

def get_data
  # debugger
  client = Client.new
  client.restaurants({city: "New York"})
end

data = get_data["restaurants"]

data.each do |r|
  Restaurant.create!(name: r["name"],
                     address: r["address"],
                     postal_code: r["postal_code"],
                     lat: r["lat"],
                     lng: r["lng"])

end
