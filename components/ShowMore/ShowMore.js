import React, { Component } from "react";
import styles from "./ShowMore.css";

class ShowMore extends Component {
  constructor(props) {
    // do we need a constructor for using this.props.children ?
    super(props);
    this.state = {
      expanded: false
    };
  }

  renderButton() {
    if (this.state.expanded) {
      return (
        <button
          onClick={() => {
            this.setState({ expanded: false });
          }}
        >
          Show Less
        </button>
      );
    }
    return (
      <button
        onClick={() => {
          this.setState({ expanded: true });
        }}
      >
        Show More
      </button>
    );
  }

  render() {
    return (
      <div className={this.state.expanded ? styles.expanded : styles.notExpanded}>
        Show More
        {this.props.children}
      </div>
    );
  }
}

export default ShowMore;
