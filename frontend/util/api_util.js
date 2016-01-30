var ApiAction = require('../actions/api_actions'),
    ReservationFilterStore = require('../stores/reservation_filter_store');

var ApiUtil = {
  fetchCities: function () {
    $.ajax({
      url: "/api/cities",
      type: "GET",
      dataType: 'json',
      success: function (data) {
        ApiAction.receiveAllCities(data);
      },
      errors: function () {
        console.log("City fetch failed");
      }
    });
  },

  fetchRestaurants: function (cityId) {

    $.ajax({
      url: "/api/cities/" + cityId + "/restaurants",
      type: "GET",
      dataType: 'json',
      success: function (data) {
        ApiAction.receiveRestaurants(data);
      },
      errors: function () {
        console.log("Restaurant fetch failed");
      }
    });
  },

  fetchSingleRestaurant: function (restId) {
    $.ajax({
      url: "/api/restaurants/" + restId,
      type: "GET",
      dataType: 'json',
      success: function (data) {
        ApiAction.receiveSingleRestaurant(data);
      },
      errors: function () {
        console.log("Single Restaurant fetch failed");
      }
    });
  },

  fetchReservationOptions: function () {
    debugger
    var filters = ReservationFilterStore.all();
    var id = filters.id;

    $.ajax({
      type: "GET",
      url: "api/restaurants/" + id + "/reservations",
      data: filters,
      success: function (data) {
        console.log(data);
      },
      errors: function () {
        console.log("Options Fetch failed! :(");
      }
    });
  }
};

module.exports = ApiUtil;
