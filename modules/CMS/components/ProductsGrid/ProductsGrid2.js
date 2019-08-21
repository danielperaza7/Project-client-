// global import
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Col, Grid } from "react-bootstrap";

// local import
import Image from "../Image/Image2";
import ProductGrid from "./ProductsGrid1";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import BlankRow from "../Divider/BlankRow";

export const ProductsGrid2Info = {
  id: "products_grid_2",
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
      "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate.",
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

/**
 *
 *
 * This is Eva CMS Page checkout V2, render products without carousel.
 * @class ProductsGrid2
 * @extends {Component}
 */
class ProductsGrid2 extends Component {
  renderProductGrid(products) {
    if (!products) {
      return null;
    }
    return (
      <div>
        <ProductGrid
          products={products}
          membershipPriceDisabled
          tags={this.props.tag_list}
        />
      </div>
    );
  }

  render() {
    const {
      bannerImage, title, subTitle, btn, products
    } = this.props;
    console.log("ProductGrid2", this.props);
    const height = {
      xl: "50px",
      lg: "50px",
      md: "30px",
      sm: "30px",
      xs: "10px"
    };
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
        <BlankRow height={height} />
        <MediaQuery minWidth={1024}>
          <Row>
            <Col xl={2} lg={2} md={1} />
            <Col xl={8} lg={8} md={10}>
              <img
                style={{ width: "100%", marginBottom: "50px" }}
                src="https://storage.googleapis.com/evesetus/email/CMS-CHANNEL/EvaCMSDivider.svg"
                alt="Divider"
              />
            </Col>
            <Col xl={2} lg={2} md={1} />
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <Row>
            <Col xs={12} md={8}>
              <h2 style={{ marginTop: "48px", marginBottom: "16px" }}>{title}</h2>
            </Col>
          </Row>
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
        </MediaQuery>
        <Row>
          <Col xs={3} sm={3} md={2}>
            <MediaQuery minWidth={768}>
              <div style={{ textAlign: "center" }}>
                <Image {...bannerImage} style={{ width: "100%" }} />
                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <LinkWrapper {...bannerImage.link}>
                    <div style={styles.button}>{bannerImage.btnText || "SEE ALL"}</div>
                  </LinkWrapper>
                </div>
              </div>
            </MediaQuery>
          </Col>
          <Col xs={12} sm={9} md={10}>
            <Row>
              <Col xs={12}>{this.renderProductGrid(products)}</Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProductsGrid2;
