var React = require('react');
var UsersApiUtil = require('../../util/users_api_util.js');
var CurrentUserStore = require('../../stores/current_user_store');
var moment = require('moment');
var ReservationItem = require('../reservation/reservation_item');


var UserReservations = React.createClass({
  getInitialState: function () {
    return { user: CurrentUserStore.currentUser() };
  },

  componentDidMount: function () {
    this.token = CurrentUserStore.addListener(this.onChange);
    UsersApiUtil.fetchUser();
  },

  onChange: function () {
    this.setState({ user: CurrentUserStore.currentUser() });
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  cancel: function (e) {
    e.preventDefault();
    var id = e.currentTarget.id;
    UsersApiUtil.destroyReservation(id);
  },

  render: function () {
    var reservationMap = <div>You have no reservations at this time.</div>;
    if (Object.keys(this.state.user).length !== 0) {
      var reservations = this.state.user.reservations;
      if (reservations) {
         reservationMap = reservations.map(function (res, i) {
           var klass = "reservation-page-details group";
           var reservation = <ReservationItem key={i} res={res} cancel={this.cancel} klass={klass}/>;
           return reservation;
        }, this);
      }
    }



    return(
      <ul className="reservation-list">
        <h1>Reservations:</h1>
        { reservationMap }
      </ul>
    );
  }
});

module.exports = UserReservations;
