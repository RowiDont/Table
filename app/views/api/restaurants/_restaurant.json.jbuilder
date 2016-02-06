json.extract! restaurant, :id, :name, :price, :address, :lat, :lng

json.zip restaurant.postal_code
json.image_url asset_path(restaurant.thumb.url)
