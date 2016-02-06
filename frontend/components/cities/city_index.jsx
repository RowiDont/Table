var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    RestaurantStore = require('../../stores/restaurant_store'),
    CityIndexItem = require('./city_index_item');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');



var CityIndex = React.createClass({
  getInitialState: function () {
    window.scrollTo(0, 0);
    return { restaurants: {}, page: 0 };
  },

  _onChange: function () {
    this.setState({ restaurants: RestaurantStore.all() });
  },

  componentDidMount: function () {
    this.token = RestaurantStore.addListener(this._onChange);
    ApiUtil.fetchRestaurants(this.props.params.city_id, this.state.page);
  },

  componentWillReceiveProps: function () {
    this.setState({ page: this.props.location.state.page || 1});
    ApiUtil.fetchRestaurants(this.props.params.city_id, this.state.page + 1);
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

  nextPage: function () {
    this.props.history.pushState({page: this.state.page + 1}, "/cities/1");
  },

  prevPage: function () {
    ApiUtil.fetchRestaurants(this.props.params.city_id, this.state.page - 1);
    this.setState( {page: this.state.page - 1} );
  },

  render: function () {
    var restaurantCount = Object.keys(this.state.restaurants).length;
    var city = "";
    if (restaurantCount > 0) {
      city = RestaurantStore.city();
    }

    var list = Object.keys(this.state.restaurants).map(function (key, idx) {
      var rest = this.state.restaurants[idx];
      return <CityIndexItem key={idx} restaurant={rest} redirect={this.redirect}/>;
    }.bind(this));

    var prev = "";
    if (this.state.page > 1) {
      prev = <a onClick={this.prevPage}>prev</a>;
    }

    var next = "";
    if (this.state.page === 1) {
      next = <a onClick={this.nextPage}>next</a>;
    } else if (this.state.page < 3) {
      next = <a onClick={this.nextPage}> | next</a>;
    }


    return(
      <div className="restaurant-list-container">
        <h2 className="restaurant-count">{restaurantCount} tables available in {city}</h2>
        <ul key="50" className="restaurant-list">{list}</ul>
        {prev}{next}
      </div>
    );
  }
});

module.exports = CityIndex;
