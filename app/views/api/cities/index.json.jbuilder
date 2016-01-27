json.array! @cities do |city|
  json.id city.id
  json.name city.name
  json.count city.count
end
