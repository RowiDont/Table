class AddToUserModel < ActiveRecord::Migration
  def change
    rename_column :users, :username, :email
    add_column :users, :fname, :string, null: false
    add_column :users, :lname, :string, null: false
    add_column :users, :city_id, :integer, null: false
  end
end
