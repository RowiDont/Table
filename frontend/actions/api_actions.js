var AppDispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city_constants');
var RestaurantConstants = require('../constants/restaurant_constants');
var ReservationFilterConstants = require('../constants/reservation_filter_constants');
var ReservationTempConstants = require('../constants/reservation_temp_constants');

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
  },

  receiveReservationOptions: function (data) {
    AppDispatcher.dispatch({
      actionType: ReservationFilterConstants.RESERVATION_OPTIONS_RECEIVED,
      results: data
    });
  },

  receiveTempReservation: function (data) {
    AppDispatcher.dispatch({
      actionType: ReservationTempConstants.TEMP_RESERVATION_RECEIVED,
      results: data
    });
  },

  receiveReservation: function (data) {
    AppDispatcher.dispatch({
      actionType: ReservationConstants.RESERVATION_RECEIVED,
      reservation: data
    });
  }
};

module.exports = ApiAction;
