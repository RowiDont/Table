var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    ReservationFilterConstants = require('../constants/reservation_filter_constants');

var _filters = {};
var _results = "";

var ReservationFilterStore = new Store(AppDispatcher);

ReservationFilterStore.all = function () {
  return Object.assign({}, _filters);
};

ReservationFilterStore.results = function () {
  answer = _results;
  return answer;
};

ReservationFilterStore.setResults = function (results) {
  _results = {};
  _results = results;
  ReservationFilterStore.__emitChange();
};

ReservationFilterStore.setFilter = function (filters) {
  _filters = {};
  _filters = filters;
};

ReservationFilterStore.empty = function () {
  return Object.keys(_filters).length === 0;
};

ReservationFilterStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReservationFilterConstants.RESERVATION_FILTERS_RECEIVED:
      this.setFilter(payload.filters);
      break;
    case ReservationFilterConstants.RESERVATION_OPTIONS_RECEIVED:
      this.setResults(payload.results);
      break;
    default:
      break;
  }
};

module.exports = ReservationFilterStore;
