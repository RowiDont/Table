var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    moment = require('moment');


var ReservationView = React.createClass({
  getInitialState: function () {
    return this.props.location.state;
  },

  render: function () {
    var rest = this.state.name;
    var rest_url = "#/restaurants/" + this.state.rest_id;
    var rest_link = <a href={rest_url}>{rest}</a>;

    var restaurant = <li className="rest"><h6>Restaurant</h6><h4>{rest_link}</h4></li>,
        time = <li className="time"><h6>Time</h6><h4>{Table.timeToString(this.state.time.time)}</h4></li>,
        guests = <li className="guests"><h6>Guests</h6><h4>{this.state.head_count}</h4></li>,
        date = <li className="date"><h6>Date</h6><h4>{moment(this.state.date).format('dddd, MMMM Do, YYYY')}</h4></li>;


    return(
      <div className="reservation-page">
        <div className="reservation-page-header">
          <h1>Complete your reservation</h1>
        </div>
        <ul className="reservation-page-details group">
          <li><img src="http://placehold.it/60x60"></img></li>
          { guests }
          { date }
          { time }
          { restaurant }
        </ul>
      </div>
    );
  }
});

module.exports = ReservationView;
