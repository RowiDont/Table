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
    var backgroundClasses = ["bg1", "bg2", "bg3"];

    this.searchClass = "filter-box search " + backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];

    return { people: "2",
             time: this.props.restaurant.opens.time,
             date: moment().startOf("day"),
             id: 0,
             results: "",
             searchTerm: "",
             searchOptions: [],
             searchClass: "search-results",
             type: "",
             clicked: false,
             searchTermHidden: ""
           };
  },

  componentDidMount: function () {
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

    this.token = ReservationFilterStore.addListener(this._getResults);
    this.token2 = RestaurantStore.addListener(this._getSearchResults);
    this.setState({ time: current_time });
  },

  componentWillUnmount: function () {
    this.token.remove();
    this.token2.remove();
    window.clearTimeout(this.timer);
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
    // if (results.length === 1) {
    //   this.setState({ id: results[0].searchable_id });
    // }
    if (results.length >= 1) {
      this.setState({ id: results[0].searchable_id, searchTermHidden: results[0].content });
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

  routeToRestaurant: function (type, id, state) {
    var oldState = state ? state : {};
    var url = type + "/" + id;
    this.context.history.pushState(oldState, url);
  },

  submitFilters: function (e) {
    e.preventDefault();
    if (this.state.searchOptions.length >= 1 || this.state.clicked === true) {
      this.updateFitlers();
      ApiUtil.indexFilter(this.routeToRestaurant);
    }
  },

  fillForm: function (e) {
    var id = e.currentTarget.id;
    var text = e.currentTarget.innerText;
    var type = e.currentTarget.dataset.type;
    this.setState( { searchTerm: text, id: id, searchTermHidden: text, searchOptions: [], clicked: true });
  },

  hide: function (e) {
    this.timer = setTimeout(
      function () {this.setState({ searchClass: "hidden" });}.bind(this),
      1000
    );
  },

  revealList: function () {
    this.setState({ searchClass: "search-results" });
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
    var date = <CalendarFilter changeDate={this.setDate} moment={this.state.date} />;

    // time
    var timeOptions = [];
    var start = restaurant.opens.time + (restaurant.opens.time % 30);
    var end = restaurant.closes.time - (restaurant.closes.time % 30);
    for (var j = start; j < end; j += 30) {
      timeOptions.push(<option key={j} value={j}>{Table.timeToString(j)}</option>);
    }

    var resultList = this.state.searchOptions.map(function (item, idx) {
      // debugger
      var type = item.searchable_type;
      var id = item.searchable_id;
      var klass = "search-item";
      if (this.state.searchTermHidden === item.content) {
        klass = "search-item selected";
      }

      if (type === "Restaurant") {
        return <li onClick={this.fillForm} data-type={type} id={id} className={klass} key={idx}><i className="fa fa-cutlery"></i>{item.content}</li>;
      } else {
        return <li onClick={this.fillForm} data-type={type} id={id} className={klass} key={idx}><i className="fa fa-map-marker"></i>{item.content}</li>;
      }
    }, this);

    // var backgroundClasses = ["bg1", "bg2", "bg3"];

    // var searchClass = "filter-box search " + backgroundClasses[Math.floor(Math.random() * backgroundClasses.length)];

    return(
      <div className={this.searchClass}>
        <h2>Already know where you want to go? Make a Reservation now</h2>
        <div className="reservation-filter-form">
          <form>
            <div className="search-filter">
              <select defaultValue="2" onChange={this.setPeople} className="reservation-filter-people selector dropdown" name="people">
                {seatingOptions}
              </select>
              <label>
                {date}
              </label>
              <select value={this.state.time} onChange={this.setTime} className="reservation-filter-time selector dropdown" name="time">
                {timeOptions}
              </select>
              <label>
                <input onBlur={this.hide} onClick={this.revealList} autoComplete="off" type="text" placeholder="Resturant or City" id="searchbox" className="selector" onChange={this.setSearch} value={this.state.searchTerm} />
                <ul className={this.state.searchClass}>{resultList}</ul>
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
