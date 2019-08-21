import React, { Component } from "react";
import { connect } from "react-redux";

// import actions
import { setShowHeaderFooter } from "../App/AppActions";

class CMS extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    this.props.dispatch(setShowHeaderFooter(false));
  }

  componentWillUnmount() {
    this.props.dispatch(setShowHeaderFooter(true));
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div style={{ marginTop: "-100px", paddingTop: "100px" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {};
}

export default connect()(CMS);
