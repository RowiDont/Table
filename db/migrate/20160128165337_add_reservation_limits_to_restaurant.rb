class AddReservationLimitsToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :max_advance, :integer, null: false
    add_column :restaurants, :max_people, :integer, null: false
    add_column :restaurants, :open_time_id, :integer, null: false
    add_column :restaurants, :close_time_id, :integer, null: false
  end
end
