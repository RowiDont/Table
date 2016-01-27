var React = require('react'),
    ApiUtil = require('../util/api_util'),
    CityStore = require('../stores/cityStore');

var CityIndex = React.createClass({
  getInitialState: function () {
    return { cities: CityStore.all() };
  },

  _onChange: function () {
    this.setState( {cities: CityStore.all() });
  },

  componentDidMount: function () {
    this.token = CityStore.addListener(this._onChange);
    ApiUtil.fetchCities();
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  clickRedirect: function (e){
    e.preventDefault();
    var path = "/cities/" + e.currentTarget.id;
    this.props.history.pushState("", path);
  },

  render: function () {
    var cities = this.state.cities.map(function (city, index) {
      var link = "#cities/" + city.id;
      return (<a href={link}
                 id={city.id}
                 className="city"
                 key={index}
                 onClick={this.clickRedirect}>
               <h2>{city.name}</h2>
               <div className="count">(Restaurants: {city.count})</div>
              </a>
             );
    }.bind(this));

    return <ul className="city-grid group">{cities}</ul>;
  }
});

module.exports = CityIndex;
