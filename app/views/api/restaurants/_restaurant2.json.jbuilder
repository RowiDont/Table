json.extract! restaurant

json.restaurant do
  json.id restaurant.id
  json.name restaurant.name
  json.price restaurant.price
  json.address restaurant.address
  json.zip restaurant.postal_code
  json.lat restaurant.lat
  json.lng restaurant.lng
  json.limit restaurant.max_people
  json.date_limit restaurant.max_advance
  json.opens restaurant.open_time
  json.closes restaurant.close_time
  json.image_url asset_path(restaurant.thumb.url)
  json.city restaurant.city.name
end
