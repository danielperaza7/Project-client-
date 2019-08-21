import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./SigninPage.css";
import history from "../../../../history";

// import actions
import { CMSAdminSignin } from "../../CMSActions";

// import getters
import { getCMSAuth } from "../../CMSReducer";

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.cms_authenticated) {
      history.push("/cms/admin/");
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.dispatch(CMSAdminSignin(form));
  }

  render() {
    return (
      <div className="text-center">
        <form onSubmit={this.handleSubmit}>
          <h2>CMS Admin</h2>
          <div className={styles["form-wrapper"]}>
            <div>
              <label>Username</label>
            </div>
            <div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <input type="submit" value="Sign in" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    cms_authenticated: getCMSAuth(store)
  };
}

export default connect(mapStateToProps)(SigninPage);
