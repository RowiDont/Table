var React = require('react'),
    ApiUtil = require('../util/api_util'),
    RestaurantStore = require('../stores/restaurantStore');

var Restaurant = React.createClass({
  getInitialState: function () {
    return { rest: RestaurantStore.find(this.props.params.id) };
  },

  _onChange: function () {
    this.setState({ rest: RestaurantStore.find(this.props.params.id), fetched: true });
  },

  componentDidMount: function () {
    RestaurantStore.addListener(this._onChange);
    ApiUtil.fetchSingleRestaurant(this.props.params.id);
  },

  render: function () {
    var map = <div></div>,
        header = <h1></h1>;

    if (this.state.fetched) {
      var restaurant = this.state.rest,
          lat = restaurant.lat,
          lng = restaurant.lng;

      var url = {
        url: "https://maps.googleapis.com/maps/api/staticmap?center=" +
        lat + "," + lng + "&size=900x250&zoom=13&" +
        "&markers=" + lat + "," + lng
      };

      map = <img className="restaurant-page-map" src={url.url} />;
      header = <h1>About {this.state.rest.name}</h1>;
    }


    return(
      <div className="restaurant-page">
        {header}
        {map}
      </div>
    );
  }
});

module.exports = Restaurant;
