class AddPriceToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :price, :integer, null: false
  end
end
