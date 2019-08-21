import React, { Component } from "react";

import styles from "./LiveViewInfo.css";

class LiveViewInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 444,
      height: 555
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.width,
      height: nextProps.height
    });
  }

  handleDimensionChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  renderInputs() {
    const { mode, handleSetIframeDimensions } = this.props;
    if (mode === "custom") {
      return (
        <div>
          <div>
            Width:
            <input
              value={this.state.width}
              onChange={event => this.handleDimensionChange("width", event.target.value)}
              type="text"
            />
            px
          </div>
          <div>
            Height:
            <input
              value={this.state.height}
              onChange={event => this.handleDimensionChange("height", event.target.value)}
              type="text"
            />
            px
          </div>
          <div>
            <button
              onClick={() => handleSetIframeDimensions(this.state.width, this.state.height)
              }
            >
              {" "}
              Apply custom dimension
              {" "}
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      width, height, mode, handleLiveViewSelect
    } = this.props;
    return (
      <div>
        <div>
          CURRENT: width=
          {width}
px | height=
          {height}
px
        </div>
        <div className={styles.buttonWrapper}>
          View Mode:
          <button
            className={mode === "default" ? styles.currentMode : null}
            onClick={() => {
              handleLiveViewSelect("default");
            }}
          >
            Default
          </button>
          <button
            className={mode === "custom" ? styles.currentMode : null}
            onClick={() => {
              handleLiveViewSelect("custom");
            }}
          >
            Custom
          </button>
          <button
            className={mode === "phone" ? styles.currentMode : null}
            onClick={() => {
              handleLiveViewSelect("phone");
            }}
          >
            <i className="ion-iphone" />
          </button>
          <button
            className={mode === "pad" ? styles.currentMode : null}
            onClick={() => {
              handleLiveViewSelect("pad");
            }}
          >
            <i className="ion-ipad" />
          </button>
          <button
            className={mode === "desktop" ? styles.currentMode : null}
            onClick={() => {
              handleLiveViewSelect("desktop");
            }}
          >
            <i className="ion-android-desktop" />
          </button>
        </div>
        {this.renderInputs()}
      </div>
    );
  }
}

export default LiveViewInfo;
