import React from "react";
import MediaQuery from "react-responsive";

export const BlankRowInfo = {
  id: "blank_row",
  description: "show original size of image, no garantee of showing all content",
  image: "",
  props: {
    height: {
      xl: "30px",
      lg: "30px",
      md: "30px",
      sm: "20px",
      xs: "10px"
    }
  }
};

const BlankRow = ({ height, fakeDeviceWidth }) => {
  if (!height) {
    return null;
  }
  return (
    <div>
      <MediaQuery minWidth={1440} values={{ width: fakeDeviceWidth }}>
        <div style={{ height: height.xl }} />
      </MediaQuery>
      <MediaQuery minWidth={1200} maxWidth={1439} values={{ width: fakeDeviceWidth }}>
        <div style={{ height: height.lg }} />
      </MediaQuery>
      <MediaQuery minWidth={992} maxWidth={1199} values={{ width: fakeDeviceWidth }}>
        <div style={{ height: height.md }} />
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={991} values={{ width: fakeDeviceWidth }}>
        <div style={{ height: height.sm }} />
      </MediaQuery>
      <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }}>
        <div style={{ height: height.xs }} />
      </MediaQuery>
    </div>
  );
};

export default BlankRow;
