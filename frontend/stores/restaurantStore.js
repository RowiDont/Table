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

RestaurantStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RestaurantConstants.RESTAURANTS_RECEIVED:
        RestaurantStore.resetRestaurants(payload.restaurants);
      break;
    default:
      break;
  }
};

module.exports = RestaurantStore;
