var React = require('react');
var UsersApiUtil = require('../../util/users_api_util.js');
var CurrentUserStore = require('../../stores/current_user_store');
var moment = require('moment');


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
          // debugger
          var rest = res.restaurant;
          var rest_url = "#/restaurants/" + res.restaurant_id;
          var rest_link = <a href={rest_url}>{rest}</a>;

          var reservation =(
            <ul key={i} className="reservation-page-details group">
              <li><img src={ res.image_url }></img></li>
              <li className="guests"><h6>Guests</h6><h4>{res.count}</h4></li>
              <li className="date"><h6>Date</h6><h4>{moment(res.date).format('dddd, MMMM Do, YYYY')}</h4></li>
              <li className="time"><h6>Time</h6><h4>{Table.timeToString(res.time.time)}</h4></li>
              <li className="rest"><h6>Restaurant</h6><h4>{rest_link}</h4></li>
              <li className="cancel"><a id={res.id} onClick={this.cancel}><button>cancel</button></a></li>
            </ul>
          );

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
