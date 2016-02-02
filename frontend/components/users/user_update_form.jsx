var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var UserUpdate = React.createClass({
  getInitialState: function() {
    var user = this.props.location.state;
    return { email: user.email,
             fname: user.fname,
             lname: user.lname,
             imageFile: null,
             imageUrl: "",
             imageClass: ""};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
              email: newProps.user.email,
              fname: newProps.user.fname,
              lname: newProps.user.lname,
    });
  },

  goBack: function () {
    this.props.history.goBack();
  },

  render: function() {
    form = (
      <div className="update-user">
        <h2>Edit your profile</h2>

        <form onSubmit={this.handleSubmit}>
          <label className="name">First name
            <input type="text" onChange={this.changeFname} value={this.state.fname} />
          </label>
          <label className="name">Last name
            <input type="text" onChange={this.changeLname} value={this.state.lname} />
          </label>
          <label className="email">Email
            <input type="text" onChange={this.changeEmail} value={this.state.email} />
          </label>

          <label>Profile picture:
            <img className={this.state.imageClass} src={this.state.imageUrl}/>
            <input type="file" onChange={this.changeFile} />
          </label>

          <button>Save changes</button>
          <button className="cancel" onClick={this.goBack}>Cancel</button>
        </form>

      </div>
    );

    return form;
  },

  changeEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  changeFname: function(e) {
    this.setState({ fname: e.currentTarget.value });
  },

  changeLname: function(e) {
    this.setState({ lname: e.currentTarget.value });
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({ imageClass: "preview-image", imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({ imageClass: "", imageFile: null, imageUrl: "" });
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("user[email]", this.state.email);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);
    formData.append("user[avatar]", this.state.imageFile);

    ApiUtil.updateUser(formData, this.resetForm);
  },

  resetForm: function() {
    this.setState({ email: this.props.email,
                    fname: this.props.fname,
                    lname: this.props.lname,
                    imageFile: null,
                    imageUrl: ""});
  }
});

module.exports = UserUpdate;
