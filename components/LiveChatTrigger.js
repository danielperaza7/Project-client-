import React, { Component } from "react";
import { PushDL_LiveChat } from "../modules/Analytics/components/LiveChat";
import CircleLoader from "./masks/CircleLoader";
import styles from "./LiveChatTrigger.css";

class LiveChatTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false
    };
  }

  handleOpenLiveChat() {
    this.setState({ is_loading: true });
    PushDL_LiveChat(() => {
      this.setState({ is_loading: false });
    });
  }

  render() {
    return (
      <span onClick={() => this.handleOpenLiveChat()} className={styles.clickable}>
        {" "}
        {this.props.children || "Need Help? Live Chat"}
        {" "}
        {this.state.is_loading ? <CircleLoader /> : ""}
        {" "}
      </span>
    );
  }
}

export default LiveChatTrigger;
