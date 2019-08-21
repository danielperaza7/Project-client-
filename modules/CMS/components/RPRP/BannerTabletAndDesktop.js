import React from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import styles from "./BannerTabletAndDesktop.css";

export const BannerTabletAndDesktopInfo = {
  id: "bannerTabletAndDesktop_RPRP",
  // urls for category banner, can be a key of any component
  urls: [
    "/et/category/sleepandlounge",
    "/et/category/sleepandlounge/lounge",
    "/et/category/sleepandlounge/lounge/camis-tanks"
  ],
  description: "show original size of image, no garantee of showing all content",
  image: "",
  props: {
    // links are for examples only
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

const BannerTabletAndDesktop = ({
  image_url,
  link,
  description,
  title,
  onLoad,
  onClick,
  fakeDeviceWidth,
  inline_styles
}) => {
  if (!image_url) {
    return null;
  }
  return (
    <LinkWrapper {...link} style={inline_styles}>
      <div className={styles["image-wrapper"]}>
        <MediaQuery minWidth={1440} values={{ width: fakeDeviceWidth }}>
          <img
            src={image_url.xl}
            alt={description}
            title={title || description}
            onLoad={onLoad}
            onClick={onClick}
            className={styles.image}
          />
        </MediaQuery>
        <MediaQuery minWidth={1200} maxWidth={1439} values={{ width: fakeDeviceWidth }}>
          <img
            src={image_url.lg}
            alt={description}
            title={title || description}
            onLoad={onLoad}
            onClick={onClick}
            className={styles.image}
          />
        </MediaQuery>
        <MediaQuery minWidth={992} maxWidth={1199} values={{ width: fakeDeviceWidth }}>
          <img
            src={image_url.md}
            alt={description}
            title={title || description}
            onLoad={onLoad}
            onClick={onClick}
            className={styles.image}
          />
        </MediaQuery>
        <MediaQuery minWidth={768} maxWidth={991} values={{ width: fakeDeviceWidth }}>
          <img
            src={image_url.sm}
            alt={description}
            title={title || description}
            onLoad={onLoad}
            onClick={onClick}
            className={styles.image}
          />
        </MediaQuery>
        <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }}>
          <img
            src={image_url.xs}
            alt={description}
            title={title || description}
            onLoad={onLoad}
            onClick={onClick}
            className={styles.image}
          />
        </MediaQuery>
      </div>
    </LinkWrapper>
  );
};

export default BannerTabletAndDesktop;
