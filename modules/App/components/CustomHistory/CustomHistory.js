import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// import actions
import { pushCustomHistory } from "../../AppActions";

class CustomHistory extends Component {
  componentWillMount() {
    this.pushCustomHistory(this.props.record);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.record, nextProps.record)) {
      this.pushCustomHistory(nextProps.record);
    }
  }

  pushCustomHistory(record) {
    this.props.dispatch(pushCustomHistory(record));
  }

  render() {
    return <div />;
  }
}
/*
  props:{
    historyProps = {
      pathname: this.props.location.pathname,
      search: this.props.location.search,
      name: this.state.title
    }
  }
*/
export default connect()(CustomHistory);
