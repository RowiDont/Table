var AppDispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city_constants');
var RestaurantConstants = require('../constants/restaurant_constants');

var ApiAction = {
  receiveAllCities: function (data) {
    AppDispatcher.dispatch({
      actionType: CityConstants.CITIES_RECEIVED,
      cities: data
    });
  },

  receiveRestaurants: function (data) {
    AppDispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANTS_RECEIVED,
      restaurants: data
    });
  },

  receiveSingleRestaurant: function (data) {
    AppDispatcher.dispatch({
      actionType: RestaurantConstants.RESTAURANT_RECEIVED,
      restaurant: data
    });
  }
};

module.exports = ApiAction;
