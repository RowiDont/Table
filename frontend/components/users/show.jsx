var React = require('react'),
    CurrentUserStore = require('../../stores/current_user_store');

var UserView = React.createClass({
  getInitialState: function () {
    return { user: CurrentUserStore.currentUser() };
  },

  componentDidMount: function () {
    this.token = CurrentUserStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  onChange: function () {
    this.setState({ user: CurrentUserStore.currentUser() });
  },

  redirectToEdit: function () {
    this.props.history.pushState(this.state.user, "/user/edit");
  },

  render: function () {
    var name = (
      <h1 className="username">
        {this.state.user.fname} {this.state.user.lname}
      </h1>
    );

    var email = (
      <div className="email">
        {this.state.user.email}
      </div>
    );

    var sideLinks = (
      <ul>
        <li onClick={this.redirectToEdit}>Edit Profile</li>
        <li onClick={this.redirectToReservations}>Reservations</li>
        <li onClick={this.redirectToFavorites}>Favorites</li>
      </ul>
    );

    return(
      <div className="user-page">
        <div className="user-show-header">
          {name}
        </div>
        <div className="sidebar">
          {sideLinks}
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = UserView;
