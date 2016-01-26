var AppDispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city_constants');

var ApiAction = {
  receiveAllCities: function (data) {
    AppDispatcher.dispatch({
      actionType: CityConstants.CITIES_RECEIVED,
      cities: data
    });
  }
};

module.exports = ApiAction;
