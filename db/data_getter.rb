require_relative 'opentable_api.rb'
require 'json'
include OpenTable
require 'byebug'

cities = ["New York", "San Francisco", "Chicago", "Seattle"]

def get_data(city)
  client = Client.new
  client.restaurants({city: city})
end

data = {}
# debugger

cities.each do |city|
  data[city] = get_data(city)
end

File.open("restaurants.json", "w") do |f|
  f.write(data.to_json)
end


# def get_data
#   # debugger
#   client = Client.new
#   client.restaurants({city: "San Francisco"})
# end
#
# data = get_data["restaurants"]
#
# data.each do |r|
#   Restaurant.create!(
#     name: r["name"],
#     address: r["address"],
#     postal_code: r["postal_code"],
#     lat: r["lat"],
#     lng: r["lng"],
#     price: r["price"],
#     max_advance: QUALIFIERS[:max_advance].sample,
#     max_people: QUALIFIERS[:max_people].sample,
#     open_time_id: QUALIFIERS[:open_time_id].sample,
#     close_time_id: QUALIFIERS[:close_time_id].sample
#   )
# end
#
#
#
# # Make the restaurants
#
# # API calls, careful!
#
# include OpenTable
#
# def get_data
#   # debugger
#   client = Client.new
#   client.restaurants({city: "Chicago"})
# end
#
# data = get_data["restaurants"]
#
# data.each do |r|
#   Restaurant.create(
#     name: r["name"],
#     address: r["address"],
#     postal_code: r["postal_code"],
#     lat: r["lat"],
#     lng: r["lng"],
#     price: r["price"],
#     max_advance: QUALIFIERS[:max_advance].sample,
#     max_people: QUALIFIERS[:max_people].sample,
#     open_time_id: QUALIFIERS[:open_time_id].sample,
#     close_time_id: QUALIFIERS[:close_time_id].sample
#   )
# end
#
#
# def get_data
#   # debugger
#   client = Client.new
#   client.restaurants({city: "Seattle"})
# end
#
# data = get_data["restaurants"]
#
# data.each do |r|
#   Restaurant.create!(
#     name: r["name"],
#     address: r["address"],
#     postal_code: r["postal_code"],
#     lat: r["lat"],
#     lng: r["lng"],
#     price: r["price"],
#     max_advance: QUALIFIERS[:max_advance].sample,
#     max_people: QUALIFIERS[:max_people].sample,
#     open_time_id: QUALIFIERS[:open_time_id].sample,
#     close_time_id: QUALIFIERS[:close_time_id].sample
#   )
# end
