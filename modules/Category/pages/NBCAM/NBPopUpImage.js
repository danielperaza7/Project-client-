import React from "react";
import { Modal } from "react-bootstrap";

import styles from "./NBCAM.css";

const PopUpImage = (props) => {
  const { showModal, onHide, src } = props;
  const dialogClass = styles.popUpImageContainer;
  const backdropClass = styles.popUpImageBackdrop;
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => onHide()}
        dialogClassName={`${dialogClass}`}
        backdropClassName={`${backdropClass}`}
      >
        <span className={styles.popUpVideoCloseBtn} onClick={() => onHide()}>
          <i className="ion-android-close" />
        </span>
        <div>
          <img className={styles.popUpImage} src={src} alt="original size" />
        </div>
      </Modal>
    </div>
  );
};

export default PopUpImage;
