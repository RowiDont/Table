var React = require('react');

var Map = React.createClass({
  getInitialState: function () {
    return { lat: this.props.lat, lng: this.props.lng };
  },

  componentDidMount: function () {
    this.markers = {};
    var myLatLng = new google.maps.LatLng(this.state.lat, this.state.lng);
    var mapOptions = {
      center: myLatLng,
      zoom: 16,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: true
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
    });
  },

  render: function () {
    return(
      <div className="map-container">
        <div id="map" ref="map"></div>
        <div id="map cover"></div>
      </div>
    );
  }
});

module.exports = Map;
