class RemoveCityIdFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :city_id
  end
end
