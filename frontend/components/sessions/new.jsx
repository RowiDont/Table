var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },


  render: function() {

    return (
      <form className="signin" onSubmit={ this.submit }>

        <h1>Please sign in</h1>

        <label>
          <input placeholder="Email" type="text" name="email" />
        </label>

        <label>
          <input placeholder="Password" type="password" name="password" />
        </label>

        <button>Sign in</button>
      </form>
    );
  },

});

module.exports = SessionForm;
