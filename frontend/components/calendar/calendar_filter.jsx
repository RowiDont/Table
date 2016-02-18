var React = require('react'),
    moment = require('moment'),
    Calendar = require('./calendar');

var CalendarFilter = React.createClass({
  getInitialState: function () {
    return { selected: this.props.moment, calendarClass: "calendar hidden" };
  },

  offClickHandle: function (e) {
    if (!e.target.className.includes("calendar") &&
        !e.target.className.includes("fa") &&
        e.target.parentElement &&
        e.target.parentElement.className !== "header" &&
        !e.target.className.includes("weekday"))
    {
      this.setState({ calendarClass: "calendar hidden" });
    }
  },

  componentDidMount: function () {
    document.addEventListener("click", this.offClickHandle);
  },

  componentWillUnmount: function () {
    document.removeEventListener("click", this.offClickHandle);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ selected: newProps.moment.clone() });
  },

  changeSelected: function (day) {
    this.props.changeDate(day);
    this.setState({ selected: day.date, calendarClass: "calendar hidden" });
  },

  revealCalendar: function (e) {
    if (this.state.calendarClass !== "calendar revealed") {
      this.setState({ calendarClass: "calendar revealed" });
    } else {
      this.setState({ calendarClass: "calendar hidden" });
    }
  },

  render: function () {
    return(
      <div className="reservation-filter-date selector">
        <div onClick={this.revealCalendar} className="calendar-value">
          {this.state.selected.format('MMMM Do, YYYY')}
        </div>
        <div className={this.state.calendarClass}>
          <div className="triangle"></div>
          <Calendar change={this.changeSelected} selected={this.state.selected.startOf("day")} />
        </div>
      </div>
    );
  }
});

module.exports = CalendarFilter;
