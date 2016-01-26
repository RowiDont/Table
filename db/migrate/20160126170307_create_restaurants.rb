class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name, null: false, index: true
      t.string :address, null: false
      t.string :postal_code, null: false, index: true

      t.timestamps null: false
    end
  end
end
