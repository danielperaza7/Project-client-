// global import
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import styles from "./TextTitle.css";

export const TextTitleInfo = {
  id: "text-title",
  description: "title: bigger font size, centered, bold",
  image: "",
  props: {
    text: {
      xl: "Some Text xl",
      lg: "Some Text lg",
      md: "Some Text md",
      sm: "Some Text sm",
      xs: "Some Text xs"
    },
    link: {
      path: "product/h123456",
      click: true,
      url: null
    },
    level: 3 // like h1 to h6, not yet considered when render
  }
};

class TextTitle extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const {
      text, link, onClick, fakeDeviceWidth
    } = this.props;

    if (!text) {
      return null;
    }

    return (
      <LinkWrapper {...link}>
        <MediaQuery minWidth={1440} values={{ width: fakeDeviceWidth }}>
          <div className={styles["title-xl"]} onClick={onClick}>
            {text.xl}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={1200} maxWidth={1439} values={{ width: fakeDeviceWidth }}>
          <div className={styles["title-lg"]} onClick={onClick}>
            {text.lg}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={992} maxWidth={1199} values={{ width: fakeDeviceWidth }}>
          <div className={styles["title-md"]} onClick={onClick}>
            {text.md}
          </div>
        </MediaQuery>
        <MediaQuery minWidth={768} maxWidth={991} values={{ width: fakeDeviceWidth }}>
          <div className={styles["title-sm"]} onClick={onClick}>
            {text.sm}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }}>
          <div className={styles["title-xs"]} onClick={onClick}>
            {text.xs}
          </div>
        </MediaQuery>
      </LinkWrapper>
    );
  }
}

export default TextTitle;
