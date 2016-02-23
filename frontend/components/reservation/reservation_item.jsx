var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ReservationTempStore = require('../../stores/reservation_temp_store'),
    CurrentUserStore = require('../../stores/current_user_store'),
    moment = require('moment');

var ReservationItem = React.createClass({
  componentWillReceiveProps: function (newProps) {
    if (newProps.res !== this.props.res) {
      this.forceUpdate();
    }
  },

  render: function () {
    var res = this.props.res;
    var rest = res.name;
    var rest_url = "#/restaurants/" + res.rest_id;
    var rest_link = <a href={rest_url}>{rest}</a>;

    return(
      <ul className={this.props.klass}>
        <li><img src={ res.image_url }></img></li>
        <li className="guests"><h6>Guests</h6><h4>{res.head_count}</h4></li>
        <li className="date"><h6>Date</h6><h4>{moment(res.date).format('dddd, MMMM Do, YYYY')}</h4></li>
        <li className="time"><h6>Time</h6><h4>{Table.timeToString(res.time.time)}</h4></li>
        <li className="rest"><h6>Restaurant</h6><h4>{rest_link}</h4></li>
        <li className="cancel"><a id={res.id} onClick={this.props.cancel}><button>cancel</button></a></li>
      </ul>
    );
  }
});

module.exports = ReservationItem;
