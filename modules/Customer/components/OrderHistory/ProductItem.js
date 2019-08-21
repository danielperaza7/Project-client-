import React, { Component } from "react";
import {
  Row, Col, Media, Popover, OverlayTrigger
} from "react-bootstrap";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import marked from "marked";
import { stringify } from "querystring";
import { getClientMD } from "../../../App/AppReducer";
import FinalSale from "../../../CheckoutV2/components/ItemDetail/FinalSale";
import styles from "./ProductItem.css";

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seeDetail: false
    };
  }

  renderAttr(attrs) {
    // const attrs = this.props.attr || kitItem.attr;
    if (!attrs) {
      return null;
    }
    const elements = [];
    for (const attr in attrs) {
      if (
        attr !== "color_code"
        && attr !== "color_family"
        && attr !== "band_size"
        && attr !== "cup_size"
        && attrs[attr][0] !== null
      ) {
        for (let i = 0; i < attrs[attr].length; i++) {
          const name = attr.toLowerCase();
          const id = attr + stringify(i);
          if (name === "style" || name === "sale" || name === "brand") continue;
          elements.push(
            <div className={styles["attr-list-item"]} key={id}>
              {attr.toUpperCase()}
:
              {attrs[attr][i].name}
            </div>
          );
        }
      }
    }
    return <div>{elements}</div>;
  }

  renderProduct() {
    const { clientMD, qty } = this.props;
    const getMarkeddownText = (src) => {
      const rawMarkup = marked(src);
      return { __html: rawMarkup };
    };
    const finalSaleBtn = (
      <Popover id="popover-positioned-bottom">
        <span
          dangerouslySetInnerHTML={getMarkeddownText(
            this.props.final_sale ? this.props.final_sale : ""
          )}
        />
      </Popover>
    );

    return (
      <div>
        {/* <Row className={styles['product-item-container']}> */}
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Col xs={9}>
            <Media>
              {/* display product image */}
              <Media.Left align="top">
                {this.props.images ? (
                  <img
                    width={100}
                    src={this.props.images.main.images.sm.url}
                    alt="Pic"
                  />
                ) : null}
              </Media.Left>
              {/* display product attributes */}
              <Media.Body className={styles["attr-list-container"]}>
                <div style={{ fontWeight: "bold" }} className={styles["attr-list-item"]}>
                  {this.props.name}
                </div>
                <div className={styles["attr-list-item"]}>
ITEM:
                  {this.props.sku}
                </div>
                {this.renderAttr(this.props.attr)}
                <div className={styles["attr-list-item"]}>
QTY:
                  {qty || 1}
                </div>
              </Media.Body>
            </Media>
          </Col>
          {/* display price */}
          <Col xs={3}>
            <div className={styles["price-tag"]}>
              {this.props.redeem_points > 0 ? (
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontFamily: "GothamMedium" }}>Redeemed</div>
                  <div style={{ fontFamily: "GothamBook" }}>
                    {this.props.redeem_points}
                    {" "}
points
                  </div>
                </div>
              ) : (
                <div>
                  $
                  {this.props.price.original}
                  {" "}
/ $
                  {this.props.price.refund_amount}
                </div>
              )}
              <div className={styles.finalSale}>
                {this.props.final_sale ? (
                  <FinalSale description={this.props.final_sale} />
                ) : null}
              </div>
            </div>
          </Col>
        </MediaQuery>

        {/* responsive design */}
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Media>
            <Media.Left align="top">
              {this.props.images ? (
                <img width={100} src={this.props.images.main.images.sm.url} alt="Image" />
              ) : null}
            </Media.Left>
            <Media.Body className={styles["attr-list-container"]}>
              <div
                style={{ fontWeight: "bold" }}
                className={styles["attr-list-item"]}
                style={{ fontFamily: "GothamMedium" }}
              >
                {this.props.name}
              </div>
              {this.props.redeem_points > 0 ? (
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontFamily: "GothamMedium" }}>Redeemed</div>
                  <div style={{ fontFamily: "GothamBook" }}>
                    {this.props.redeem_points}
                    {" "}
