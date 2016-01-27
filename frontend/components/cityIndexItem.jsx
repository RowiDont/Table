var React = require('react'),
    ApiUtil = require('../util/api_util'),
    RestaurantStore = require('../stores/restaurantStore');


var CityIndexItem = React.createClass({
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

  render: function () {
    var list = Object.keys(this.state.restaurants).map(function (key) {
      var restaurant = this.state.restaurants[key].restaurant,
          name = restaurant.name,
          address = restaurant.address;

      return (

        <li className="restaurant-item" key={key}>
          <h3 className="restaurant-item-name">{name}</h3>
          <span className="restaurant-item-address">{address}</span>
        </li>
      );
    }.bind(this));

    return <ul>{list}</ul>;
  }
});

module.exports = CityIndexItem;
