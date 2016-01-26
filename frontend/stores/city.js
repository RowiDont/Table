var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var _cities = [];

var CityStore = new Store(AppDispatcher);

CityStore.all = function () {
  return _cities.slice();
};

module.exports = CityStore;
