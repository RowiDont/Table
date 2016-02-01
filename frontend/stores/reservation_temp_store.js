var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReservationTempConstants = require('../constants/reservation_temp_constants');

var _temp = {};

var ReservationTempStore = new Store(AppDispatcher);

ReservationTempStore.all = function () {
  return Object.assign({}, _temp);
};

ReservationTempStore.setTemp = function (data) {
  _temp = data;
  ReservationTempStore.__emitChange();
};

ReservationTempStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReservationTempConstants.TEMP_RESERVATION_RECEIVED:
      this.setTemp(payload.results);
      break;
    default:
      break;
  }
};

module.exports = ReservationTempStore;
