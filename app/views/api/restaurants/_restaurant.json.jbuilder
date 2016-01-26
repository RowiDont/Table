json.extract! restaurant

json.restaurant do
  json.name restaurant.name
  json.address restaurant.address
  json.zip restaurant.postal_code
  json.lat restaurant.lat
  json.lng restaurant.lng
end
