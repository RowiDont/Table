json.partial! 'api/restaurants/restaurant', restaurant: @restaurant

json.limit @restaurant.max_people
json.date_limit @restaurant.max_advance
json.opens @restaurant.open_time
json.closes @restaurant.close_time
