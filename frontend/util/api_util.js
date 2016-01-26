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
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
