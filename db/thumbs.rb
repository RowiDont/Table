require 'json'
require 'active_support/inflector'


data = File.read("restaurants.json")

parsed = JSON.parse(data)

f = File.open("thumb_links.txt", "w")

parsed.each do |city, hash|
  hash["restaurants"].each do |r|
    f.puts("<img src='#{r['image_url']}' alt='restaurant_thumb_#{r['name'].parameterize}'/>")
  end
end

f.close
