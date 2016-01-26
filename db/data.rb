require './opentable_api.rb'

include OpenTable

def get_data
  # debugger
  client = Client.new
  client.restaurants({city: "New York"})
end

data = get_data["restaurants"]

data.each do |r|
  puts r
  puts ""
  # puts "#{r["name"]}, #{r["city"]}, #{r["price"]}, #{r["postal_code"]}"
end
