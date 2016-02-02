var React = require('react');
var UsersApiUtil = require('../../util/users_api_util.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var UserUpdate = React.createClass({
  getInitialState: function() {
    var user = this.props.location.state;
    return { email: "",
             fname: "",
             lname: "",
             imageFile: null,
             imageUrl: user.avatar,
             imageClass: "preview"};
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

  redirectToView: function () {
    this.props.history.pushState({}, "/user/reservations");
  },

  render: function() {
    var user = this.props.location.state;
    form = (
      <div className="update-user">
        <h2>Edit your profile</h2>

        <form onSubmit={this.handleSubmit}>
          <label className="name">First name
            <input placeholder={user.fname} type="text" onChange={this.changeFname} />
          </label>
          <label className="name">Last name
            <input placeholder={user.lname} type="text" onChange={this.changeLname} />
          </label>
          <label className="email">Email
            <input placeholder={user.email} type="text" onChange={this.changeEmail} />
          </label>

          <label>Profile picture:
            <input type="file" onChange={this.changeFile} />
          </label>

          <button>Save changes</button>
          <a className="cancel" onClick={this.goBack}>Cancel</a>
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

    if (this.state.email) {formData.append("user[email]", this.state.email);}
    if (this.state.fname) {formData.append("user[fname]", this.state.fname);}
    if (this.state.lname) {formData.append("user[lname]", this.state.lname);}
    if (this.state.imageFile) {formData.append("user[avatar]", this.state.imageFile);}

    UsersApiUtil.updateUser(formData, this.redirectToView);
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
