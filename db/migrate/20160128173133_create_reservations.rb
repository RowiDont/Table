class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.date :date, null: false
      t.integer :time_id, null: false
      t.integer :head_count, null: false
    end
  end
end
