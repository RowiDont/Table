json.count @restaurants.total_count
json.type "index"
json.city @city.name
json.city_id @city.id
json.restaurants do
  json.array! @restaurants, partial: 'api/restaurants/restaurant', as: :restaurant
end
