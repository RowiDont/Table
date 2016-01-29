var React = require('react');

var ReservationFilter = React.createClass({

  // componentDidMount: function () {
  //   this.setState({ loaded: true });
  // },

  render: function () {

    var restaurant = this.props.restaurant;

    var toString = function (time) {
      var hours = Math.floor(time / 60);
      var minutes = time % 60;
      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      
      return hours + ":" + minutes;
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

    var date = <input type="text" id="datepicker"/>;

    var timeOptions = [];
    var start = restaurant.opens;
    var end = restaurant.closes;
    for (var j = start.time; j < end.time; j += 30) {
      timeOptions.push(<option value={j}>{toString(j)}</option>);
    }

    return(
      <div className="reservation-filter-form">
        <h2>Make a Reserrvation</h2>
        <form>
          <select className="reservation-filter-people" name="people">
            {seatingOptions}
          </select>
          {date}
          <select className="reservation-filter-time" name="time">
            {timeOptions}
          </select>
        </form>
      </div>
    );
  }
});

module.exports = ReservationFilter;
