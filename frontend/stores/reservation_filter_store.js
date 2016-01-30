var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    ReservationFilterConstants = require('../constants/reservation_filter_constants');

var _filters = {};

var ReservationFilterStore = new Store(AppDispatcher);

ReservationFilterStore.all = function () {
  return _filters;
};

ReservationFilterStore.setFilter = function (filters) {
  _filters = filters;
  console.log(_filters);
  // ReservationFilterStore.__emitChange();
};

ReservationFilterStore.empty = function () {
  return Object.keys(_filters).length === 0;
};

ReservationFilterStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReservationFilterConstants.RESERVATION_FILTERS_RECEIVED:
      this.setFilter(payload.filters);
      break;
    default:
      break;
  }
};

module.exports = ReservationFilterStore;
