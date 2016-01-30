data = File.read("#{Rails.root}/db/restaurants.json")

parsed = JSON.parse(data)
