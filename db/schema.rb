# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160201204100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "postalcodes", force: :cascade do |t|
    t.string  "code",    null: false
    t.integer "city_id", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id",       null: false
    t.integer "restaurant_id", null: false
    t.date    "date",          null: false
    t.integer "time_id",       null: false
    t.integer "head_count",    null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.string   "name",          null: false
    t.string   "address",       null: false
    t.string   "postal_code",   null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "lat",           null: false
    t.string   "lng",           null: false
    t.integer  "price",         null: false
    t.integer  "max_advance",   null: false
    t.integer  "max_people",    null: false
    t.integer  "open_time_id",  null: false
    t.integer  "close_time_id", null: false
  end

  add_index "restaurants", ["name"], name: "index_restaurants_on_name", using: :btree
  add_index "restaurants", ["postal_code"], name: "index_restaurants_on_postal_code", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.string   "session_token", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "time_slots", force: :cascade do |t|
    t.integer "time", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "fname",               null: false
    t.string   "lname",               null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree

end
