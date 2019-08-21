import React from "react";
import styles from "./ShakeMotion.css";

export default class ShakeMotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.reset = this.reset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggered !== this.state.open) {
      this.setState({
        open: nextProps.triggered
      });
    }
  }

  componentDidUpdate() {
    if (this.props.triggered) {
      this.handleMouseDown();
    }
  }

  handleMouseDown = () => {
    setTimeout(this.reset, 1000);
  };

  reset() {
    this.props.reset();
  }

  render() {
    return (
      <div className={this.state.open ? styles.motionWrapper : ""}>
        {this.props.children}
      </div>
    );
  }
}
