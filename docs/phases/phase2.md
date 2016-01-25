# Phase 2: Flux Architecture and Restaurant Search

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* Index
  - IndexItem
  - Search
* Restaurant

### Stores
* IndexStore
* RestaurantStore
* SearchStore

### Actions
* ApiActions.receiveAllRestaurants -> triggered by ApiUtil
* ApiActions.receiveSingleRestaurant
* ApiActions.receiveFilteredRestaurants
* IndexActions.fetchAllRestaurants -> triggers ApiUtil
* SearchActions.fetchRestaurants -> triggers ApiUtil
* RestaurantActions.fetchSingleRestaurant

### ApiUtil
* ApiUtil.fetchAllRestaurants
* ApiUtil.fetchFilteredRestaurants
* ApiUtil.fetchSingleRestaurant

## Gems/Libraries
* Flux Dispatcher (npm)