points
                  </div>
                </div>
              ) : (
                <div
                  className={styles["attr-list-item"]}
                  style={{ fontFamily: "GothamMedium" }}
                >
                  $
                  {this.props.price.original}
                  {" "}
/ $
                  {this.props.price.refund_amount}
                </div>
              )}
              {this.props.final_sale ? (
                <OverlayTrigger trigger="click" placement="bottom" overlay={finalSaleBtn}>
                  <div className={styles["attr-list-item"]}>
                    Final Sale
                    {" "}
                    <i style={{ color: "#C1B497" }} className="ion-help-circled" />
                  </div>
                </OverlayTrigger>
              ) : null}
              <div className={styles["attr-list-item"]}>
ITEM:
                {this.props.sku}
              </div>
              {this.renderAttr(this.props.attr)}
              <div className={styles["attr-list-item"]}>
QTY:
                {qty || 1}
              </div>
            </Media.Body>
          </Media>
        </MediaQuery>
        {/* </Row> */}
      </div>
    );
  }

  renderSubProducts(subProduct) {
    const { clientMD } = this.props;
    return (
      <div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Media>
            {/* display product image */}
            <Media.Left align="top" style={{ marginRight: "20px" }}>
              {subProduct.images ? (
                <img
                  width={100}
                  src={subProduct.images.main.images.sm.url}
                  alt={subProduct.images.main.title}
                />
              ) : null}
            </Media.Left>
            {/* display product attributes */}
            <Media.Body className={styles["attr-list-container"]}>
              <div style={{ fontWeight: "bold" }} className={styles["attr-list-item"]}>
                {subProduct.name}
              </div>
              <div className={styles["attr-list-item"]}>
ITEM:
                {subProduct.sku}
              </div>
              {this.renderAttr(subProduct.attr)}
              <div className={styles["attr-list-item"]}>
QTY:
                {qty || 1}
              </div>
            </Media.Body>
          </Media>
        </MediaQuery>
      </div>
    );
  }

  renderKitItem(kitItem) {
    const { clientMD, qty } = this.props;
    const getMarkeddownText = (src) => {
      const rawMarkup = marked(src);
      return { __html: rawMarkup };
    };
    const finalSaleBtn = (
      <Popover id="popover-positioned-bottom">
        <span
          dangerouslySetInnerHTML={getMarkeddownText(
            kitItem.final_sale ? kitItem.final_sale : ""
          )}
        />
      </Popover>
    );

    return (
      <div>
        <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Row>
            <Col xs={9}>
              <Media>
                {/* display product image */}
                <Media.Left align="top">
                  {kitItem.images ? (
                    <img
                      width={100}
                      src={kitItem.images.main.images.sm.url}
                      alt="Image"
                    />
                  ) : null}
                </Media.Left>
                {/* display product attributes */}
                <Media.Body className={styles["attr-list-container"]}>
                  <div
                    style={{ fontWeight: "bold" }}
                    className={styles["attr-list-item"]}
                  >
                    {kitItem.name}
                  </div>
                  <div className={styles["attr-list-item"]}>
ITEM:
                    {kitItem.sku}
                  </div>
                  {this.renderAttr(kitItem.attr)}
                  <div className={styles["attr-list-item"]}>
QTY:
                    {qty || 1}
                  </div>
                  <div
                    className={styles.seeKitDetail}
                    onClick={() => {
                      const preState = this.state.seeDetail;
                      this.setState({
                        seeDetail: !preState
                      });
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>See Set Detail</span>
                    <i
                      className={
                        this.state.seeDetail ? "ion-chevron-up" : "ion-chevron-down"
                      }
                    />
                  </div>
                </Media.Body>
              </Media>
            </Col>
            {/* display price */}
            <Col xs={3}>
              <div className={styles["price-tag"]}>
                {this.props.redeem_points > 0 ? (
                  <div style={{ fontSize: "12px" }}>
                    <div style={{ fontFamily: "GothamMedium" }}>Redeemed</div>
                    <div style={{ fontFamily: "GothamBook" }}>
                      {this.props.redeem_points}
                      {" "}
points
                    </div>
                  </div>
                ) : (
                  <div>
                    $
                    {kitItem.price.original}
                    {" "}
/ $
                    {kitItem.price.refund_amount}
                  </div>
                )}
                <div className={styles.finalSale}>
                  {kitItem.final_sale ? (
                    <FinalSale description={kitItem.final_sale} />
                  ) : null}
                </div>
              </div>
            </Col>
          </Row>
          {/* render sub products of kit item */}
          <div style={this.state.seeDetail ? { display: "block" } : { display: "none" }}>
            {kitItem.subProducts.map((subProduct, idx) => {
              return (
                <Media key={idx}>
                  <Media.Left
                    align="top"
                    style={{ paddingLeft: "180px", paddingRight: "40px" }}
                  >
                    {subProduct.images ? (
                      <img
                        width={100}
                        src={subProduct.images.main.images.sm.url}
                        alt="Pic"
                      />
                    ) : null}
                  </Media.Left>
                  {/* display product attributes */}
                  <Media.Body className={styles["attr-list-container"]}>
                    <div
                      style={{ fontWeight: "bold" }}
                      className={styles["attr-list-item"]}
                    >
                      {subProduct.name}
                    </div>
                    <div className={styles["attr-list-item"]}>
ITEM:
                      {subProduct.sku}
                    </div>
                    {this.renderAttr(subProduct.attr)}
                    <div className={styles["attr-list-item"]}>
QTY:
                      {qty || 1}
                    </div>
                  </Media.Body>
                </Media>
              );
            })}
          </div>
        </MediaQuery>

        {/* responsive design */}
        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <Media>
            <Media.Left align="top">
              {kitItem.images ? (
                <img
                  width={100}
                  src={kitItem.images.main.images.sm.url}
                  alt={kitItem.images.main.title}
                />
              ) : null}
            </Media.Left>
            <Media.Body className={styles["attr-list-container"]}>
              <div
                style={{ fontWeight: "bold" }}
                className={styles["attr-list-item"]}
                style={{ fontFamily: "GothamMedium" }}
              >
                {kitItem.name}
              </div>
              {this.props.redeem_points > 0 ? (
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontFamily: "GothamMedium" }}>Redeemed</div>
                  <div style={{ fontFamily: "GothamBook" }}>
                    {this.props.redeem_points}
                    {" "}
points
                  </div>
                </div>
              ) : (
                <div
                  className={styles["attr-list-item"]}
                  style={{ fontFamily: "GothamMedium" }}
                >
                  $
                  {kitItem.price.original}
                  {" "}
/ $
                  {kitItem.price.refund_amount}
                </div>
              )}
              {kitItem.final_sale ? (
                <OverlayTrigger trigger="click" placement="bottom" overlay={finalSaleBtn}>
                  <div className={styles["attr-list-item"]}>
                    Final Sale
                    {" "}
                    <i style={{ color: "#C1B497" }} className="ion-help-circled" />
                  </div>
                </OverlayTrigger>
              ) : null}
              <div className={styles["attr-list-item"]}>
ITEM:
                {kitItem.sku}
              </div>
              {this.renderAttr(kitItem.attr)}
              <div className={styles["attr-list-item"]}>
QTY:
                {qty || 1}
              </div>
              <div
                className={styles.seeKitDetail}
                onClick={() => {
                  const preState = this.state.seeDetail;
                  this.setState({
                    seeDetail: !preState
                  });
                }}
              >
                <span style={{ marginRight: "5px" }}>See Set Detail</span>
                <i
                  className={this.state.seeDetail ? "ion-chevron-up" : "ion-chevron-down"}
                />
              </div>
            </Media.Body>
          </Media>
          <Row style={this.state.seeDetail ? { display: "block" } : { display: "none" }}>
            {kitItem.subProducts.map((subProduct, idx) => {
              return (
                <Col xs={4} key={idx} style={{ padding: "10px" }}>
                  <div>
                    {subProduct.images ? (
                      <img
                        width={72}
                        src={subProduct.images.main.images.sm.url}
                        alt="Pic"
                      />
                    ) : null}
                  </div>
                  {/* display product attributes */}
                  <div className={styles["attr-list-container"]}>
                    <div
                      style={{ fontWeight: "bold" }}
                      className={styles["attr-list-item"]}
                    >
                      {subProduct.name}
                    </div>
                    <div className={styles["attr-list-item"]}>
ITEM:
                      {subProduct.sku}
                    </div>
                    {this.renderAttr(subProduct.attr)}
                    <div className={styles["attr-list-item"]}>
QTY:
                      {qty || 1}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </MediaQuery>
      </div>
    );
  }

  render() {
    const { kitItem } = this.props;
    return (
      <Row className={styles["product-item-container"]}>
        {kitItem ? this.renderKitItem(kitItem) : this.renderProduct()}
      </Row>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(ProductItem);
