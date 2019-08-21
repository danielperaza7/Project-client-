// global import
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";

// local import
import Image2 from "../Image/Image2";

// CSS import
import styles from "./ImageSet.css";
import MobileImage from "../Image/MobileImage";

export const ImageSetInfo = {
  id: "ImageSet",
  description: "Image set in a row or a column",
  props: {
    images: [
      {
        image_url: {
          xl: "https://via.placeholder.com/300X300",
          lg: "https://via.placeholder.com/300X300",
          md: "https://via.placeholder.com/300X300",
          sm: "https://via.placeholder.com/300X300",
          xs: "https://via.placeholder.com/300X300"
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Some description",
        title: "Some title"
      }
    ]
  }
};

/**
 *
 * This component is used for showing images in CMS, which contains 5 images in a row in PC and 2 images in moblie
 * @class AdsGrid
 * @extends {Component}
 */
class ImageSet extends Component {
  render() {
    const { images } = this.props;
    const renderDeskTopImages = images.map((image, index) => {
      return (
        <div key={index} className={styles.DesktopImageWrapper}>
          <Image2 {...image} />
        </div>
      );
    });
    const renderMobileImages = images.map((image, index) => {
      return (
        <div key={index} className={styles.MobileImageWrapper}>
          <MobileImage {...image} />
        </div>
      );
    });
    return (
      <div>
        <MediaQuery minWidth={768}>
          <div className={styles.ImageSet}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12}>
                {renderDeskTopImages}
              </Col>
            </Row>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <div className={styles.ImageSetMobile}>
            <Row>{renderMobileImages}</Row>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default ImageSet;
