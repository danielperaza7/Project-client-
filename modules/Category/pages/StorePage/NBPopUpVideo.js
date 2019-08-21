import React from "react";
import { Modal } from "react-bootstrap";

import styles from "./StorePage.css";

const PopUpVideo = (props) => {
  const { showModal, children, onHide } = props;
  const dialogClass = styles.popUpVideoContainer;

  return (
    <div>
      <Modal show={showModal} onHide={() => {}} dialogClassName={`${dialogClass}`}>
        <span className={styles.popUpVideoCloseBtn} onClick={() => onHide()}>
          <i className="ion-android-close" />
        </span>
        {children ? <div className={styles.popUpVideo}>{children}</div> : null}
      </Modal>
    </div>
  );
};

export default PopUpVideo;
