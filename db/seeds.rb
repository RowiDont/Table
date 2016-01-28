require_relative 'opentable_api.rb'

# Create a User:
test = user.new(email: "test@test.com", fname: "Rafi", lname: "Patel", password: "starwars", city_id: 1)
test.save


# ----------- NEW YORK -----------

# Make a city!
new_york = City.create!(name: "New York");

# ----------------------------- #

zipcodes = [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10009, 10010, 10011, 10012, 10013, 10014, 10016, 10017, 10018, 10019, 10020, 10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040, 10044, 10065, 10069, 10075, 10103, 10110, 10111, 10112, 10115, 10119, 10128, 10152, 10153, 10154, 10162, 10165, 10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174, 10177, 10199, 10271, 10278, 10279, 10280, 10282, 10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308, 10309, 10310, 10311, 10312, 10314, 10451, 10452, 10453, 10454, 10455, 10456, 10457, 10458, 10459, 10460, 10461, 10462, 10463, 10464, 10465, 10466, 10467, 10468, 10469, 10470, 10471, 10472, 10473, 10474, 10475, 11004, 11005, 11101, 11102, 11103, 11104, 11105, 11106, 11109, 11201, 11203, 11204, 11205, 11206, 11207, 11208, 11209, 11210, 11211, 11212, 11213, 11214, 11215, 11216, 11217, 11218, 11219, 11220, 11221, 11222, 11223, 11224, 11225, 11226, 11228, 11229, 11230, 11231, 11232, 11233, 11234, 11235, 11236, 11237, 11238, 11239, 11351, 11354, 11355, 11356, 11357, 11358, 11359, 11360, 11361, 11362, 11363, 11364, 11365, 11366, 11367, 11368, 11369, 11370, 11371, 11372, 11373, 11374, 11375, 11377, 11378, 11379, 11385, 11411, 11412, 11413, 11414, 11415, 11416, 11417, 11418, 11419, 11420, 11421, 11422, 11423, 11424, 11425, 11426, 11427, 11428, 11429, 11430, 11432, 11433, 11434, 11435, 11436, 11451, 11691, 11692, 11693, 11694, 11697]

zipcodes.each do |zip|
  Postalcode.create!(city_id: new_york.id, code: zip)
end

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
  Postalcode.create(city_id: san_francisco.id, code: zip)
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



# ----------- BOSTON -----------

zipcodes = ["02108", "02109", "02110", "02111", "02113", "02114", "02115", "02116", "02118", "02119", "02120", "02121", "02122", "02124", "02125", "02126", "02127", "02128", "02129", "02130", "02131", "02132", "02134", "02135", "02136", "02151", "02152", "02163", "02199", "02203", "02210", "02215", "02467"]
# Make a city!
boston = City.create!(name: "Boston");

# ----------------------------- #

# Make all the zipcodes!
zipcodes.each do |zip|
  Postalcode.create(city_id: boston.id, code: zip)
end

# ----------------------------- #

# Make the restaurants

# API calls, careful!

include OpenTable

def get_data
  # debugger
  client = Client.new
  client.restaurants({city: "Boston"})
end

data = get_data["restaurants"]

data.each do |r|
  Restaurant.create(name: r["name"],
                     address: r["address"],
                     postal_code: r["postal_code"],
                     lat: r["lat"],
                     lng: r["lng"],
                     price: r["price"])

end



# ----------- SEATTLE -----------

zipcodes = [98101, 98102, 98103, 98104, 98105, 98106, 98107, 98109, 98112, 98115, 98116, 98117, 98118, 98119, 98121, 98122, 98125, 98126, 98133, 98134, 98136, 98144, 98154, 98164, 98174, 98177, 98195, 98199]

# Make a city!
seattle = City.create!(name: "Seattle");

# ----------------------------- #

# Make all the zipcodes!
zipcodes.each do |zip|
  Postalcode.create(city_id: seattle.id, code: zip)
end

# ----------------------------- #

# Make the restaurants

# API calls, careful!

include OpenTable

def get_data
  # debugger
  client = Client.new
  client.restaurants({city: "Seattle"})
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
