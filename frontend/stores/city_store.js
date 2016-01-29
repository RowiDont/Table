var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city_constants');


var _cities = [];

var CityStore = new Store(AppDispatcher);

CityStore.all = function () {
  return _cities.slice();
};

CityStore.resetCities = function (data) {
  _cities = data;
  CityStore.__emitChange();
};

CityStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CityConstants.CITIES_RECEIVED:
        CityStore.resetCities(payload.cities);
      break;
    default:
      break;
  }
};

module.exports = CityStore;
