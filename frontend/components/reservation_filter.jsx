var React = require('react'),
    moment = require('moment'),
    Calendar = require('./calendar/calendar'),
    CalendarFilter = require('./calendar/calendar_filter'),
    ReservationFilterActions = require('../actions/reservation_filter_actions'),
    ApiAction = require('../actions/api_actions'),
    ReservationFilterStore = require('../stores/reservation_filter_store'),
    ApiUtil = require('../util/api_util'),
    ReservationOptions = require('./reservation_options');


var ReservationFilter = React.createClass({
  getInitialState: function () {
    return { people: "2",
             time: this.props.restaurant.opens.time,
             date: moment().startOf("day"),
             id: this.props.restaurant.id,
             results: "" } ;
  },

  componentDidMount: function () {
    values = this.currentTime();
    currentTime = values[1];
    timeNow = values[0];

    shiftDay = this.isClosed(timeNow);


    this.token = ReservationFilterStore.addListener(this._getResults);
    if (shiftDay) {
      newDate = moment().startOf("day").add(1, 'days');
      this.setState({ results: ReservationFilterStore.results(), date: newDate, time: currentTime});
    } else {
      this.setState({ results: ReservationFilterStore.results(), time: currentTime});
    }
  },

  isClosed: function (timeNow) {
    var restaurant = this.props.restaurant;
    var end = restaurant.closes.time - (restaurant.closes.time % 30);
    var nextDay = false;
    if (timeNow > end ) {
      nextDay = true;
    }
    return nextDay;
  },

  currentTime: function () {
    var restaurant = this.props.restaurant;

    this.timeOptions = [];
    var start = restaurant.opens.time + (restaurant.opens.time % 30);
    var end = restaurant.closes.time - (restaurant.closes.time % 30);
    current_time = start;
    for (var j = start; j < end; j += 30) {
      this.timeOptions.push(<option key={j} value={j}>{Table.timeToString(j)}</option>);
      now = moment();
      midnight = now.clone().startOf('day');
      minutes = now.clone().diff(midnight, 'minutes');
      diff = Math.abs(j - minutes);
      if (diff <= 30) {
        current_time = j.toString();
      }
    }

    return [minutes, current_time];
  },

  componentWillUnmount: function () {
    this.token.remove();
    ApiAction.receiveReservationOptions("");
  },

  updateFitlers: function () {
    var filters = Object.assign({}, this.state);
    delete filters.results;
    ReservationFilterActions.receiveReservationFilters(filters);
  },

  _getResults: function () {
    if (ReservationFilterStore.results()) {
      this.setState({ results: ReservationFilterStore.results() });
    }
  },

  setDate: function (day) {
    this.setState({ date: day.date });
  },

  setPeople: function (e) {
    this.setState({ people: e.currentTarget.value });
  },

  setDefaultTime: function (time) {
    this.setState({ time: time });
  },

  setTime: function (e) {
    this.setState({ time: e.currentTarget.value });
  },

  submitFilters: function (e) {
    e.preventDefault();
    this.updateFitlers();

    ApiUtil.fetchReservationOptions();
  },

  reAddClick: function (e) {
    $(e.currentTarget).on('click', this.submitFilters);
  },

  render: function () {
    var restaurant = this.props.restaurant;

    // people
    var seatingOptions = [];
    for (var i = 1; i <= restaurant.limit; i++) {
      if (i === 1) {
        seatingOptions.push(<option key={i} value={i}>1 Person</option>);
      } else if (i === 2) {
        seatingOptions.push(<option key={i} value={i}>{i} People</option>);
      } else {
        seatingOptions.push(<option key={i} value={i}>{i} People</option>);
      }
    }

    // date
    console.log(this.state.date);
    var date = <CalendarFilter changeDate={this.setDate} moment={this.state.date} />;

    var results = this.state.results;

    return(
      <div className="filter-box">
        <h2>Make a Reservation</h2>
        <div className="reservation-filter-form">
          <form>
            <select defaultValue="2" onChange={this.setPeople} className="reservation-filter-people selector dropdown" name="people">
              {seatingOptions}
            </select>
            {date}
            <select value={this.state.time} onChange={this.setTime} className="reservation-filter-time selector dropdown" name="time">
              {this.timeOptions}
            </select>
            <button onClick={this.submitFilters} className="selector submit">Find a Table</button>
          </form>
        </div>
        <ReservationOptions time={this.state.time} results={results}/>
      </div>
    );
  }
});

module.exports = ReservationFilter;
