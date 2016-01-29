var React = require('react');

var Calendar = React.createClass({
    getInitialState: function() {
        return {
            month: this.props.selected.clone(),
            day: this.props.selected.clone()
        };
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({ month: newProps.selected.clone(),
        day: newProps.selected.clone()
      });
    },

    previous: function() {
      // debugger
        var month = this.state.month;
        month.add(-1, "M");
        this.setState({ month: month });
    },

    next: function() {
        var month = this.state.month;
        month.add(1, "M");
        this.setState({ month: month });
    },

    render: function() {
      // debugger
        return(
          <div id="calendar">
            <div className="header">
                <i className="fa fa-angle-left" onClick={this.previous}></i>
                {this.renderMonthLabel()}
                <i className="fa fa-angle-right" onClick={this.next}></i>
            </div>
            <DayNames />
            {this.renderWeeks()}
          </div>
        );
    },

    renderWeeks: function() {
        var weeks = [],
            done = false,
            date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.props.change} selected={this.props.selected} />);
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    },

    renderMonthLabel: function() {
        return <span>{this.state.month.format("MMMM, YYYY")}</span>;
    }
});

var DayNames = React.createClass({
    render: function() {
        return(
          <div className="week names">
            <span className="weekday day">Sun</span>
            <span className="weekday day">Mon</span>
            <span className="weekday day">Tue</span>
            <span className="weekday day">Wed</span>
            <span className="weekday day">Thu</span>
            <span className="weekday day">Fri</span>
            <span className="weekday day">Sat</span>
          </div>
        );
    }
});

var Week = React.createClass({
    render: function() {
        var days = [],
            date = this.props.date,
            month = this.props.month;

        for (var i = 0; i < 7; i++) {
            var day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date
            };
            days.push(<span key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")} onClick={this.props.select.bind(null, day)}>{day.number}</span>);
            date = date.clone();
            date.add(1, "d");

        }

        return(
          <div className="week" key={days[0].toString()}>
            {days}
          </div>
        );
    }
});

module.exports = Calendar;
