var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ReservationTempStore = require('../../stores/reservation_temp_store'),
    CurrentUserStore = require('../../stores/current_user_store'),
    moment = require('moment');


var ReservationView = React.createClass({
  getInitialState: function () {
    return ReservationTempStore.all();
  },

  componentDidMount: function () {
    this.token1 = ReservationTempStore.addListener(this.onChange);
    ApiUtil.getTempReservation();
  },

  componentWillUnmount: function () {
    this.token1.remove();
  },

  onChange: function () {
    this.setState(ReservationTempStore.all());
  },

  submit: function (e) {
    e.preventDefault();

    mainData = this.state;
    optionalData = $(e.currentTarget).serializeJSON();
    ApiUtil.createReservation(mainData, optionalData);
    this.props.history.pushState({}, "/reservation/confirmation");
  },

  render: function () {
    if (Object.keys(this.state).length !== 0) {
      var currentUser = CurrentUserStore.currentUser();
      var rest = this.state.name;
      var rest_url = "#/restaurants/" + this.state.rest_id;
      var rest_link = <a href={rest_url}>{rest}</a>;
      var headerText = "Complete your reservation";
      var detailClass = "reservation-page-details group";

      var restaurant = <li className="rest"><h6>Restaurant</h6><h4>{rest_link}</h4></li>,
          time = <li className="time"><h6>Time</h6><h4>{Table.timeToString(this.state.time.time)}</h4></li>,
          guests = <li className="guests"><h6>Guests</h6><h4>{this.state.head_count}</h4></li>,
          date = <li className="date"><h6>Date</h6><h4>{moment(this.state.date).format('dddd, MMMM Do, YYYY')}</h4></li>;

      var form = (
        <form className="reservation-details" onSubmit={ this.submit }>
          <h3 className="hidden">{currentUser.fname + " " + currentUser.lname}</h3>
          <input type="hidden" placeholder="phone number" name="number"/>
          <input type="hidden" placeholder="email" defaultValue={currentUser.email} name="email"/>
          <textarea className="hidden" placeholder="Add a special request (optional)" name="request"></textarea>
          <button>Complete Reservation</button>
        </form>
      );

      var languages = ["吃好 (chī hǎo)", "Smacznego", "Buen Provecho", "Bon appetit", "Buon appetito", "Eet Smakelijk", "いただきます (itadakimasu)", "בתיאבון (be'te-avon)"];

      if (this.props.location.pathname === "/reservation/confirmation") {
        form = "";
        var greeting = languages[Math.floor(Math.random() * languages.length)];
        headerText = "Reservation Complete, " + greeting + "!";
        detailClass = "reservation-page-details group grey";
      }


      return(
        <div className="reservation-page">
          <div className="reservation-page-header">
            <h1>{ headerText }</h1>
          </div>
          <ul className={ detailClass }>
            <li><img src={ this.state.image_url }></img></li>
            { guests }
            { date }
            { time }
            { restaurant }
          </ul>

          { form }

          { this.props.children }
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});

module.exports = ReservationView;
