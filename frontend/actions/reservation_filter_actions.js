var AppDispatcher = require('../dispatcher/dispatcher'),
    ReservationFilterConstants = require('../constants/reservation_filter_constants');

var ReservationFilterActions = {
  receiveReservationFilters: function (data) {
    AppDispatcher.dispatch({
      actionType: ReservationFilterConstants.RESERVATION_FILTERS_RECEIVED,
      filters: data
    });
  },
};

module.exports = ReservationFilterActions;
