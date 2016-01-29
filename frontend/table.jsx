document.addEventListener('DOMContentLoaded', function () {

var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    root = document.getElementById('content'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    index = require('./components/index'),
    CityIndex = require('./components/city_index'),
    RestaurantView = require('./components/restaurant_view');

var App = React.createClass({
  render: function () {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={index} />
    <Route path="cities/:city_id" component={CityIndex} />
    <Route path="restaurants/:id" component={RestaurantView} />
  </Route>
);


ReactDOM.render(<Router>{routes}</Router>, root);
});
