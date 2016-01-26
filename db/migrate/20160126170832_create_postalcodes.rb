class CreatePostalcodes < ActiveRecord::Migration
  def change
    create_table :postalcodes do |t|
      t.string :code, null: false
      t.integer :city_id, null: false
    end

    create_table :cities do |t|
      t.string :name, null: false
    end
  end
end
