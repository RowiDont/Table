# Schema Information

## Restaurants
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null, indexed
neighborhood_id| integer   | not null, foreign key (references neighborhoods), indexed
address        | string    | not null
cuisine_id     | integer   | not null, foreign key (references cuisines), indexed

## Neighborhoods
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
city_id     | integer   | not null, foreign key (references cities), indexed
name        | string    | not null

## Cities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## Cuisines
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## Reservations
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
user_id      | integer   | not null, foreign key (references users), indexed
restaurant_id| string    | not null, foreign key (references restaurants), indexed
time_slot    | integer   | not null

## Tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null
restaurant_id | integer   | not null, foreign key (references restaurant), indexed, unique [tag_id]
tag_id        | integer   | not null, foreign key (references tags), indexed
review_id     | integer   | not null, foreign key (references reviews)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## reviews
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | string    | not null
restaurant_id | integer   | not null, foreign key (references restaurant), indexed, unique [tag_id]
body          | text      | not null
