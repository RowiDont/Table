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
    this.token = ReservationFilterStore.addListener(this._getResults);
    this.setState({ results: ReservationFilterStore.results() });
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
    var date = <CalendarFilter changeDate={this.setDate} moment={moment().startOf("day")} />;

    // time
    var timeOptions = [];
    var start = restaurant.opens.time + (restaurant.opens.time % 30);
    var end = restaurant.closes.time - (restaurant.closes.time % 30);
    for (var j = start; j < end; j += 30) {
      timeOptions.push(<option key={j} value={j}>{Table.timeToString(j)}</option>);
    }
    var results = this.state.results;

    // if (results) {
    //   var id = results[0].rest_id;
    //   if (this.state.id === id) {
    //     results = results;
    //   } else {
    //     results = "";
    //   }
    // }
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
        <ReservationOptions time={this.state.time} results={results}/>
      </div>
    );
  }
});

module.exports = ReservationFilter;
