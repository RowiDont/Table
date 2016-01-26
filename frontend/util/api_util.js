var ApiUtil = {
  fetchCities: function () {
    $.ajax({
      url: "/api/cities",
      type: "GET",
      dataType: 'json',
      success: function (data) {
        console.log(data);
      },
      errors: function () {
        console.log("City fetch failed");
      }
    });
  }
};

window.ApiUtil = ApiUtil;
module.exports = ApiUtil;
