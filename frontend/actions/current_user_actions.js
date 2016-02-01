var Dispatcher = require('../dispatcher/dispatcher'),
    CurrentUserConstants = require('../constants/current_user_constants');

var CurrentUserActions = {
  receiveCurrentUser: function (currentUser) {
    Dispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  }
};

module.exports = CurrentUserActions;
