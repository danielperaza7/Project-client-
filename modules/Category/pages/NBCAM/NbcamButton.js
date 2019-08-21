import React from "react";
import styles from "./NBCAM.css";

const NbButton = (props) => {
  const {
    onClick,
    iconName,
    text,
    iconImage,
    isIcon,
    buttonStyle,
    textStyle,
    iconStyle
  } = props;

  const renderIcon = (_iconName, _iconImage, _isIcon) => {
    if (_isIcon === true) {
      return (
        <i
          className={`${_iconName}`}
          style={{
            fontSize: "36px", position: "absolute", top: "-1px", left: "12px"
          }}
        />
      );
    }
    return <img src={_iconImage} className={iconStyle} alt="youtube" />;
  };

  return (
    <div
      className={buttonStyle}
      onClick={() => {
        onClick();
      }}
    >
      <span style={{ position: "absolute", top: "0", left: "0" }}>
        {renderIcon(iconName, iconImage, isIcon)}
      </span>
      <span className={textStyle}>{`${text}`}</span>
    </div>
  );
};

export default NbButton;
