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
      <div className="signin">
        <form onSubmit={ this.submit }>

          <h1>Please sign in</h1>

          <label>
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
      </div>

    );
  },

});


module.exports = SessionForm;
