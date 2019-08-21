import React, { Component } from "react";

import styles from "./FieldFormControlTextArea.css";

class FieldFormControlTextArea extends Component {
  render() {
    const {
      placeholder,
      type,
      description,
      handleConfigInputChange,
      title,
      rows,
      style_textArea
    } = this.props;
    return (
      <div className={styles.FieldFormControl}>
        {title ? (
          <div className={styles.textAreaTitle}>
            {" "}
            {`${title} *`}
            {" "}
          </div>
        ) : null}
        <textarea
          value={description}
          onChange={(event) => {
            handleConfigInputChange(event.target.value);
          }}
          type={type}
          placeholder={placeholder}
          rows={rows}
          style={style_textArea}
        />
      </div>
    );
  }
}

export default FieldFormControlTextArea;
