var CurrentUserActions = require('../actions/current_user_actions');

var UsersApiUtil = {
  fetchUser: function (id) {
    $.ajax({
      url: 'api/users/',
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
      data: {user: attrs},
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        callback && callback();
      }
    });
  },

  updateUser: function (data, callback) {
    $.ajax({
      type: "PATCH",
      url: "api/users",
      processData: false,
      contentType: false,
      dataType: "json",
      data: data,
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
        callback();
      }
    });
  },

  destroyReservation: function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'api/reservations/' + id,
      dataType: 'json',
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
      }
    });
  }
};

module.exports = UsersApiUtil;
