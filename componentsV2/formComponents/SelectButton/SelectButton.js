import React, { Component } from "react";

import styles from "./SelectButton.css";

class SelectButton extends Component {
  render() {
    const {
      handleClickSelect, selections, inline, selected, width = ""
    } = this.props;

    const selection_list = selections.map((item) => {
      let sel = false;
      if (selected && selected.length) {
        sel = selected.includes(item);
      } else sel = item === selected;
      const button_custom_style = {
        color: sel ? "black" : "",
        border: sel ? "2px solid black" : "",
        width
      };

      return (
        <button
          onClick={() => handleClickSelect(item)}
          className={styles.selectButton}
          style={button_custom_style}
        >
          {item}
        </button>
      );
    });
    return <div style={{ display: inline ? "inline-flex" : "" }}>{selection_list}</div>;
  }
}

export default SelectButton;
