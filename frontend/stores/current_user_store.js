var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    CurrentUserConstants = require('../constants/current_user_constants');

var _currentUser = {},
    _currentUserHasBeenFetched = false;

var CurrentUserStore = new Store(Dispatcher);

CurrentUserStore.currentUser = function () {
  return JSON.parse(JSON.stringify(_currentUser));
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  if (payload.actionType === CurrentUserConstants.RECEIVE_CURRENT_USER) {
    _currentUserHasBeenFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
  }
};

module.exports = CurrentUserStore;
