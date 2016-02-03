var React = require('react');
var UsersApiUtil = require('../../util/users_api_util.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var CurrentUserStore = require('../../stores/current_user_store');


var UserUpdate = React.createClass({
  getInitialState: function() {
    return { email: "",
             fname: "",
             lname: "",
             imageFile: null,
             imageUrl: "",
             imageClass: "preview",
             user: CurrentUserStore.currentUser() };
  },

  componentDidMount: function () {
    this.token = CurrentUserStore.addListener(this.onChange);
  },

  onChange: function () {
    this.setState({ user: CurrentUserStore.currentUser() });
  },

  componentWillUnmount: function () {
    this.token.remove();
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
          <a className="cancel" href="/user/reservation">Cancel</a>
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
    var count = 0;
    if (this.state.email) {formData.append("user[email]", this.state.email); count++;}
    if (this.state.fname) {formData.append("user[fname]", this.state.fname); count++;}
    if (this.state.lname) {formData.append("user[lname]", this.state.lname); count++;}
    if (this.state.imageFile) {formData.append("user[avatar]", this.state.imageFile); count++;}

    if (count === 0) { formData.append("user[monster]", "trux"); }
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
