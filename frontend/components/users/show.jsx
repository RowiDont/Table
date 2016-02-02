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

  render: function () {
    var name = (
      <div className="username">
        {this.state.user.fname} {this.state.user.lname}
      </div>
    );

    var email = (
      <div className="email">
        {this.state.user.email}
      </div>
    );

    return(
      <div className="user-page">
        {name}
        {email}
      </div>
    );
  }
});

module.exports = UserView;
