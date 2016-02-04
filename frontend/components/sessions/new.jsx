var React = require('react');
var SessionsApiUtil = require('./../../util/sessions_api_util');
var ErrorStore = require('../../stores/error_store');

var SessionForm = React.createClass({
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
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      if (this.props.location.state) {
        this.props.history.pushState({}, "/reservation");
      } else {
        this.props.history.goBack();
      }
    }.bind(this));
  },


  render: function() {
    var errorClass = "errors";
    if (Object.keys(this.state.errors).length !== 0) {
      errorClass = "errors";
    }

    return (
      <div className="signin">
        <form onSubmit={ this.submit }>

          <h1>Please sign in</h1>

          <label>
            <div className="errors-first">{this.state.errors[0]}</div>
            <input placeholder="Email" type="text" name="email" />
          </label>

          <label>
            <input placeholder="Password" type="password" name="password" />
          </label>

          <button>Sign in</button>

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


module.exports = SessionForm;
