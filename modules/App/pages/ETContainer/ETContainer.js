/**
 * Created by warrenchen on 3/22/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";

// Import Actions
import { changeStoreName } from "../../AppActions";
import { getStoreName } from "../../AppReducer";

class ETContainer extends Component {
  componentWillMount() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.storename !== "et") {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.dispatch(changeStoreName("et"));
    }
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return <div>{this.props.children}</div>;
  }
}

function mapStateToProps(store) {
  return {
    storename: getStoreName(store)
  };
}

export default connect(mapStateToProps)(ETContainer);
