var React = require('react'),
    CurrentUserStore = require('../stores/current_user_store'),
    SessionsApiUtil = require('../util/sessions_api_util');

var Header = React.createClass({
  getInitialState: function () {
    return { user: CurrentUserStore.currentUser() };
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this.userUpdate);
  },

  userUpdate: function () {
    this.setState({ user: CurrentUserStore.currentUser() });
  },

  signout: function () {
    SessionsApiUtil.logout();
  },

  render: function () {
    var user = "";
    var logout = "";
    var login = "";
    var signup = "";
    if (CurrentUserStore.isLoggedIn()) {
      user = <a className="username" href="#/user">{this.state.user.fname}</a>;
      logout = <a onClick={this.signout} className="logout">Logout</a>;
    } else {
      signup = <a href="#/users/new" className="signup">Sign up</a>;
      login = <a href="#/login" className="logout">Login</a>;
    }

    return(
      <header>
        <nav className="header-nav group">
          <div className="nav-logo">
            <a href="#/">
              <div className="logo"></div>
              <h1 className="logo-text">Table</h1>
            </a>
          </div>
          <div className="user-panel group">
            { user }
            { signup }
            { logout }
            { login }
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
