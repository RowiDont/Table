var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher');

var _errors = {};

var ErrorStore = new Store(Dispatcher);

ErrorStore.all = function () {
  return Object.assign({}, _errors);
};

ErrorStore.resetErrors = function (errors) {
  _errors = {};
  _errors = errors;
};

ErrorStore.__onDispatch = function (payload) {
  if (payload.actionType === "RECEIVE_ERRORS") {
    ErrorStore.resetErrors(payload.errors);
    ErrorStore.__emitChange();
  }
};

module.exports = ErrorStore;
