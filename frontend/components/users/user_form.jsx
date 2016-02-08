var React = require('react');
var History = require('react-router').History;
var UsersApiUtil = require('../../util/users_api_util');
var ErrorStore = require('../../stores/error_store');

var UserForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
            fname: "",
            lname: "",
            email: "",
            password: ""
    };
  },

  componentDidMount: function () {
    this.token = ErrorStore.addListener(this.onChange);
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  onChange: function () {
    this.setErrors();
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser(attrs, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  hideError: function (e) {
    var scope = this;
    theError = e.currentTarget.children[1].name;
    var error = {};
    error[theError] = "";
    this.setState(error);
  },

  setErrors: function() {
    var errors = ErrorStore.all();
    this.setState({fname: errors.fname ? errors.fname[0] : ""});
    this.setState({lname: errors.lname ? errors.lname[0] : ""});
    this.setState({email: errors.email ? errors.email[0] : ""});
    this.setState({password: errors.password ? errors.password[0] : ""});
  },

  render: function() {
    var fname = this.state.fname;
    var lname = this.state.lname;
    var email = this.state.email;
    var password = this.state.password;

    return (
      <div className="signin">
        <form onSubmit={ this.submit }>

          <h1>Welcome to OpenTable!</h1>

          <label onClick={this.hideError}>
            <div className="errors-first">{ fname }</div>
            <input placeholder="First name" type="text" name="fname" />
          </label>

          <label onClick={this.hideError}>
            <div className="errors">{ lname }</div>
            <input placeholder="Last name" type="text" name="lname" />
          </label>

          <label onClick={this.hideError}>
            <div className="errors">{ email }</div>
            <input placeholder="Email" type="text" name="email" />
          </label>

          <label onClick={this.hideError}>
            <div className="errors">{ password }</div>
            <input placeholder="Password" type="password" name="password" />
          </label>

          <button>Sign up</button>
        </form>

        <form className="guest" onSubmit={ this.submit }>
          <input value="test@test.com" type="hidden" name="email" />
          <input value="starwars" type="hidden" name="password" />
          <button>Sign in as guest</button>
        </form>

        <a href="/auth/google_oauth2"></a>
    </div>
    );
  },

});

module.exports = UserForm;
