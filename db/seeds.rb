require_relative 'opentable_api.rb'


# ----------- NEW YORK -----------

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
                     lng: r["lng"],
                     price: r["price"])

end










# ----------- SAN FRANCISCO -----------

zipcodes = ["94102", "94103", "94104", "94105", "94107", "94108", "94109", "94110", "94111", "94112", "94114", "94115", "94116", "94117", "94118", "94121", "94122", "94123", "94124", "94127", "94129", "94130", "94131", "94132", "94133", "94134", "94158"]

# Make a city!
san_francisco = City.create!(name: "San Francisco");

# ----------------------------- #

# Make all the zipcodes!
zipcodes.each do |zip|
  Postalcode.create!(city_id: san_francisco.id, code: zip)
end

# ----------------------------- #

# Make the restaurants

# API calls, careful!

include OpenTable

def get_data
  # debugger
  client = Client.new
  client.restaurants({city: "San Francisco"})
end

data = get_data["restaurants"]

data.each do |r|
  Restaurant.create!(name: r["name"],
                     address: r["address"],
                     postal_code: r["postal_code"],
                     lat: r["lat"],
                     lng: r["lng"],
                     price: r["price"])

end
