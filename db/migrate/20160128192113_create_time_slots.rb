class CreateTimeSlots < ActiveRecord::Migration
  def change
    create_table :time_slots do |t|
      t.integer :time, null: false
      t.boolean :open
      t.boolean :close
    end
  end
end
