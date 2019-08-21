import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import styles from "./CustomModal.css";

class CustomModal extends Component {
  render() {
    const {
      showModal,
      onHide,
      children,
      size,
      width,
      height,
      close_behavior,
      no_blank_close,
      close_button_style,
      padding,
      wechat
    } = this.props;
    let dialogClass;
    const style = {
      width,
      height,
      display: "inline-table"
    };

    const no_box = {
      display: "none"
    };

    if (size) {
      switch (size) {
        case "small":
          dialogClass = styles.smallModal;
          break;
        case "medium":
          dialogClass = styles.mediumModal;
          break;
        case "large":
          dialogClass = styles.largeModal;
          break;
        case "full":
          dialogClass = styles.fullModal;
          break;
        case "none":
          dialogClass = no_box;
          break;
        default:
          dialogClass = style;
          break;
      }
    }
    return (
      <Modal
        show={!!showModal}
        onHide={no_blank_close ? () => {} : onHide}
        dialogClassName={`${
          wechat ? styles.wechatModal : styles.customModal
        } ${dialogClass}`}
      >
        {children ? (
          <Modal.Body bsClass={styles.body} style={{ padding }}>
            <span
              className={styles.closeBtn}
              style={close_button_style}
              onClick={() => (close_behavior ? onHide(close_behavior) : onHide())}
            >
              <i className="ion-android-close" />
            </span>
            {children}
          </Modal.Body>
        ) : null}
      </Modal>
    );
  }
}

export default CustomModal;

/*
  props:{
    size: 'full','small','medium','large'
    showModal:  // true of false
    onHide  // function to close Modal
  }
*/
