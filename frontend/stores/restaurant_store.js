var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');


var _restaurants = {};
var _searchResults = [];

var RestaurantStore = new Store(AppDispatcher);

RestaurantStore.all = function () {
  return _restaurants;
};

RestaurantStore.results = function () {
  return _searchResults.slice();
};

RestaurantStore.resetRestaurants = function (data) {
  _restaurants = data;
  RestaurantStore.__emitChange();
};

RestaurantStore.updateRestaurant = function (data) {
  var id = data.restaurant.id;
  _restaurants[id - 1] = data;
  RestaurantStore.__emitChange();
};

RestaurantStore.updateResults = function (results) {
  _searchResults = results;
  RestaurantStore.__emitChange();
};

RestaurantStore.find = function (id) {
  return _restaurants[id - 1];
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
