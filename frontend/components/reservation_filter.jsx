var React = require('react'),
    moment = require('moment'),
    Calendar = require('./calendar/calendar'),
    CalendarFilter = require('./calendar/calendar_filter'),
    ReservationFilterActions = require('../actions/reservation_filter_actions'),
    ReservationFilterStore = require('../stores/reservation_filter_store'),
    ApiUtil = require('../util/api_util');


var ReservationFilter = React.createClass({
  getInitialState: function () {
    return { people: "2",
             time: this.props.restaurant.opens.time,
             date: moment().startOf("day"),
             id: this.props.restaurant.id } ;
  },

  updateFitlers: function () {
    ReservationFilterActions.receiveReservationFilters(this.state);
  },

  setDate: function (day) {
    this.setState({ date: day.date });
  },

  setPeople: function (e) {
    this.setState({ people: e.currentTarget.value });
  },

  setTime: function (e) {
    this.setState({ time: e.currentTarget.value });
  },

  submitFilters: function (e) {
    e.preventDefault();

    if (ReservationFilterStore.empty()) {
      this.updateFitlers();
    }
    ApiUtil.fetchReservationOptions();
  },

  render: function () {
    var restaurant = this.props.restaurant;

    var toString = function (time) {
      var hours = Math.floor(time / 60);
      var minutes = time % 60;
      var m = hours > 11 ? " PM" : " AM";
      hours = hours % 12;
      if (hours === 0) { hours = 12; }
      if (minutes < 10) { minutes = "0" + minutes; }

      return hours + ":" + minutes + m;
    };

    // people
    var seatingOptions = [];
    for (var i = 1; i < restaurant.limit; i++) {
      if (i === 1) {
        seatingOptions.push(<option key={i} value={i}>1 Person</option>);
      } else if (i === 2) {
        seatingOptions.push(<option key={i} value={i}>{i} People</option>);
      } else {
        seatingOptions.push(<option key={i} value={i}>{i} People</option>);
      }
    }

    // date
    var date = <CalendarFilter changeDate={this.setDate} moment={moment().startOf("day")} />;

    // time
    var timeOptions = [];
    var start = restaurant.opens;
    var end = restaurant.closes;
    for (var j = start.time; j < end.time; j += 30) {
      timeOptions.push(<option key={j} value={j}>{toString(j)}</option>);
    }

    return(
      <div className="filter-box">
        <h2>Make a Reservation</h2>
        <div className="reservation-filter-form">
          <form>
            <select defaultValue="2" onChange={this.setPeople} className="reservation-filter-people selector dropdown" name="people">
              {seatingOptions}
            </select>
            {date}
            <select onChange={this.setTime} className="reservation-filter-time selector dropdown" name="time">
              {timeOptions}
            </select>
            <button onClick={this.submitFilters} className="selector submit">Find a Table</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ReservationFilter;
