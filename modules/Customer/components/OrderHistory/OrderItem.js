import React, { Component } from "react";
import {
  Col, Panel, Row, Table, Modal
} from "react-bootstrap";
import { connect, batch } from "react-redux";
import _ from "lodash";
import ProductItem from "./ProductItem";
import history from "../../../../history";
import { addError } from "../../../App/AppActions";
import { setReturnOrderID, setReturnFromAddress } from "../../CustomerActions";
import { ORDER_STATUS_RULE_MAPPING } from "../../../../config/Order/orderConfig";
import { getClientMD } from "../../../App/AppReducer";
import styles from "./OrderHistory.css";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      popup: false,
      popup_value: "",
      redeemed_points: 0,
      total_reward_points_used: 0,
      returnPopup: false
    };
    this.handleReturnClick = this.handleReturnClick.bind(this);
    this.handleViewReturnClick = this.handleViewReturnClick.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

  getDaysDifference(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  jumpToTrack(track) {
    if (track) {
      window.location.href = this.props.deliver_info.tracking_url;
    } else {
      window.location.href = this.props.deliver_info.arrival_time;
    }
  }

  handleViewReturnClick(orderNumber) {
    if (orderNumber) {
      history.push(`/return_history/${orderNumber}`);
    } else {
      this.props.dispatch(
        addError({
          code: "NON", // No order number
          msg: "No order number found"
        })
      );
    }
  }

  handleReviewClick(orderNumber) {
    if (orderNumber) {
      history.push(`/review/order_id=${orderNumber}`);
    } else {
      this.props.dispatch(
        addError({
          code: "NON", // No order number
          msg: "No order number found"
        })
      );
    }
  }

  handleReturnClick = (orderNumber) => batch(() => {
    if (orderNumber) {
      this.props.dispatch(setReturnOrderID(orderNumber));
      this.props.dispatch(setReturnFromAddress(this.props.shipping_address));
      history.push(`/return/${orderNumber}`);
    } else {
      this.props.dispatch(
        addError({
          code: "NON", // No order number
          msg: "No order number found"
        })
      );
    }
  });

  renderShippingMethod() {
    const shipping_method = this.props.shipping_method;
    return (
      <div className={styles["order-item-shipping-container"]}>
        <div className={styles["order-item-shipping-title"]}>SHIPPING METHOD</div>
        <div className={styles["order-item-shipping-body"]}>{shipping_method}</div>
      </div>
    );
  }

  renderShippingAddress() {
    const shipping_address = this.props.shipping_address;
    return (
      <div className={styles["order-item-shipping-container"]}>
        <div className={styles["order-item-shipping-title"]}>SHIPPING ADDRESS</div>
        <div className={styles["order-item-shipping-body"]}>
          {`${shipping_address.firstname} ${shipping_address.lastname}`}
        </div>
        {shipping_address.street.map(st => (
          <div className={styles["order-item-shipping-body"]} key={st}>
            {st}
          </div>
        ))}
        {/* <div className={styles['order-item-shipping-body']}>{billing_address ? billing_address.street[0]:null}</div> */}
        {/* <div className={styles['order-item-shipping-body']}>{billing_address ? billing_address.street[1]:null}</div> */}
        <div className={styles["order-item-shipping-body"]}>
          {`${shipping_address.city}, ${shipping_address.region}, ${shipping_address.postcode}`}
        </div>
        <div className={styles["order-item-shipping-body"]}>
          {shipping_address.country_id}
        </div>
        <div className={styles["order-item-shipping-body"]}>
          {shipping_address.telephone}
        </div>
      </div>
    );
  }

  renderPaymentMethod(redeem_points) {
    const payment_methods = this.props.payment_method;
    const payment_detail = this.props.payment_detail
      ? this.props.payment_detail[payment_methods]
      : null;
    let payment_info = "";
    switch (payment_methods) {
      case "braintree_credit_card" || "braintree_paypal_account":
        payment_info = payment_detail ? payment_detail.card_type : "";
        payment_info = payment_info + payment_detail && payment_detail.cc_last4
          ? ` xxxx${payment_detail.cc_last4}`
          : "";
        break;
      case "square":
        payment_info = "Square";
        break;
      default:
        payment_info = "";
    }
    return (
      <div className={styles["order-item-shipping-container"]}>
        <div className={styles["order-item-shipping-title"]}>PAYMENT METHOD</div>
        <div className={styles["order-item-shipping-body"]}>
          {payment_info && payment_info !== undefined ? payment_info : "unknown"}
        </div>
        {redeem_points > 0 ? (
          <div className={styles["order-item-shipping-body"]}>Reward Points</div>
        ) : null}
      </div>
    );
  }

  renderBillingAddress() {
    const billing_address = this.props.billing_address;
    return (
      <div className={styles["order-item-shipping-container"]}>
        <div className={styles["order-item-shipping-title"]}>BILLING ADDRESS</div>
        <div className={styles["order-item-shipping-body"]}>
          {`${billing_address.firstname} ${billing_address.lastname}`}
        </div>
        {billing_address.street
          ? billing_address.street.map(st => <div key={st}>{st}</div>)
          : null}
        <div className={styles["order-item-shipping-body"]}>
          {`${billing_address.city}, ${billing_address.region_code}, ${billing_address.postcode}`}
        </div>
        <div className={styles["order-item-shipping-body"]}>
          {billing_address.country_id}
        </div>
        <div className={styles["order-item-shipping-body"]}>
          {billing_address.telephone}
        </div>
        <div className={styles["order-item-shipping-body"]}>{billing_address.email}</div>
      </div>
    );
  }

  renderPopupWindow(value) {
    const object = ORDER_STATUS_RULE_MAPPING.find(status => status.id === value);
    return (
      <Modal
        show={this.state.popup}
        onHide={() => {
          this.setState({ popup: false });
        }}
        dialogClassName={styles.orderStatusInfoDialog}
      >
        <div style={{ width: "98%" }}>
          <div
            style={{
              fontSize: "18px",
              marginBottom: "10px",
              fontFamily: "GothamMedium"
            }}
          >
            {object.dialog_name}
          </div>
          <div
            style={{ fontSize: "13px" }}
            dangerouslySetInnerHTML={{ __html: object.description }}
          />
        </div>
        <div
          className={styles.dialogCross}
          onClick={() => {
            this.setState({ popup: false });
          }}
        >
          <i className="ion-android-close" />
        </div>
      </Modal>
    );
  }

  renderReturnPopupWindow(orderNumber) {
    return (
      <Modal
        show={this.state.returnPopup}
        onHide={() => {
          this.setState({ returnPopup: false });
        }}
        dialogClassName={styles.orderStatusInfoDialog}
      >
        <div style={{ width: "98%" }}>
          <div
            style={{ fontSize: "18px", marginBottom: "10px", fontFamily: "GothamMedium" }}
          >
            Please Note
          </div>
          <div style={{ fontSize: "13px" }}>
            Membership stars, Reward points, and Gift Cards earned from purchase that you
            return will subsequently be deducted from your account. Gift card delivery
            date may be delayed if return process is started, even if the return does not
            affect the promotional gift card earned.
          </div>
          <footer className={styles["popup-return-footer"]}>
            <button
              onClick={() => {
                this.setState({ returnPopup: false });
                this.handleReturnClick(orderNumber);
              }}
              className={styles["popup-return-confirm-button"]}
            >
              Keep Return
            </button>
            <button
              onClick={() => {
                this.setState({ returnPopup: false });
              }}
              className={styles["popup-return-cancel-button"]}
            >
              Cancel
            </button>
          </footer>
        </div>
        <div
          className={styles.dialogCross}
          onClick={() => {
            this.setState({ returnPopup: false });
          }}
        >
          <i className="ion-android-close" />
        </div>
      </Modal>
    );
  }

  renderItemHeader() {
    const {
      order_number,
      shipping,
      refunded,
      deliver_info,
      on_hold,
      canceled,
      store_type
    } = this.props;
    let place_time = this.props.place_time.match("....-..-..");
    place_time = place_time[0].replace(/-/g, "/");
    // Online order can be refunded within 30 days, add more days for shipping
    const expire = this.getDaysDifference(place_time) > 45;
    const tracking_number = _.get(
      deliver_info,
      "[0].tracking_number",
      "Tracking Number not available"
    );// TODO: modify here for multi shipments support
    const tracking_url = _.get(
      deliver_info,
      "[0].tracking_url",
      ""
    );
    // deliver_info is array
    const carrier_status = _.get(deliver_info, "[0].carrier_status", false);
    //  if(this.props.state === 'processing') {
    //   return (
    //     <Row className={styles["order-history-item-header"]}>
    //       <Col className={this.state.expanded?`${styles["order-history-item-order-number"]} ${styles["expanded"]}`:styles["order-history-item-order-number"]} xs={12} sm={4} onClick={() => this.setState({expanded: !this.state.expanded})}>{!this.state.expanded?<i className={`ion-android-add`} style={{fontSize:"14px", marginRight:"10px", verticalAlign:"middle"}}/>:<i className={`ion-android-remove`} style={{fontSize:"14px", marginRight:"30px", verticalAlign:"middle"}}/>}<span>ORDER # {this.props.order_number}</span></Col>
    //       <Col xs={12} sm={6}>
    //         <div className={styles["order-history-item-header-place-time"]}>Placed on <span style={{fontWeight: 'bold'}}>{place_time}</span></div>
    //         <div className={styles["order-history-item-header-tracking-number"]}>Tracking number:
    //           <span className={styles["order-history-item-header-tracking-number-content"]}> {tracking_url?<span onClick={()=>window.open(tracking_url)}>{tracking_number}</span>:tracking_number}</span></div>
    //         <div className={styles["order-history-item-header-tracking-number"]}><span>Order status: <span style={{fontWeight: 'bold'}}>{shipping ? 'Shipped' : on_hold ? 'On Hold' : 'Processed'}</span></span></div>
    //       </Col>
    //       <Col xs={12} sm={2}>
    //         <div className={styles["order-history-item-header-return-link"]}>
    //           <a
    //             onClick={() => this.handleAnchorClick(order_number)}
    //           >
    //             {shipping && !expire ? 'Return or Exchange' : ''}
    //           </a>
    //         </div>
    //         {/*<span onClick={this.jumpToTrack.bind(this, true)}>Track this order</span>*/}
    //       </Col>
    //     </Row>
    //   );
    // }else {
    const order_status = shipping
      ? "shipped"
      : on_hold
        ? "on_hold"
        : canceled
          ? "cancelled"
          : "processed";

    // render info span according to order config
    let orderConfig;
    // this is a store purchase
    if (["ebe", "et"].includes(store_type)) {
      orderConfig = "store";
    } else if (!canceled && expire) {
      // purchase already closed
      orderConfig = "close";
    }

    const order_span_status = ORDER_STATUS_RULE_MAPPING.find(
      status => status.id === orderConfig
    );

    return (
      <Row className={styles["order-history-item-header"]}>
        <Col
          className={styles["order-history-item-order-number"]}
          xs={12}
          sm={4}
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          {!this.state.expanded ? (
            <i
              className="ion-android-add"
              style={{
                fontSize: "14px",
                marginRight: "10px",
                verticalAlign: "middle"
              }}
            />
          ) : (
            <i
              className="ion-android-remove"
              style={{
                fontSize: "14px",
                marginRight: "10px",
                verticalAlign: "middle"
              }}
            />
          )}
          <span>
ORDER #
            {this.props.order_number}
          </span>
        </Col>
        <Col xs={12} sm={6} className={styles["order-history-detail-column"]}>
          <div className={styles["order-history-item-header-place-time"]}>
            Placed on
            {" "}
            <span style={{ fontWeight: "bold" }}>{place_time}</span>
          </div>
          <div className={styles["order-history-item-header-tracking-number"]}>
            Tracking number:
            <span className={styles["order-history-item-header-tracking-number-content"]}>
              {" "}
              {tracking_url ? (
                <span onClick={() => window.open(tracking_url)}>{tracking_number}</span>
              ) : (
                tracking_number
              )}
            </span>
          </div>
          <div className={styles["order-history-item-header-tracking-number"]}>
            <span>
              Order status:
              {" "}
              <span style={{ fontWeight: "bold" }}>
                {
                  ORDER_STATUS_RULE_MAPPING.find(status => status.id === order_status)
                    .name
                }
              </span>
            </span>
            {!canceled ? (
              <img
                className={styles.question}
                src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
                alt="membershipMedal"
                style={{ marginLeft: 3, marginTop: -3 }}
                onClick={() => {
                  this.setState({ popup: true, popup_value: order_status });
                }}
              />
            ) : null}
          </div>
          <div className={styles["order-history-item-header-tracking-number"]}>
            {carrier_status ? (
              <span>
                Shipment status:
                {" "}
                <span style={{ fontWeight: "bold" }}>{carrier_status}</span>
              </span>
            ) : null}
          </div>
          <div className={styles["order-history-item-header-tracking-number"]}>
            {refunded ? (
              <span>
                Refund status:
                {" "}
                <span style={{ fontWeight: "bold" }}>
                  {typeof refunded !== "string" ? (refunded ? "Yes" : "No") : refunded}
                </span>
              </span>
            ) : null}
          </div>
        </Col>
        <Col xs={12} sm={2} className={styles["return-column"]}>
          <div className={styles["order-history-item-header-return-link"]}>
            {order_span_status !== undefined ? (
              <div>
                {" "}
                <span style={{ color: "#00000048", marginBottom: "5px" }}>
                  {order_span_status.name}
                </span>
                <img
                  className={styles.question}
                  src="https://storage.googleapis.com/evesetus/email/MyAccount/question.svg"
                  alt="membershipMedal"
                  style={{ marginLeft: 3, marginTop: -3, opacity: 0.5 }}
                  onClick={() => {
                    this.setState({
                      popup: true,
                      popup_value: order_span_status.id
                    });
                  }}
                />
                {" "}
              </div>
            ) : (
              ""
            )}
            <div>
              <a
                onClick={() => {
                  this.setState({ returnPopup: true });
                }}
              >
                {" "}
                {!canceled && shipping && !expire ? "Return" : ""}
                {" "}
              </a>
            </div>
            <div>
              <a onClick={() => this.handleReviewClick(order_number)}>
                {" "}
                {!canceled && shipping ? "Review Order" : ""}
                {" "}
              </a>
            </div>
          </div>
        </Col>
        {this.state.popup ? this.renderPopupWindow(this.state.popup_value) : null}
        {this.state.returnPopup ? this.renderReturnPopupWindow(order_number) : null}
      </Row>
    );
  }

  renderPriceSegments(segment) {
    let value = segment.value || segment.value == 0
      ? `${
        segment.code.includes("rewardpoints")
            || segment.code.includes("membership_stars")
          ? ""
          : `${segment.value < 0 || segment.code.includes("coupon") ? "-$" : "$"}`
      }${Math.abs(segment.value)}`
      : "not available";

    if (segment.code.includes("rewardpoints_used")) {
      value = segment.value;
    }

    let shipping_amount;
    let shipping_discount_amount;
    if (segment.code === "grand_total") {
      // if shipping fee can be included in price segments, it will be better...
      shipping_amount = (
        <div className={styles["price-detail-bar"]}>
          <Col xs={6} className={styles["price-detail-title"]}>
            {"SHIPPING"}
          </Col>
          <Col xs={6} className={styles["price-detail-value"]}>
            {this.props.shipping_total ? `$${this.props.shipping_total}` : ""}
          </Col>
        </div>
      );
      shipping_discount_amount = !this.props.shipping_total ? (
        ""
      ) : this.props.shipping_total.shipping_discount_amount === 0 ? (
        ""
      ) : (
        <div className={styles["price-detail-bar"]}>
          <Col xs={6} className={styles["price-detail-title"]}>
            {"SHIPPING DISCOUNT"}
          </Col>
          <Col xs={6} className={styles["price-detail-value"]}>
            {`-$${this.props.shipping_total}`
            && this.props.shipping_total.shipping_discount_amount
              ? this.props.shipping_total.shipping_discount_amount
              : "0"}
          </Col>
        </div>
      );
    }
    return (
      <div key={segment.code}>
        {shipping_amount || ""}
        {shipping_discount_amount || ""}
        <div key={segment.code} className={styles["price-detail-bar"]}>
          <Col xs={6} className={styles["price-detail-title"]}>
            {segment.title}
          </Col>
          {/* <Col xs={6}>{segment.value >= 0 ? `$${segment.value}` : `-$${-segment.value}`}</Col> */}
          <Col xs={6} className={styles["price-detail-value"]}>
            {value}
          </Col>
        </div>
      </div>
    );
  }

  renderGiftCardRows() {
    const { gift_card_detail } = this.props;
    if (!gift_card_detail) {
      return null;
    }

    const activationDate = new Date(gift_card_detail.active_at);
    const yyyy = activationDate.getFullYear().toString();
    const mm = (activationDate.getMonth() + 1).toString(); // getMonth() is zero-based
    const dd = activationDate.getDate().toString();

    return (
      <div className={styles["price-detail-panel"]}>
        <div className={styles["price-detail-panel-content"]}>
          <Row style={{ fontFamily: "GothamMedium", margin: "5px 0px" }}>Gift Card</Row>
          <Row>
            <Col xs={6} className={styles["price-detail-title"]}>
              Gift Card Amount
            </Col>
            <Col xs={6} className={styles["price-detail-value"]}>
              $
              {gift_card_detail.gift_amount}
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles["price-detail-title"]}>
              Status
            </Col>
            <Col xs={6} className={styles["price-detail-value"]}>
              {gift_card_detail.status}
            </Col>
          </Row>
          <Row>
            <Col xs={6} className={styles["price-detail-title"]}>
              Issue Date
            </Col>
            <Col
              xs={6}
              className={styles["price-detail-value"]}
            >
              {`${mm}/${dd}/${yyyy}`}
            </Col>
          </Row>
          {/*
            <Row>
              <Col xs={6} className={styles["price-detail-title"]}>Expiration Date</Col>
              <Col xs={6} className={styles["price-detail-value"]}>expiration date value</Col>
            </Row>
            */}
        </div>
      </div>
    );
  }

  renderRefundList() {
    const { refund_list } = this.props;
    if (refund_list && Array.isArray(refund_list) && refund_list.length > 0) {
      const tableHead = (
        <tr>
          <th>Refund ID</th>
          <th>Created at</th>
          <th>Status</th>
          <th>Shipping Label</th>
        </tr>
      );
      const tableBody = refund_list.map((n, index) => {
        return (
          <tr key={index}>
            <td>{n.refund_id}</td>
            <td>{new Date(n.created_at).toString()}</td>
            <td>{n.status}</td>
            {n.status === "pending" ? (
              <td>
                <a href={n.label_url} target="_blank" rel="noopener noreferrer">
                  link
                </a>
              </td>
            ) : null}
          </tr>
        );
      });
      return (
        <Table responsive bsClass={styles.refundTable}>
          <thead>{tableHead}</thead>
          <tbody>{tableBody}</tbody>
        </Table>
      );
    }
    return null;
  }

  renderItemBody(kitItemsList, itemList) {
    // const itemList = this.props.items;
    const { store_type } = this.props;

    const notes = ["ebe", "et"].includes(store_type)
      ? "Items from this order can be returned to store within 14 days of receipt."
      : "Please note: you can return an item from this order within 30 days of receipt.";

    if (!itemList) {
      return "No Purchase Record";
    }
    let productRedeemPoint = 0;
    if (itemList.length > 0) {
      productRedeemPoint = itemList.length === 1
        ? _.get(itemList[0], "redeem_points", 0)
        : itemList.reduce((a, b) => ({
          redeem_points: _.get(a, "redeem_points", 0) + _.get(b, "redeem_points", 0)
        }));
    }

    return (
      <div>
        <Row>
          {this.renderRefundList()}
          <Col xs={12} sm={4}>
            <div style={{ fontSize: "12px" }}>{notes}</div>
          </Col>

          <Col xs={12} sm={8}>
            <div
              style={{
                width: "100%",
                height: "1px",
                borderBottom: "1px solid #eee",
                marginBottom: "10px"
              }}
            />
            {itemList.map((item, index) => (
              <ProductItem key={index} {...item} state={this.props.state} />
            ))}
            {kitItemsList.map((kitItem, idx) => (
              <ProductItem key={idx} state={this.props.state} kitItem={kitItem} />
            ))}

            {/* Here this block of codes are used for total segments */}
            <div className={styles["price-detail-panel"]}>
              <div className={styles["price-detail-panel-content"]}>
                <Row style={{ fontFamily: "GothamMedium", margin: "5px 0px" }}>
                  Order Summary
                </Row>
                <Row>
                  {this.props.total_segments.map((segment) => {
                    // console.log("----", segment);
                    return this.renderPriceSegments(segment);
                  })}
                </Row>
              </div>
            </div>
            {/* End of total segments */}

            {this.renderGiftCardRows()}

            {/* block of shipping&billing detail */}
            <Row style={{ paddingTop: "15px" }}>
              <Col xs={12} sm={6}>
                {this.renderShippingMethod()}
                {this.renderShippingAddress()}
              </Col>
              <Col xs={12} sm={6}>
                {this.renderPaymentMethod(productRedeemPoint.redeem_points)}
                {/* Back end does not provided the billing address data */}
                {this.renderBillingAddress()}
              </Col>
            </Row>
          </Col>
          <Row>
            <button
              className={styles["close-button"]}
              onClick={() => {
                this.setState({ expanded: false });
              }}
            >
              Close
            </button>
          </Row>
        </Row>
      </div>
    );
  }

  render() {
    const itemList = [...this.props.items];
    const kitItemsList = this.props.kit_items;

    for (const kitItem of kitItemsList) {
      const subProducts = _.remove(itemList, item => item.kit_id === kitItem._id);
      kitItem.subProducts = [...subProducts];
    }

    // console.log('kitItemList', kitItemsList);

    return (
      <Col>
        <Panel
          className={styles["order-history-item-header-container"]}
          expanded={this.state.expanded}
          onToggle={() => this.setState({ expanded: !this.state.expanded })}
        >
          <Panel.Heading
            style={{
              backgroundColor: `${this.state.expanded ? "#00000008" : "#FFFFFF"}`
            }}
          >
            {this.renderItemHeader()}
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.renderItemBody(kitItemsList, itemList)}</Panel.Body>
          </Panel.Collapse>
        </Panel>
      </Col>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(OrderItem);
