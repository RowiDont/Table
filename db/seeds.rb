require 'json'
# require 'byebug'
require 'active_support/inflector'

test_user = User.new(email: "test@test.com", fname: "Rafi", lname: "Patel", password: "starwars")
test_user.save

start_time = 630
end_time = 1410

time = start_time

until time > end_time
  TimeSlot.create(time: time)
  time += 15
end

openings = TimeSlot.limit(8).map { |el| el.id }
closings = TimeSlot.order(time: :desc).limit(8).map { |el| el.id }

QUALIFIERS = {
                max_advance: [30, 60, 80, 90, 120], #Days
                max_people: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14], # People
                open_time_id: openings,
                close_time_id: closings
}


# Make a city!
new_york = City.create!(name: "New York");
san_francisco = City.create!(name: "San Francisco");
chicago = City.create!(name: "Chicago");
seattle = City.create!(name: "Seattle");

# ----------------------------- #

zipcodes1 = [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10009, 10010,
            10011, 10012, 10013, 10014, 10016, 10017, 10018, 10019, 10020,
            10021, 10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029,
            10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037, 10038,
            10039, 10040, 10044, 10065, 10069, 10075, 10103, 10110, 10111,
            10112, 10115, 10119, 10128, 10152, 10153, 10154, 10162, 10165,
            10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174, 10177,
            10199, 10271, 10278, 10279, 10280, 10282, 10301, 10302, 10303,
            10304, 10305, 10306, 10307, 10308, 10309, 10310, 10311, 10312,
            10314, 10451, 10452, 10453, 10454, 10455, 10456, 10457, 10458,
            10459, 10460, 10461, 10462, 10463, 10464, 10465, 10466, 10467,
            10468, 10469, 10470, 10471, 10472, 10473, 10474, 10475, 11004,
            11005, 11101, 11102, 11103, 11104, 11105, 11106, 11109, 11201,
            11203, 11204, 11205, 11206, 11207, 11208, 11209, 11210, 11211,
            11212, 11213, 11214, 11215, 11216, 11217, 11218, 11219, 11220,
            11221, 11222, 11223, 11224, 11225, 11226, 11228, 11229, 11230,
            11231, 11232, 11233, 11234, 11235, 11236, 11237, 11238, 11239,
            11351, 11354, 11355, 11356, 11357, 11358, 11359, 11360, 11361,
            11362, 11363, 11364, 11365, 11366, 11367, 11368, 11369, 11370,
            11371, 11372, 11373, 11374, 11375, 11377, 11378, 11379, 11385,
            11411, 11412, 11413, 11414, 11415, 11416, 11417, 11418, 11419,
            11420, 11421, 11422, 11423, 11424, 11425, 11426, 11427, 11428,
            11429, 11430, 11432, 11433, 11434, 11435, 11436, 11451, 11691,
            11692, 11693, 11694, 11697]

zipcodes2 = ["94102", "94103", "94104", "94105", "94107", "94108", "94109",
                        "94110", "94111", "94112", "94114", "94115", "94116", "94117",
                        "94118", "94121", "94122", "94123", "94124", "94127", "94129",
                        "94130", "94131", "94132", "94133", "94134", "94158"]

zipcodes3 = [60018, 60068, 60176, 60601, 60602, 60603, 60604, 60605, 60606,
             60607, 60608, 60609, 60610, 60611, 60612, 60613, 60614, 60615,
             60616, 60617, 60618, 60619, 60620, 60621, 60622, 60623, 60624,
             60625, 60626, 60628, 60630, 60631, 60632, 60634, 60636, 60637,
             60639, 60640, 60641, 60642, 60643, 60644, 60645, 60646, 60647,
             60649, 60651, 60652, 60653, 60654, 60655, 60656, 60657, 60659,
             60660, 60661, 60706, 60707, 60714]

zipcodes4 = [98101, 98102, 98103, 98104, 98105, 98106, 98107, 98109, 98112,
             98115, 98116, 98117, 98118, 98119, 98121, 98122, 98125, 98126,
             98133, 98134, 98136, 98144, 98154, 98164, 98174, 98177, 98195,
             98199]

# Make a city!

zipcodes1.each do |zip|
  Postalcode.create(city_id: new_york.id, code: zip)
end

zipcodes2.each do |zip|
  Postalcode.create(city_id: san_francisco.id, code: zip)
end

zipcodes3.each do |zip|
  Postalcode.create(city_id: chicago.id, code: zip)
end

zipcodes4.each do |zip|
  Postalcode.create(city_id: seattle.id, code: zip)
end


data = File.read("#{Rails.root}/db/restaurants.json")

parsed = JSON.parse(data)

parsed.each do |city, hash|
  hash["restaurants"].each do |r|
    Restaurant.create!(
      name: r["name"],
      address: r["address"],
      postal_code: r["postal_code"],
      lat: r["lat"],
      lng: r["lng"],
      price: r["price"],
      max_advance: QUALIFIERS[:max_advance].sample,
      max_people: QUALIFIERS[:max_people].sample,
      open_time_id: QUALIFIERS[:open_time_id].sample,
      close_time_id: QUALIFIERS[:close_time_id].sample,
      thumb: File.new("#{Rails.root}/app/assets/images/thumbs/restaurant_thumb_#{r['name'].parameterize}.jpg")
    )
  end
end



r1 = Reservation.create(user_id: 1, restaurant_id: 1, date: "4/2/2016", time_id: 12, head_count: 4)
