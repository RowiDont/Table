var ApiAction = require('../actions/api_actions');

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

  fetchRestaurants: function (id) {
    $.ajax({
      url: "/api/cities/" + id + "/restaurants",
      type: "GET",
      dataType: 'json',
      success: function (data) {
        ApiAction.receiveRestaurants(data);
      },
      errors: function () {
        console.log("Restaurant fetch failed");
      }
    });
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
