var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');


var _restaurants = {};

var RestaurantStore = new Store(AppDispatcher);

RestaurantStore.all = function () {
  return _restaurants;
};

RestaurantStore.resetRestaurants = function (data) {
  _restaurants = data;
  RestaurantStore.__emitChange();
};

RestaurantStore.updateRestaurant = function (data) {
  var id = data.restaurant.id;
  _restaurants[id] = data.restaurant;
  RestaurantStore.__emitChange();
};

RestaurantStore.find = function (id) {
  return _restaurants[id];
};

RestaurantStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RestaurantConstants.RESTAURANTS_RECEIVED:
      RestaurantStore.resetRestaurants(payload.restaurants);
      break;
    case RestaurantConstants.RESTAURANT_RECEIVED:
      RestaurantStore.updateRestaurant(payload.restaurant);
      break;
    default:
      break;
  }
};

module.exports = RestaurantStore;
