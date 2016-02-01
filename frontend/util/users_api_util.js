var CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUser: function (id) {
    $.ajax({
      url: 'api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
      }
    });
  },

  createUser: function (attrs, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        callback && callback();
      }
    });
  }
};

module.exports = UsersApiUtil;
