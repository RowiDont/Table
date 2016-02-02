window.Table = {};

document.addEventListener('DOMContentLoaded', function () {

var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    root = document.getElementById('content'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    index = require('./components/index'),
    Header = require('./components/header'),
    SessionForm = require('./components/sessions/new'),
    UserForm = require('./components/users/user_form'),
    CityIndex = require('./components//cities/city_index'),
    RestaurantView = require('./components/restaurant_view/restaurant_view'),
    ReservationView = require('./components/reservation/reservation_view'),
    ReservationConfirmation = require('./components/reservation/reservation_confirmation'),
    UserView = require('./components/users/show.jsx'),
    UserUpdate = require('./components/users/user_update_form.jsx'),
    CurrentUserStore = require('./stores/current_user_store'),
    SessionsApiUtil = require('./util/sessions_api_util');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={ App }  onEnter={ _checkIfLoggedIn }>
    <IndexRoute component={ index } />
    <Route path="login" component={ SessionForm } />
    <Route path="users/new" component={ UserForm } />
    <Route path="cities/:city_id" component={ CityIndex } />
    <Route path="/restaurants/:id" component={ RestaurantView } />
    <Route path="reservation" component={ ReservationView } onEnter={ _ensureLoggedIn }>
      <Route path="confirmation" component={ ReservationConfirmation } />
    </Route>
    <Route path="user" component={ UserView }>
      <Route path="edit" component={ UserUpdate } />
    </Route>
  </Route>
);

function _checkIfLoggedIn() {
  if (!CurrentUserStore.userHasBeenFetched()) {
    SessionsApiUtil.fetchCurrentUser();
  }
}

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    // TODO: store reservation in session data
    if (!CurrentUserStore.isLoggedIn()) {
      // debugger
      replace({redirect: true}, "/login");
    }
    callback();
  }
}


ReactDOM.render(<Router>{ routes }</Router>, root);
});
