class AddLatLngToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :lat, :string, null: false
    add_column :restaurants, :lng, :string, null: false
  end
end
