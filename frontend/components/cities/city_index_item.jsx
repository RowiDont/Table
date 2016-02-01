var React = require('react');

var CityIndexItem = React.createClass({
  render: function () {
    var restaurant = this.props.restaurant,
        name = restaurant.name,
        address = restaurant.address,
        id = restaurant.id;

    var priceCt = parseInt(restaurant.price);
    var pricing = [];

    for (var i = 0; i < 4; i++) {
      var klass;
      if (priceCt > 0) {
        klass = "selected";
      } else {
        klass = "";
      }
      pricing.push(<span key={i} className={klass}>$</span>);
      priceCt--;
    }

    var url = "#/restaurants/" + this.props.restaurant.id;
    var img_url = restaurant.image_url;

    return(
      <li className="restaurant-item group">
        <a href={url}><img id={id} className="restaurant-item-photo" src={img_url}/></a>
        <div className="restaurant-item-details">
          <a href={url}><h3 id={id} className="restaurant-item-name">{name}</h3></a>
          <span className="restaurant-item-address">{address}</span>
        </div>
        <div className="price">{pricing}</div>
      </li>
    );
  }
});

module.exports = CityIndexItem;
