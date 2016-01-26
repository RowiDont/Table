var React = require('react'),
    ApiUtil = require('../util/api_util'),
    CityStore = require('../stores/city');

var CityIndex = React.createClass({
  getInitialState: function () {
    return { cities: CityStore.all() };
  },

  _onChange: function () {
    this.setState( {cities: CityStore.all() });
  },

  componentDidMount: function () {
    CityStore.addListener(this._onChange);
    ApiUtil.fetchCities();
  },

  render: function () {
    var cities = this.state.cities.map(function (city, index) {
      return <li className="city"
                 key={index}>
                 <h2>{city.name}</h2>
                 <div className="count">(Restaurants: {city.count})</div>
             </li>;
    });

    return <ul className="city-grid group">{cities}</ul>;
  }
});

module.exports = CityIndex;
