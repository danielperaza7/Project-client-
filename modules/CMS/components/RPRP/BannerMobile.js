// global import
import React from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

// local import
import styles from "./BannerMobile.css";

export const BannerMobileInfo = {
  id: "bannerMobile_RPRP",
  description: "responsive image, width 100%, height changes according to width",
  image: "",
  props: {
    // props are for examples only
    // modify the actual image links in CMS page
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

const BannerMobile = ({
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
      <div className={styles["image-wrapper"]}>
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
        <MediaQuery minWidth={1023} maxWidth={1439} values={{ width: fakeDeviceWidth }}>
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
        <MediaQuery minWidth={768} maxWidth={1023} values={{ width: fakeDeviceWidth }}>
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
        <MediaQuery minWidth={375} maxWidth={768} values={{ width: fakeDeviceWidth }}>
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
        <MediaQuery maxWidth={375} values={{ width: fakeDeviceWidth }}>
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
      </div>
    </LinkWrapper>
  );
};

export default BannerMobile;
