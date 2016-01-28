document.addEventListener('DOMContentLoaded', function () {

var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    root = document.getElementById('content'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    CityIndex = require('./components/cityIndex'),
    CityIndexItem = require('./components/cityIndexItem'),
    Restaurant = require('./components/restaurant');

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
    <IndexRoute component={CityIndex} />
    <Route path="cities/:city_id" component={CityIndexItem} />
    <Route path="restaurants/:id" component={Restaurant} />
  </Route>
);


ReactDOM.render(<Router>{routes}</Router>, root);
});
