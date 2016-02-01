class AddAttachmentThumbToRestaurants < ActiveRecord::Migration
  def self.up
    change_table :restaurants do |t|
      t.attachment :thumb
    end
  end

  def self.down
    remove_attachment :restaurants, :thumb
  end
end
