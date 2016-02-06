var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');


var _restaurants = null;
var _searchResults = [];

var RestaurantStore = new Store(AppDispatcher);

RestaurantStore.all = function () {
  return _restaurants.restaurants;
};

RestaurantStore.count = function () {
  return _restaurants.count;
};

RestaurantStore.city = function () {
  return _restaurants.city;
};

RestaurantStore.results = function () {
  return _searchResults.slice();
};

RestaurantStore.resetRestaurants = function (data) {
  _restaurants = data;
  RestaurantStore.__emitChange();
};

RestaurantStore.updateRestaurant = function (data) {
  if (_restaurants) {
    for (var i = 0; i < _restaurants.restaurants.length; i++) {
      if (_restaurants.restaurants[i].id == data.id) {
        $.extend(_restaurants.restaurants[i], data);
      }
    }
  } else {
    _restaurants = {restaurants: [data]};
  }
  RestaurantStore.__emitChange();
};

RestaurantStore.updateResults = function (results) {
  _searchResults = results;
  RestaurantStore.__emitChange();
};

RestaurantStore.find = function (id) {
  for (var i = 0; i < _restaurants.restaurants.length; i++) {
    if (_restaurants.restaurants[i].id == id) {
      return _restaurants.restaurants[i];
    }
  }
};

RestaurantStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RestaurantConstants.RESTAURANTS_RECEIVED:
      RestaurantStore.resetRestaurants(payload.restaurants);
      break;
    case RestaurantConstants.RESTAURANT_RECEIVED:
      RestaurantStore.updateRestaurant(payload.restaurant);
      break;
    case RestaurantConstants.RESULTS_RECEIVED:
      RestaurantStore.updateResults(payload.results);
      break;
    default:
      break;
  }
};

module.exports = RestaurantStore;
