var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ReservationTempStore = require('../../stores/reservation_temp_store'),
    CurrentUserStore = require('../../stores/current_user_store'),
    moment = require('moment');


var ReservationConfirmation = React.createClass({

  render: function () {
    return(
      <div>
        <div className="button-to-home"><a href="#/">Go back to the homepage</a></div>
        <div className="button-to-user"><a href="#/user/reservations">See your reservations</a></div>
      </div>
    );
  }
});

module.exports = ReservationConfirmation;
