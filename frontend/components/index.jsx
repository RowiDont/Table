var React = require('react'),
    ApiUtil = require('../util/api_util'),
    CityStore = require('../stores/city_store');

var index = React.createClass({
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
    var id = e.currentTarget.id;
    var path = "/cities/" + id;
    this.props.history.pushState({ count: this.state.cities[id - 1].count }, path);
  },

  render: function () {
    var welcome = (
      <div className="city-index-welcome">
        <h1>Make restaurant reservations the easy way</h1>
        <h2>Our network connects diners with more than 50 restaurants worldwide!</h2>
      </div>
    );

    var cities = this.state.cities.map(function (city, index) {
      var link = "#cities/" + city.id;
      var klass = "city " + city.name.replace(/ /g,'');
      return (<a href={link}
                 id={city.id}
                 className={klass}
                 key={index}
                 onClick={this.clickRedirect}>
               <h2>{city.name}</h2>
               <div className="count">(Restaurants: {city.count})</div>
              </a>
             );
    }.bind(this));

    var cityGrid = (
      <div className="city-grid-container">
        <h2>Featured Cities</h2>
        <ul className="city-grid group">{cities}</ul>
      </div>
    );
    return(
      <div>
        {welcome}
        {cityGrid}
      </div>
    );
  }
});

module.exports = index;
