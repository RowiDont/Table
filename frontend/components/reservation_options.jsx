var React = require('react'),
    History = require('react-router').History,
    ApiUtil = require('../util/api_util'),
    RestaurantStore = require('../stores/restaurant_store'),
    ReservationTempStore = require('../stores/reservation_temp_store'),
    moment = require('moment');

Table.timeToString = function (time) {
  var hours = Math.floor(time / 60);
  var minutes = time % 60;
  var m = hours > 11 ? " PM" : " AM";
  hours = hours % 12;
  if (hours === 0) { hours = 12; }
  if (minutes < 10) { minutes = "0" + minutes; }

  return hours + ":" + minutes + m;
};


var ReservationOptions = React.createClass({
  mixins: [ History ],

  getInitialState: function () {
    return { time: this.props.time };
  },

  submit: function (e) {
    data = JSON.parse(e.target.dataset.resDetails);
    ApiUtil.setTempReservation(data);
    this.context.history.pushState({}, "/reservation");
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.results !== this.props.results) {
      this.setState({ time: this.props.time });
    }
  },

  render: function () {
    var header;
    var klass = "reservation-section";
    if (this.props.results === "") {
      header = "";
      klass = "reservation-section-hidden";
    } else if (Object.keys(this.props.results).length === 0) {
      header = "No Availability at that time, sorry.";
    } else {
      var date = moment(this.props.results[0].date).format('MMMM Do YYYY');
      var time = Table.timeToString(this.state.time);
      var count = this.props.results[0].head_count;
      header = "Availability on " + date + " around " + time + " for " + count;
    }

    var results = this.props.results;
    var resultList = <div></div>;
    if (this.props.results) {
      resultList = Object.keys(results).map(function (idx) {
        var res = results[idx];
        res.name = RestaurantStore.find(res.rest_id).name;
        var resDetails = JSON.stringify(res);
        return <li onClick={this.submit} data-res-details={resDetails} className="reservation-list-option" key={idx}>{Table.timeToString(res.time.time)}</li>;
      }, this);
    }

    return(
      <div className={klass}>
        <h3>{header}</h3>
        <ul className="reservation-list group">{resultList}</ul>
      </div>
    );
  }
});

module.exports = ReservationOptions;
