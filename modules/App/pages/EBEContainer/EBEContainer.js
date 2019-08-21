/**
 * Created by warrenchen on 3/22/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Actions
import { changeStoreName, serverChangeStoreName } from "../../AppActions";
import { getStoreName } from "../../AppReducer";

class EBEContainer extends Component {
  componentWillMount() {
    if (this.props.storename !== "ebe") {
      this.props.dispatch(changeStoreName("ebe"));
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function mapStateToProps(store) {
  serverChangeStoreName("ebe");

  return {
    storename: getStoreName(store)
  };
}

export default connect(mapStateToProps)(EBEContainer);
