class RemoveOpenCloseFromTimeSlots < ActiveRecord::Migration
  def change
    remove_column :time_slots, :open
    remove_column :time_slots, :close
  end
end
