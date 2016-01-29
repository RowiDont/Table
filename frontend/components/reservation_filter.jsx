var React = require('react'),
    moment = require('moment'),
    Calendar = require('./calendar/calendar'),
    CalendarFilter = require('./calendar/calendar_filter');


var ReservationFilter = React.createClass({

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

    var seatingOptions = [];
    for (var i = 1; i < restaurant.limit; i++) {
      if (i === 1) {
        seatingOptions.push(<option value={i}>1 Person</option>);
      } else if (i === 2) {
        seatingOptions.push(<option value={i} selected>{i} People</option>);
      } else {
        seatingOptions.push(<option value={i}>{i} People</option>);
      }
    }

    var date = <CalendarFilter moment={moment().startOf("day")} />;


    var timeOptions = [];
    var start = restaurant.opens;
    var end = restaurant.closes;
    for (var j = start.time; j < end.time; j += 30) {
      timeOptions.push(<option value={j}>{toString(j)}</option>);
    }

    return(
      <div className="reservation-filter-form">
        <h2>Make a Reservation</h2>
        <form>
          <select className="reservation-filter-people selector dropdown" name="people">
            {seatingOptions}
          </select>
          {date}
          <select className="reservation-filter-time selector dropdown" name="time">
            {timeOptions}
          </select>
          <button className="selector submit">Find a Table</button>
        </form>
      </div>
    );
  }
});

module.exports = ReservationFilter;
