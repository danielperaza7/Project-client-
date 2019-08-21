// global import
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";

// local import
import Image2 from "../Image/Image2";

// CSS import
import styles from "./AdsGrid.css";

export const AdsGridInfo = {
  id: "Ads_Grid",
  description: "Ads grid with background to show ads, support clicking",
  props: {
    background: {
      url: {
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
      description: "Some Description",
      title: "Some Title"
    },
    ads: [
      {
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
        description: "Some description",
        title: "Some title"
      }
    ]
  }
};

/**
 *
 * This component is used for showing Ads Grid in CMS, which contains 4 image and background
 * @class AdsGrid
 * @extends {Component}
 */
class AdsGrid extends Component {
  render() {
    console.log("AdsGrid", this.props);
    const { background, ads } = this.props;
    const renderAds = ads.map((ad) => {
      return (
        <Col sm={3}>
          <Image2 {...ad} />
        </Col>
      );
    });

    return (
      <MediaQuery minWidth={768}>
        <div
          className={styles.imageWrapper}
          style={{ backgroundImage: `url(${background.image_url})` }}
        >
          <Row>
            <Col lg={2} md={0} />
            <Col lg={8} sm={12}>
              {renderAds}
            </Col>
            <Col lg={2} md={0} />
          </Row>
        </div>
      </MediaQuery>
    );
  }
}

export default AdsGrid;
