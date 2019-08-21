import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Col, Grid } from "react-bootstrap";

import Image from "../Image/Image2";
// import ProductGallery from "../ProductsGallery/ProductsGallery1";
import ProductGrid from "../ProductsGrid/ProductGrid0";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

export const CarouselComplex1Info = {
  id: "carousel_complex_1",
  description: "show original size of image, no garantee of showing all content",
  image: "",
  props: {
    bannerImage: {
      image_url: {
        xl: "https://placeimg.com/220/338/any", // w 2560px , for 1440+ screen width
        lg: "https://placeimg.com/220/338/any", // w 1440px , for 768+ screen width
        md: "https://placeimg.com/768/300/any", // w 750px  , for 0~767 screen width
        sm: "https://placeimg.com/768/300/any", // w 750px  , for 0~767 screen width
        xs: "https://placeimg.com/768/300/any" // w 750px  , for 0~767 screen width
      },
      link: {
        path: "product/h123456",
        click: true,
        url: null
      },
      description: "Eve by Eve's Skincare",
      title: "Eve by Eve's Skincare",
      btnText: "SEE ALL"
    },
    title: "Promotional Activity 1",
    subTitle:
      "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis pellentesque",
    btn: {
      title: "SEE ALL",
      link: {
        path: "product/h123456",
        click: true,
        url: null
      }
    },
    carousel: {
      type: "PRODUCT", // IMAGE
      data: ["H21313", "H423213"]
    },
    tagList: {
      1001406: "newhot"
    }
  },
  PRODUCT_DATA: {
    list_ids: [
      "1001406",
      "1001407",
      "1001408",
      "Y1437683",
      "1001001",
      "1001405",
      "1001404",
      "1398113",
      "1398114",
      "1001403",
      "1001402",
      "1001401"
    ],
    data_fetch_mode: "clientOnLoad",
    product_id_type: "list_ids"
  },
  responsive: {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  }
};

const styles = {
  linkText2: {
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "1.5em",
    textTransform: "capitalize",
    fontFamily: "GothamMedium",
    textDecoration: "underline",
    color: "#A38547",
    marginBottom: "10px"
  },
  subTitle: {
    fontSize: "16px",
    lineHeight: "1.5em",
    color: "#A38547"
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: "156px",
    height: "32px",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "24px",
    cursor: "pointer",
    fontSize: "16px",
    textTransform: "capitalize",
    fontFamily: "GothamMedium",
    verticalAlign: "center",
    lineHeight: "32px"
  }
};

class CarouselComplex1 extends Component {
  renderCarousel({ type, settings }, products) {
    if (type === "IMAGE") {
      return null;
    }
    return (
      <div>
        {/* Comment out the following few lines for ticket OF-758,
        so that it never renders a carousel in scenario shopping,
        the products are showed in a grid list */}
        {/* <MediaQuery maxWidth={991}> */}
        <ProductGrid
          products={products}
          membershipPriceDisabled
          tags={this.props.tag_list}
        />
        {/* </MediaQuery>
        <MediaQuery minWidth={992}> */}
        {/* <ProductGallery settings={settings} products={products} membershipPriceDisabled tags={this.props.tag_list} /> */}
        {/* </MediaQuery> */}
      </div>
    );
    // return 'product gallery';
  }

  render() {
    const {
      bannerImage, title, subTitle, btn, carousel, products
    } = this.props;
    return (
      <Grid>
        <a
          id={this.props.title}
          style={{
            display: "block",
            position: "relative",
            top: "-105px",
            visibility: "hidden"
          }}
        />
        <Row>
          <Col xs={12} md={4} />
          <Col xs={12} md={8}>
            <h2 style={{ marginTop: "48px", marginBottom: "16px" }}>{title}</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <MediaQuery minWidth={991}>
              <div style={{ maxHeight: "338px", textAlign: "center" }}>
                <Image
                  {...bannerImage}
                  style={{ maxHeight: "282px", maxWidth: "282px" }}
                />
                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <LinkWrapper {...bannerImage.link}>
                    <div style={styles.button}>{bannerImage.btnText || "SEE ALL"}</div>
                  </LinkWrapper>
                </div>
              </div>
            </MediaQuery>
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col xs={12}>
                <p style={styles.subTitle}>{subTitle}</p>
                <div style={{ textAlign: "right" }}>
                  <LinkWrapper {...bannerImage.link}>
                    <div style={styles.linkText2}>
                      {btn.title}
                      <i className="ion-chevron-right" style={{ marginLeft: "5px" }} />
                    </div>
                  </LinkWrapper>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>{this.renderCarousel(carousel, products)}</Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CarouselComplex1;
