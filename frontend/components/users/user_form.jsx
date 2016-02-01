var React = require('react');
var History = require('react-router').History;
var UsersApiUtil = require('../../util/users_api_util');

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    debugger;
  },

  render: function() {

    return (
      <form className="signin" onSubmit={ this.submit }>

        <h1>Sign Up!</h1>

        <label>
          <input placeholder="First name" type="text" name="fname" />
        </label>

        <label>
          <input placeholder="Last name" type="text" name="lname" />
        </label>

        <label>
          <input placeholder="Email" type="text" name="email" />
        </label>

        <label>
          <input placeholder="Password" type="password" name="password" />
        </label>

        <button>Sign up</button>
      </form>
    );
  },

});

module.exports = UserForm;
