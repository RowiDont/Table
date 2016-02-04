var React = require('react');
var History = require('react-router').History;
var UsersApiUtil = require('../../util/users_api_util');
var ErrorStore = require('../../stores/error_store');

var UserForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { errors: {} };
  },

  componentDidMount: function () {
    this.token = ErrorStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  onChange: function () {
    this.setState({ errors: ErrorStore.all() });
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser(attrs, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {
    var fname = this.state.errors.fname ? this.state.errors.fname[0] : "";
    var lname = this.state.errors.lname ? this.state.errors.lname[0] : "";
    var email = this.state.errors.email ? this.state.errors.email[0] : "";
    var password = this.state.errors.password ? this.state.errors.password[0] : "";

    return (
      <form className="signin" onSubmit={ this.submit }>

        <h1>Welcome to OpenTable!</h1>

        <label>
          <div className="errors-first">{ fname }</div>
          <input placeholder="First name" type="text" name="fname" />
        </label>

        <label>
          <div className="errors">{ lname }</div>
          <input placeholder="Last name" type="text" name="lname" />
        </label>

        <label>
          <div className="errors">{ email }</div>
          <input placeholder="Email" type="text" name="email" />
        </label>

        <label>
          <div className="errors">{ password }</div>
          <input placeholder="Password" type="password" name="password" />
        </label>

        <button>Sign up</button>

        <a href="/auth/google_oauth2"></a>
      </form>
    );
  },

});

module.exports = UserForm;
