var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    RestaurantStore = require('../../stores/restaurant_store'),
    CityIndexItem = require('./city_index_item');


var CityIndex = React.createClass({
  getInitialState: function () {
    window.scrollTo(0, 0);
    return { restaurants: RestaurantStore.all() };
  },

  _onChange: function () {
    this.setState({ restaurants: RestaurantStore.all() });
  },

  componentDidMount: function () {
    this.token = RestaurantStore.addListener(this._onChange);
    ApiUtil.fetchRestaurants(this.props.params.city_id);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  redirect: function (e) {
    e.preventDefault();

    var id = e.currentTarget.id;
    var path = "/restaurants/" + id;
    this.props.history.pushState(null, path);
  },

  render: function () {

    var restaurantCount = Object.keys(this.state.restaurants).length;
    var city = "";
    if (restaurantCount > 0) {
      city = this.state.restaurants[0].restaurant.city.name;
    }

    var list = Object.keys(this.state.restaurants).map(function (key) {
      var rest = this.state.restaurants[key].restaurant;
      return <CityIndexItem key={key} restaurant={rest} redirect={this.redirect}/>;
    }.bind(this));

    return(
      <div className="restaurant-list-container">
        <h2 className="restaurant-count">{restaurantCount} tables available in {city}</h2>
        <ul className="restaurant-list">{list}</ul>
      </div>
    );
  }
});

module.exports = CityIndex;
