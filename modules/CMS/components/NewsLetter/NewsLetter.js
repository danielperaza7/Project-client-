import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewsLetter } from "../../../Customer/CustomerActions.js";
import CircleLoader from "../../../../components/masks/CircleLoader";

import styles from "./NewsLetter.css";

// import styles from './Image1.css';

export const NewsLetterInfo = {
  id: "NewsLetter",
  description: "NewsLetter component with input box and submit button",
  props: {
    height: "44px",
    FontSize: "14px",
    ButtonInfo: "SIGN UP"
  }
};

class NewsLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_err: false,
      err: "",
      press_once: false,
      waitForResponse: false,
      newsvalue: ""
    };
    this.onsubmit = this.onsubmit.bind(this);
    this.errMsg = this.errMsg.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  onsubmit(event) {
    event.preventDefault();
    this.setState({ press_once: true, waitForResponse: true });
    this.props.dispatch(postNewsLetter(this.state.newsvalue, this.errMsg));
  }

  onchange(input) {
    this.setState({ newsvalue: input, email_err: false, err: "" });
  }

  errMsg(error, msg) {
    this.setState({ press_once: false, waitForResponse: false });
    if (error) {
      this.setState({
        email_err: true,
        err: msg
      });
    } else {
      this.setState({
        email_err: false,
        err: "sign up successfully!"
      });
    }
  }

  render() {
    const { height, FontSize, ButtonInfo } = this.props;

    return (
      <div>
        <form>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Enter your email"
            onChange={event => this.onchange(event.target.value)}
            style={{
              height,
              fontSize: FontSize,
              borderColor: this.state.email_err ? "red" : ""
            }}
          />
          <button
            className={styles.emailButton}
            onClick={this.onsubmit}
            disabled={this.state.press_once}
            style={{ height, fontSize: FontSize }}
          >
            {this.state.waitForResponse ? <CircleLoader /> : ButtonInfo}
          </button>
        </form>
        <div
          className={styles.errShow}
          style={{
            display: !this.state.err ? "none" : "",
            color: !this.state.email_err ? "green" : ""
          }}
        >
          {this.state.err}
        </div>
      </div>
    );
  }
}

export default connect()(NewsLetter);
