var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ReservationTempStore = require('../../stores/reservation_temp_store'),
    CurrentUserStore = require('../../stores/current_user_store'),
    moment = require('moment'),
    ReservationItem = require('./reservation_item');


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

  cancel: function (e) {
    var rest_url = "restaurants/" + this.state.rest_id;
    // debugger
    this.props.history.pushState({}, rest_url);
  },

  render: function () {
    if (Object.keys(this.state).length !== 0) {
      var currentUser = CurrentUserStore.currentUser();
      // var rest_link = <a href={rest_url}>{rest}</a>;
      var headerText = "Complete your reservation";
      var detailClass = "reservation-page-details group";

      var form = (
        <form className="reservation-details" onSubmit={ this.submit }>
          <h3 className="hidden">{currentUser.fname + " " + currentUser.lname}</h3>
          <input type="hidden" placeholder="phone number" name="number"/>
          <input type="hidden" placeholder="email" defaultValue={currentUser.email} name="email"/>
          <textarea className="hidden" placeholder="Add a special request (optional)" name="request"></textarea>
          <button>Complete Reservation</button>
        </form>
      );

      var languages = ["吃好 (chī hǎo)", "Smacznego", "Buen Provecho", "Buon appetito", "Eet Smakelijk", "いただきます (itadakimasu)", "בתיאבון (be'te-avon)"];

      if (this.props.location.pathname === "/reservation/confirmation") {
        form = "";
        var greeting = languages[Math.floor(Math.random() * languages.length)];
        headerText = "Reservation Complete, " + greeting + "! (enjoy your meal)";
        detailClass = "reservation-page-details group grey";
      }

      var reservation = <ReservationItem res={this.state} cancel={this.cancel} klass={detailClass}/>;

      return(
        <div className="reservation-page">
          <div className="reservation-page-header">
            <h1>{ headerText }</h1>
          </div>
          { reservation }
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
