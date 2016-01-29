var React = require('react'),
    ApiUtil = require('../util/api_util'),
    RestaurantStore = require('../stores/restaurant_store'),
    CityIndexItem = require('./city_index_item');


var CityIndex = React.createClass({
  getInitialState: function () {
    return { restaurants: {} };
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
    var restaurantCount = this.props.location.state.count;

    var list = Object.keys(this.state.restaurants).map(function (key) {
      var rest = this.state.restaurants[key].restaurant;
      return <CityIndexItem key={key} restaurant={rest} redirect={this.redirect}/>;
    }.bind(this));

    return(
      <div className="restaurant-list-container">
        <h2 className="restaurant-count">{restaurantCount} tables available</h2>
        <ul className="restaurant-list">{list}</ul>
      </div>
    );
  }
});

module.exports = CityIndex;
