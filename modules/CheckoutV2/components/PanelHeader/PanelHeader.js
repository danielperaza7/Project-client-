import React from "react";
import styles from "./PanelHeader.css";

export default ({
  thisStep, currentStep, editAction, hasEmail
}) => {
  if (thisStep > 3 || thisStep < 0) return null;
  const names = [
    "YOUR INFORMATION",
    "SHIPPING ADDRESS",
    "PAYMENT INFORMATION",
    "SHIPPING AND REVIEW"
  ];
  const requiredNode = (
    <span className="pull-right" className={styles.requiredSign}>
      Required(*)
    </span>
  );
  const editBtn = (
    <span
      className="pull-right"
      onClick={() => editAction(thisStep)}
      className={styles.editBtn}
    >
      Edit
    </span>
  );
  // const checkNode = <span className="ion-checkmark"></span>;
  return (
    <div
      className={`${styles.panelHeader} ${
        thisStep === currentStep ? styles.currentHeader : ""
      }`}
    >
      <span>{`${thisStep + 1} ${names[thisStep]}`}</span>
      {!(thisStep === 0 && hasEmail) && thisStep < currentStep ? editBtn : null}
      {thisStep === currentStep ? requiredNode : null}
    </div>
  );
};
