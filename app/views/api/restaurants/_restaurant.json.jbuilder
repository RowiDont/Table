json.extract! restaurant

json.restaurant do
  json.id restaurant.id
  json.name restaurant.name
  json.price restaurant.price
  json.address restaurant.address
  json.zip restaurant.postal_code
  json.lat restaurant.lat
  json.lng restaurant.lng
  json.image_url asset_path(restaurant.thumb.url)
  json.type "index"
  json.city restaurant.city
end
