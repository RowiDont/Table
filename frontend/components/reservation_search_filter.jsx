var React = require('react'),
    moment = require('moment'),
    Calendar = require('./calendar/calendar'),
    CalendarFilter = require('./calendar/calendar_filter'),
    ReservationFilterActions = require('../actions/reservation_filter_actions'),
    ReservationFilterStore = require('../stores/reservation_filter_store'),
    RestaurantStore = require('../stores/restaurant_store'),
    ApiUtil = require('../util/api_util'),
    ReservationOptions = require('./reservation_options'),
    History = require('react-router').History;


var ReservationSearchFilter = React.createClass({
  mixins: [ History ],

  getInitialState: function () {
    return { people: "2",
             time: this.props.restaurant.opens.time,
             date: moment().startOf("day"),
             id: 0,
             results: "",
             searchTerm: "",
             searchOptions: []
           };
  },

  componentDidMount: function () {
    this.token = ReservationFilterStore.addListener(this._getResults);
    this.token2 = RestaurantStore.addListener(this._getSearchResults);
  },

  componentWillUnmount: function () {
    this.token.remove();
    this.token2.remove();
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

  _getSearchResults: function () {
    var results = RestaurantStore.results();
    this.setState({ searchOptions: results });
    if (results.length === 1) {
      this.setState({ id: results[0].searchable_id });
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

  setSearch: function (e) {
    var query = e.currentTarget.value;
    this.setState({ searchTerm: query });
    ApiUtil.searchFilter(query);
  },

  routeToRestaurant: function () {
    var url = "restaurants/" + this.state.id;
    this.context.history.pushState({}, url);
  },

  submitFilters: function (e) {
    e.preventDefault();
    this.updateFitlers();

    ApiUtil.indexFilter(this.routeToRestaurant);
  },

  reAddClick: function (e) {
    $(e.currentTarget).on('click', this.submitFilters);
  },

  fillForm: function (e) {
    var id = e.currentTarget.id;
    var text = e.currentTarget.innerText;
    this.setState( { searchTerm: text, id: id, searchOptions: [] });
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

    var resultList = this.state.searchOptions.map(function (item, idx) {
      var id = item.searchable_id;
      return <li onClick={this.fillForm} id={id} className="search-item" key={idx}>{item.content}</li>;
    }, this);

    return(
      <div className="filter-box search">
        <h2>Already know where you want to go? Make a Reservation now</h2>
        <div className="reservation-filter-form">
          <form>
            <div className="search-filter">
              <select defaultValue="2" onChange={this.setPeople} className="reservation-filter-people selector dropdown" name="people">
                {seatingOptions}
              </select>
              {date}
              <select onChange={this.setTime} className="reservation-filter-time selector dropdown" name="time">
                {timeOptions}
              </select>
              <label>
                <input autoComplete="off" type="text" placeholder="Resturant name" id="searchbox" className="selector" onChange={this.setSearch} value={this.state.searchTerm} />
                <ul className="search-results">{resultList}</ul>
              </label>

              <button onClick={this.submitFilters} className="selector submit">Find a Table</button>
            </div>
          </form>
        </div>
        <ReservationOptions time={this.state.time} results={this.state.results}/>
      </div>
    );
  }
});

module.exports = ReservationSearchFilter;
