json.array! @cities do |city|
  json.name city.name
  json.count city.count
end
