import React from "react";
import {
  Row,
  Col,
  DropdownButton,
  ButtonToolbar,
  MenuItem,
  Tabs,
  Tab
} from "react-bootstrap";
import { connect } from "react-redux";

// import style
import { Link } from "react-router-dom";
import styles from "./OrderHistory.css";

// import components
import OrderItem from "./OrderItem";

// import actions
import { fetchOrderHistory } from "../../CustomerActions";

// import getter
import { getOrderHistory } from "../../CustomerReducer";

class OrderHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { prevTime: 30 };
  }

  componentDidMount() {
    this.props.dispatch(fetchOrderHistory());
  }

  renderTitle() {
    return (
      <Col className={styles["order-history-title-container"]} xs={12}>
        <div className={styles["order-history-title"]}>Your Orders</div>
      </Col>
    );
  }

  renderTitleOption() {
    return (
      <Col xs={12} md={6}>
        <Row>
          <Col xs={6} md={12} style={{ display: "flex" }}>
            <div>View orders placed in </div>
            <div>
              <ButtonToolbar>
                <DropdownButton
                  title={`${this.state.prevTime} days`}
                  pullRight
                  id="split-button-pull-right"
                >
                  <MenuItem eventKey="1">Action</MenuItem>
                  {/* <MenuItem eventKey="2">Another action</MenuItem> */}
                  {/* <MenuItem eventKey="3">Something else here</MenuItem> */}
                  {[15, 30, 60, 90].map(time => (
                    <MenuItem
                      key={time}
                      onClick={() => this.setState({ prevTime: time })}
                    >
                      {`${time} days`}
                    </MenuItem>
                  ))}
                </DropdownButton>
              </ButtonToolbar>
            </div>
          </Col>
          <Col xs={6} md={12}>
            <div>Expand all orders</div>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    // get the order history
    const { orderHistory, orderHistoryLoading } = this.props;
    console.log("orderHistory", orderHistory);
    return (
      <div>
        <Row>
          {this.renderTitle()}
          {/* {this.renderTitleOption()} */}
        </Row>
        <div className={styles["order-tabs"]}>
          <Tabs defaultActiveKey={1} id="order-list">
            <Tab eventKey={1} title="Orders">
              <div className={styles["order-history-title-description"]}>
                {"You'll see a tracking number as soon as your orders are shipped."}
              </div>
              <div className={styles["order-history-title-description"]}>
                {"Want to return an order that you placed as a guest? "}
                <Link to={{ pathname: "/return/guest", state: { to_guest: true } }}>
                  Click here
                </Link>
              </div>
              <Row className={styles.orders}>
                {orderHistoryLoading
                  ? null
                  : orderHistory
                    ? orderHistory.map(item => (item.canceled ? null : (
                      <OrderItem key={item.order_number} {...item} />
                    )))
                    : "Sorry, no orders found."}
              </Row>
            </Tab>
            <Tab eventKey={2} title="Cancelled orders">
              <Row className={styles.orders}>
                {orderHistoryLoading
                  ? null
                  : orderHistory
                    ? orderHistory.map(item => (item.canceled ? (
                      <OrderItem key={item.order_number} {...item} />
                    ) : null))
                    : "Sorry, no orders found."}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    orderHistory: getOrderHistory(store)
  };
}

export default connect(mapStateToProps)(OrderHistory);
