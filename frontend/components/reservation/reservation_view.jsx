var React = require('react'),
    ApiUtil = require('../../util/api_util');


var ReservationView = React.createClass({
  getInitialState: function () {
    return this.props.location.state;
  },

  render: function () {
    return(
      <div>I am here</div>
    );
  }
});

module.exports = ReservationView;
