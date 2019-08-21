import React from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import styles from "./Image2.css";

export const Image2Info = {
  id: "image_2",
  description: "responsive image, width 100%, height changes according to width",
  image: "",
  props: {
    image_url: {
      xl:
        "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
      lg:
        "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
      md:
        "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
      sm:
        "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
      xs:
        "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
    },
    link: {
      path: "product/h123456",
      click: true,
      url: null
    },
    description: "Eve by Eve's Skincare",
    title: "Eve by Eve's Skincare"
  }
};

const Image2 = ({
  image_url,
  link,
  description,
  title,
  onLoad,
  onClick,
  fakeDeviceWidth,
  style,
  inline_styles
}) => {
  if (!image_url) {
    return null;
  }
  const commonProps = {
    style
  };
  return (
    <LinkWrapper {...link} style={inline_styles}>
      <MediaQuery minWidth={1440} values={{ width: fakeDeviceWidth }}>
        <img
          src={image_url.xl}
          alt={description}
          className={styles.image}
          title={title || description}
          onLoad={onLoad}
          onClick={onClick}
          {...commonProps}
        />
      </MediaQuery>
      <MediaQuery minWidth={1200} maxWidth={1439} values={{ width: fakeDeviceWidth }}>
        <img
          src={image_url.lg}
          alt={description}
          className={styles.image}
          title={title || description}
          onLoad={onLoad}
          onClick={onClick}
          {...commonProps}
        />
      </MediaQuery>
      <MediaQuery minWidth={992} maxWidth={1199} values={{ width: fakeDeviceWidth }}>
        <img
          src={image_url.md}
          alt={description}
          className={styles.image}
          title={title || description}
          onLoad={onLoad}
          onClick={onClick}
          {...commonProps}
        />
      </MediaQuery>
      <MediaQuery minWidth={768} maxWidth={991} values={{ width: fakeDeviceWidth }}>
        <img
          src={image_url.sm}
          alt={description}
          className={styles.image}
          title={title || description}
          onLoad={onLoad}
          onClick={onClick}
          {...commonProps}
        />
      </MediaQuery>
      <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }}>
        <img
          src={image_url.xs}
          alt={description}
          className={styles.image}
          title={title || description}
          onLoad={onLoad}
          onClick={onClick}
          {...commonProps}
        />
      </MediaQuery>
    </LinkWrapper>
  );
};

export default Image2;
