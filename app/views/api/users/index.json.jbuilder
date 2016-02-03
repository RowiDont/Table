json.extract! @user, :id, :email, :fname, :lname, :avatar

json.reservations do
  json.array! @reservations do |res|
    json.id res.id
    json.restaurant res.restaurant.name
    json.restaurant_id res.restaurant_id
    json.image_url res.restaurant.thumb
    json.date res.date
    json.time res.time_slot
    json.count res.head_count
  end
end
