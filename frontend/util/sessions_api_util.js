var CurrentUserActions = require('../actions/current_user_actions');

var SessionsApiUtil = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/sessions',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      }

    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/sessions',
      type: 'DELETE',
      dataTpye: 'json',
      success: function () {
        CurrentUserActions.receiveCurrentUser({});
        callback();
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/sessions',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }
};

module.exports = SessionsApiUtil;
