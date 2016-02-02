var React = require('react');
var UsersApiUtil = require('../../util/users_api_util.js');
var moment = require('moment');


var UserReservations = React.createClass({

  render: function () {
    var reservations = this.props.location.state;
    var ress;
    if (reservations) {
       ress = reservations.map(function (res, i) {
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
          </ul>
        );

        return reservation;
      });
    }


    return(
      <ul>
        {ress}
      </ul>
    );
  }
});

module.exports = UserReservations;
