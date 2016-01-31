var React = require('react');

var toString = function (time) {
  var hours = Math.floor(time / 60);
  var minutes = time % 60;
  var m = hours > 11 ? " PM" : " AM";
  hours = hours % 12;
  if (hours === 0) { hours = 12; }
  if (minutes < 10) { minutes = "0" + minutes; }

  return hours + ":" + minutes + m;
};

var ReservationOptions = React.createClass({

  render: function () {
    var toString = function (time) {
      var hours = Math.floor(time / 60);
      var minutes = time % 60;
      var m = hours > 11 ? " PM" : " AM";
      hours = hours % 12;
      if (hours === 0) { hours = 12; }
      if (minutes < 10) { minutes = "0" + minutes; }

      return hours + ":" + minutes + m;
    };

    var results = this.props.results;
    var resultList = <div></div>;
    if (this.props.results) {
      resultList = Object.keys(results).map(function (idx) {
        res = results[idx];
        return <div key={idx}>{toString(res.time.time)}</div>;
      }, this);
    }

    return <div>{resultList}</div>;
  }
});

module.exports = ReservationOptions;
