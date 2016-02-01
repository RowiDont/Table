var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReservationConstants = require('../constants/reservation_constants');

var _reservations = {};

var ReservationStore = new Store(AppDispatcher);

ReservationStore.all = function () {
  return Object.assign({}, _reservations);
};

ReservationStore.set = function (data) {
  _reservations = data;
  ReservationStore.__emitChange();
};

ReservationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReservationConstants.RESERVATION_RECEIVED:
      this.set(payload.reservation);
      break;
    default:
      break;
  }
};

module.exports = ReservationStore;
