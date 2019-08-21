import React, { Component } from "react";
import { connect, batch } from "react-redux";
import {
  Grid, Panel, Form, FormGroup, FormControl, ControlLabel
} from "react-bootstrap";
import history from "../../../../history";

import ReturnItemsList from "../../components/ReturnItemsList/ReturnItemsList";
import AddressForm from "../../../CheckoutV2/components/AddressForm/AddressForm";
import FieldFormControlRadiobox from "../../../../components/FieldFormControlRadiobox";

import {
  fetchOrderHistory,
  setReturnFromAddress,
  requestRefundEstimate,
  placeReturn,
  fetchGuestOrder,
  setShipToNew
} from "../../CustomerActions";
import {
  getOrderHistory,
  getReturnFromAddress,
  getRefundEstimate,
  getGuestOrder,
  getShipNew
} from "../../CustomerReducer";
import { getCustomerID } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

import { returnReasons } from "../../components/ReturnItem/constants";

import DateSelector from "../../../../componentsV2/DateSelector/DateSelector";

import styles from "./ReturnPage.css";

class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailChange: false,
      currentStep: 0,
      selects: {},
      errorMessage: "",
      targetOrder: null,
      allItemHasRefundAmount: false,
      placingReturnRequest: false,
      returnSuccess: false,
      label_download: null,
      label_clicked: false,
      guestEmail: "",
      guestOrderNumber: "",
      guestOrderDate: "",
      guestMethod: "email", // or 'date'
      guestMsg: "",
      shipping_address: this.props.returnFromAddress,
      input: []
    };
    this.changeItem = this.changeItem.bind(this);
    this.handleAddressCallback = this.handleAddressCallback.bind(this);
    this.handlePlaceReturnCallBack = this.handlePlaceReturnCallBack.bind(this);
    this.handleFindQuestOrderForm = this.handleFindQuestOrderForm.bind(this);
    this.handleQuestFormChange = this.handleQuestFormChange.bind(this);
    this.handleFindQuestOrderFormCallback = this.handleFindQuestOrderFormCallback.bind(
      this
    );
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.handleToggleGuestMethod = this.handleToggleGuestMethod.bind(this);
  }

  componentDidMount() {
    const {
      params: { orderID },
      orderHistory,
      returnFromAddress
    } = this.props;
    if (returnFromAddress) {
      this.setState({ shipping_address: JSON.parse(JSON.stringify(returnFromAddress)) });
    }

    if (orderID.toUpperCase() !== "GUEST") {
      if (!orderHistory) {
        // fetch order history
        this.props.dispatch(fetchOrderHistory());
      } else {
        // fetch with this orderID
        const targetOrderToFind = orderHistory.find(o => o.order_number === orderID);
        this.setState({ targetOrder: targetOrderToFind });
        this.setState({ emailChange: targetOrderToFind.customer_email === null });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      params: { orderID },
      orderHistory,
      guestOrder,
      returnFromAddress
    } = nextProps;
    const { targetOrder } = this.state;

    if (nextProps.authStatus && orderID.toUpperCase() === "GUEST") {
      history.push("/account/dashboard");
    }

    if (returnFromAddress) {
      this.setState({ shipping_address: JSON.parse(JSON.stringify(returnFromAddress)) });
    }
    // OF-142 fix return address missing problem
    if (
      this.props.orderHistory === null
      && nextProps.orderHistory != null
      && this.props.params
    ) {
      const targetOrderToFind = nextProps.orderHistory.find(
        o => o.order_number === this.props.params.orderID
      );
      this.props.dispatch(setReturnFromAddress(targetOrderToFind.shipping_address));
    }
    let targetOrderToFind;
    if (orderHistory && !targetOrder) {
      targetOrderToFind = orderHistory.find(o => o.order_number === orderID);
      console.log("targetOrderToFind", targetOrderToFind);
      this.setState({ targetOrder: targetOrderToFind });
    }
    if (orderID.toUpperCase() === "GUEST" && guestOrder) {
      if (guestOrder !== this.props.guestOrder) {
        this.setState({
          targetOrder: guestOrder
        });
        this.setState({ emailChange: guestOrder.customer_email === null });
      }
    }
    if (!orderHistory && !guestOrder) {
      this.setState({
        targetOrder: null
      });
    }
    // refund
    let allItemHasRefundAmount = true;
    if (targetOrderToFind) {
      targetOrderToFind.items.forEach((item) => {
        if (allItemHasRefundAmount) {
          if (!item.price || !item.price.refund_amount) {
            allItemHasRefundAmount = false;
          }
        }
      });
      this.setState({
        allItemHasRefundAmount
      });
    }
  }

  getItemsData() {
    const { targetOrder, selects } = this.state;
    let success = true;
    const itemsData = [];
    Object.entries(selects).forEach(([key, value]) => {
      if (value.selected && value.qty > 0 && key < targetOrder.items.length) {
        const item = targetOrder.items[key];
        if (!item) {
          success = false;
          return null;
        }
        itemsData.push({
          // sku: item.sku,
          _id: item._id,
          // item_weight: item.weight ? item.weight : null, // weight
          reason: value.reason ? value.reason : "N/A"
          // refund_amount: item.refund_amount ? item.refund_amount : -1,  // ??
        });
      }
      return null;
    });
    if (!success) return null;
    return itemsData;
  }

  handleNextStep = () => batch(() => {
    const {
      currentStep, selects, allItemHasRefundAmount, targetOrder
    } = this.state;
    console.log("handleNextStep called", currentStep);
    this.setState({ errorMessage: "" });
    switch (currentStep) {
      case 0:
        let hasSelection = false;
        let reasonSelected = true;
        Object.entries(selects).forEach(([key, value]) => {
          if (value.selected && value.qty > 0) {
            hasSelection = true;
            if (
              !value.reason
              || value.reason === returnReasons[0].id
              || value.reason === "others"
            ) {
              reasonSelected = false;
            }
          }
        });
        if (hasSelection && reasonSelected) {
          this.setState({ currentStep: currentStep + 1 });
        } else {
          if (!hasSelection) {
            this.setState({ errorMessage: "Please select one item at least to proceed" });
          }
          if (!reasonSelected) {
            this.setState({
              errorMessage: "Please select return reason for each product"
            });
          }
        }
        break;
      case 1:
        this.setState({ currentStep: currentStep + 1 });
        break;
      case 2:
        this.setState({ currentStep: currentStep + 1 });
        this.props.dispatch(setShipToNew(true));
        if (allItemHasRefundAmount) {
          const items = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const key in selects) {
            if (selects[key]._id) {
              items.push({ _id: selects[key]._id });
            }
          }
          const data = {
            order_id: targetOrder.order_number,
            items
          };
          this.props.dispatch(requestRefundEstimate(data));
        }
        break;
      case 3:
        this.setState({ currentStep: currentStep + 1 });
        break;
      default:
        break;
    }
  });

  handlePlaceReturn() {
    console.log("handleGetReturnLabel called", this.props);
    const { targetOrder, allItemHasRefundAmount, placingReturnRequest } = this.state;
    if (placingReturnRequest) {
      this.setState({ errorMessage: "We are creating return label for you ..." });
      return;
    }
    const {
      returnFromAddress, customerID, dispatch, refundEstimate
    } = this.props;
    if (targetOrder && returnFromAddress) {
      const {
        increment_id, transaction_id, order_number, customer_email
      } = targetOrder;
      const {
        city,
        country_id,
        firstname,
        lastname,
        postcode,
        region_code,
        street,
        telephone
      } = returnFromAddress;
      const itemsData = this.getItemsData();
      const postData = {
        order_id: increment_id || order_number,
        customer_id: customerID,
        transaction_id, // to do
        customer_email,
        ship_from: {
          name: `${firstname} ${lastname}`,
          phone: telephone,
          company_name: "",
          address_line1: street[0],
          address_line2: street && street[1] ? street[1] : "",
          city_locality: city,
          state_province: region_code,
          postal_code: postcode,
          country_code: country_id
        },
        packages: {
          items: itemsData,
          refund_cash_amount:
            allItemHasRefundAmount && refundEstimate
              ? refundEstimate.refund_cash_amount
              : -1,
          refund_account_balance_amount:
            allItemHasRefundAmount && refundEstimate
              ? refundEstimate.refund_account_balance_amount
              : -1,
          refund_rewardpoint_amount:
            allItemHasRefundAmount && refundEstimate
              ? refundEstimate.refund_rewardpoint_amount
              : -1
        }
      };
      this.setState({
        placingReturnRequest: true
      });
      dispatch(placeReturn(postData, this.handlePlaceReturnCallBack));
    } else {
      console.log("no target order or return-from address");
    }
  }

  handlePlaceReturnCallBack(err, data) {
    console.log("handlePlaceReturnCallBack called");
    this.setState({
      placingReturnRequest: false
    });
    if (!err) {
      // intlReturnInit is true means an international return has been succesfully initiated
      const { label_download, intlReturnInit } = data;
      this.setState({
        label_download,
        intlReturnInit,
        returnSuccess: true
      });
    }
  }

  handleAddressCallback(address) {
    this.props.dispatch(setReturnFromAddress(address));
    this.handleNextStep();
  }

  handleFindQuestOrderForm(e) {
    e.preventDefault();
    const {
      guestEmail, guestOrderNumber, guestOrderDate, guestMethod
    } = this.state;
    if (guestMethod === "email" && guestEmail && guestOrderNumber) {
      this.props.dispatch(
        fetchGuestOrder(
          { email: guestEmail, order_id: guestOrderNumber },
          this.handleFindQuestOrderFormCallback
        )
      );
    } else if (guestMethod === "date" && guestOrderDate && guestOrderNumber) {
      this.props.dispatch(
        fetchGuestOrder(
          { order_date: guestOrderDate, order_id: guestOrderNumber },
          this.handleFindQuestOrderFormCallback
        )
      );
    } else {
      this.setState({ guestMsg: "Please check your order number and email/date." });
    }
    // TODO: need to add a new message for store purchase, waiting for api implementation
    // this.setState({ guestMsg: 'It looks like this is a store purchase. Please note that store purchases cannot be returned/exchanged online.' });
  }

  handleFindQuestOrderFormCallback(err, msg) {
    if (err) {
      this.setState({
        guestMsg: msg || "Please check your order number and email/date."
      });
    }
  }

  handleQuestFormChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleDateSelected(date) {
    this.setState({
      guestOrderDate: date
    });
  }

  handleToggleGuestMethod(e) {
    this.setState({
      guestMethod: e.target.value
    });
  }

  changeItem(index, selected, qty, reason, _id) {
    const { selects, input } = this.state;
    const selectsNew = JSON.parse(JSON.stringify(selects));
    selectsNew[index] = {
      selected, qty, reason, _id
    };
    const inputNew = input;
    inputNew[index] = !reason || reason.indexOf("others") !== -1 ? reason : input[index];
    this.setState({ selects: selectsNew, input: inputNew });
    // console.log("selects",selects);
  }

  renderItemsSelectionPanel() {
    const {
      currentStep, selects, errorMessage, targetOrder, input
    } = this.state;
    const reviewMode = currentStep !== 0;
    return (
      <div>
        <ReturnItemsList
          reviewMode={reviewMode}
          items={targetOrder.items}
          changeItem={this.changeItem}
          selects={selects}
          input={input}
        />
        <div className={reviewMode ? "hidden" : ""}>
          <button
            className={styles["button-style"]}
            onClick={() => this.handleNextStep()}
          >
            Continue
          </button>
          <div className={styles.errorWrapper}>
            <span>{errorMessage}</span>
          </div>
        </div>
      </div>
    );
  }

  renderEmailPanel() {
    const {
      currentStep, targetOrder, errorMessage, emailChange
    } = this.state;
    const newEmail = JSON.parse(JSON.stringify(targetOrder));
    return (
      <div>
        <div className={currentStep > 1 ? "hidden" : ""}>
          {!emailChange ? (
            <div style={{ marginBottom: "10px" }}>{targetOrder.customer_email}</div>
          ) : (
            <input
              required
              className={styles.inputEmail}
              ref="inputEmail"
              placeholder="enter your email"
            />
          )}
          <button
            className={styles["button-style"]}
            onClick={() => {
              if (!emailChange) {
                this.handleNextStep();
                return;
              }
              const inputEmail = this.refs.inputEmail.value;
              if (
                inputEmail
                && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputEmail)
              ) {
                newEmail.customer_email = inputEmail;
                this.setState({ targetOrder: newEmail });
                this.handleNextStep();
              } else {
                this.setState({ errorMessage: "Please enter a valid email address" });
              }
            }}
          >
            Continue
          </button>
          <div className={styles.errorWrapper}>
            <span>{errorMessage}</span>
          </div>
        </div>
        <div className={currentStep <= 1 ? "hidden" : ""}>
          {targetOrder.customer_email}
        </div>
      </div>
    );
  }

  renderShippingFromPanel() {
    const { returnFromAddress, shipNew } = this.props;
    const { currentStep } = this.state;
    let returnFromAddressRender = null;
    let oldReturnFromAddressRender = null;
    if (returnFromAddress) {
      const {
        city,
        country_id,
        firstname,
        lastname,
        region_code,
        street,
        telephone
      } = returnFromAddress;
      returnFromAddressRender = (
        <div>
          <div>
            {firstname}
            {" "}
            {lastname}
          </div>
          <div>
            {street[0]}
            {" "}
            {street[1]}
          </div>
          <div>{`${city}, ${region_code}, ${country_id}`}</div>
          <div>{telephone}</div>
        </div>
      );
    }
    console.log("this is old address", this.state.shipping_address);
    if (this.state.shipping_address) {
      const {
        city,
        country_id,
        firstname,
        lastname,
        region_code,
        street,
        telephone
      } = this.state.shipping_address;
      oldReturnFromAddressRender = (
        <div>
          <div>
            {firstname}
            {" "}
            {lastname}
          </div>
          <div>
            {street[0]}
            {" "}
            {street[1]}
          </div>
          <div>{`${city}, ${region_code}, ${country_id}`}</div>
          <div>{telephone}</div>
          <button
            onClick={() => {
              this.props.dispatch(setReturnFromAddress(this.state.shipping_address));
              this.handleNextStep();
            }}
            className={styles.continueBTN}
          >
            {" "}
            CONTINUE
            {" "}
          </button>
        </div>
      );
    }
    const newAddressNode = (
      <div
        className={styles.useNew}
        onClick={() => {
          this.props.dispatch(setShipToNew(true));
        }}
      >
        + &nbsp;&nbsp;&nbsp;&nbsp; Add a new address
        {" "}
      </div>
    );
    const oldAddressNode = (
      <div
        className={styles.useOld}
        onClick={() => {
          this.props.dispatch(setShipToNew(false));
        }}
      >
        + &nbsp;&nbsp;&nbsp;&nbsp; Use an existed address
        {" "}
      </div>
    );
    return (
      <div>
        <div className={currentStep > 2 ? "hidden" : ""}>
          {oldReturnFromAddressRender && !shipNew
            ? oldReturnFromAddressRender
            : oldAddressNode}
          {shipNew ? (
            <AddressForm
              callback={this.handleAddressCallback}
              extraFields={null}
              extraButtons={null}
            />
          ) : (
            newAddressNode
          )}
        </div>
        <div className={currentStep <= 2 ? "hidden" : ""}>{returnFromAddressRender}</div>
      </div>
    );
  }

  renderRefundWaysPanel() {
    const { allItemHasRefundAmount, currentStep } = this.state;
    const { refundEstimate } = this.props;
    const nextStepBtn = (
      <div className={currentStep > 3 ? "hidden" : ""}>
        <button className={styles["button-style"]} onClick={() => this.handleNextStep()}>
          Continue
        </button>
      </div>
    );
    if (allItemHasRefundAmount && refundEstimate) {
      // calculate and tell customer the refund details
      return (
        <div>
          <div style={{ marginBottom: "20px" }}>
            After we receive package, you will get back:
          </div>
          <div style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            <div>
Account balance: $
              {refundEstimate.refund_account_balance_amount}
            </div>
            <div>
              Cash amount: $
              {refundEstimate.refund_cash_amount}
              {" "}
(Back to original payment)
            </div>
            <div>
Reward points:
              {refundEstimate.refund_rewardpoint_amount}
              {" "}
points
            </div>
          </div>
          <div className={currentStep > 3 ? "hidden" : ""}>
            <button
              className={styles["button-style"]}
              onClick={() => this.handleNextStep()}
            >
              Continue
            </button>
          </div>
        </div>
      );
    }
    // tell customer refund value will be manually calculated by accountant
    return (
      <div>
        If item(s) are eligible for return when received, your refund will be returned via
        the original payment method
        {nextStepBtn}
      </div>
    );
  }

  renderReviewPanel(isInUSShip) {
    const {
      label_download,
      placingReturnRequest,
      label_clicked,
      intlReturnInit
    } = this.state;

    const backToAccountButton = (title) => {
      return (
        <a href="/account/dashboard/">
          <button className={`${styles["button-style"]} ${styles["button-oppsoite"]}`}>
            {title}
          </button>
        </a>
      );
    };

    if (label_download) {
      return (
        <div>
          <div style={{ marginBottom: "20px" }}>
            Return label created, please click button below to get the label
          </div>
          <a href={label_download.href} target="_blank">
            <button
              className={styles["button-style"]}
              onClick={() => {
                this.setState({ label_clicked: true });
              }}
            >
              {"Click here for return label"}
            </button>
          </a>
          {label_clicked ? backToAccountButton("Back to My Account") : null}
        </div>
      );
    }
    const placingButtonTitle = isInUSShip
      ? "Fetching Return Label ..."
      : "Submitting Return ...";
    const submitButtonTitle = isInUSShip ? "Fetch Return Label" : "Submit";

    return (
      <div>
        {isInUSShip ? null : (
          <div style={{ marginBottom: "20px" }}>
            Return made within 30 days from Outside U.S. will be issued a full refund.
            Customers re responsible for any return shipping costs.
            <br />
            <br />
            Please send your return item(s) to this address:
            <br />
            <strong>Customer Service</strong>
            <br />
            304 S Date Ave
            <br />
            Alhambra, California, 91803, USA
            <br />
            <br />
            After clikcing on submit button, your return process will be initiated. You
            will be notified the status of your return when recieved, and refunded.
          </div>
        )}
        {intlReturnInit ? (
          backToAccountButton("Back to My Account")
        ) : (
          <button
            className={styles["button-style"]}
            onClick={() => this.handlePlaceReturn()}
          >
            {placingReturnRequest ? placingButtonTitle : submitButtonTitle}
          </button>
        )}
      </div>
    );
  }

  renderQuestFetchOrder() {
    const { guestOrderNumber, guestEmail, guestMsg } = this.state;
    return (
      <div className={`container ${styles.questRoot}`}>
        <div className={styles["guest-return-title"]}> Find your order </div>
        <Form onSubmit={this.handleFindQuestOrderForm} className={styles["guest-form"]}>
          <p style={{ marginBottom: "20px", textAlign: "center", fontSize: "12px" }}>
            Use
            {" "}
            <strong>Order Number + Email Address</strong>
,
            <br />
            OR
            {" "}
            <strong>Order Number + Order Date</strong>
            {" "}
to find your order.
          </p>
          <FieldFormControlRadiobox
            name="guest_search_order_method"
            id="with_email"
            value="email"
            title="Find Order with Email"
            checked={this.state.guestMethod === "email"}
            onChange={this.handleToggleGuestMethod}
          />
          {this.state.guestMethod === "email" ? (
            <div className={styles.guestOrderOptionWrapper}>
              <FormGroup>
                <ControlLabel>Order Number</ControlLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  id="guestOrderNumber"
                  value={guestOrderNumber}
                  onChange={this.handleQuestFormChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <FormControl
                  type="email"
                  placeholder=""
                  id="guestEmail"
                  value={guestEmail}
                  onChange={this.handleQuestFormChange}
                />
              </FormGroup>
            </div>
          ) : null}
          <FieldFormControlRadiobox
            name="guest_search_order_method"
            id="with_date"
            value="date"
            title="Find Order with Order Date"
            checked={this.state.guestMethod === "date"}
            onChange={this.handleToggleGuestMethod}
          />
          {this.state.guestMethod === "date" ? (
            <div className={styles.guestOrderOptionWrapper}>
              <FormGroup>
                <ControlLabel>Order Number</ControlLabel>
                <FormControl
                  type="text"
                  placeholder=""
                  id="guestOrderNumber"
                  value={guestOrderNumber}
                  onChange={this.handleQuestFormChange}
                />
              </FormGroup>
              <ControlLabel>Order Date</ControlLabel>
              <DateSelector
                changeCallback={this.handleDateSelected}
                initialDate={this.state.guestOrderDate}
              />
            </div>
          ) : null}
          <div>
            <button className={styles["submit-btn"]} type="submit">
              Find my order
            </button>
          </div>
          <div>
            <div className={styles["submit-err"]}>{guestMsg}</div>
          </div>
        </Form>
      </div>
    );
  }

  render() {
    const {
      params: { orderID },
      orderHistory,
      authStatus
    } = this.props;
    const { currentStep, targetOrder, label_download } = this.state;

    if (
      authStatus
      && !targetOrder
      && !(
        this.props.location
        && this.props.location.state
        && this.props.location.state.to_guest
      )
    ) {
      // history.push('/account/dashboard/order_history'); // to fix bug, OF-526
    } else if (
      (!orderHistory
        || (this.props.location
          && this.props.location.state
          && this.props.location.state.to_guest))
      && !targetOrder
    ) {
      return <div>{this.renderQuestFetchOrder()}</div>;
    }

    if (!targetOrder) {
      return (
        <div>
Can not find
          {orderID}
, please try refreshing page
        </div>
      );
    }

    // International Shipping return costs not covered by our free return policy
    // Customers need to pay and ship by themselves; bool for in US shipment
    const isInUSShip = ["", "US"].includes(targetOrder.shipping_address.country_id);
    const pageTitle = isInUSShip ? (
      <div className={styles.pageTitle}>Creating Return Label</div>
    ) : (
      <div className={styles.pageTitle}>
        Please Note that Our Free Return Only Applies to Shipping within U.S.
        <br />
        Customers Will Be Responsible for Shipping Costs Outside U.S.
      </div>
    );

    const stepFiveTitle = isInUSShip
      ? "Step 5: Review and get shipping label"
      : "Step 5: Review and submit";
    const titles = [
      "Step 1: Select items and quantity",
      "Step 2: Enter your email",
      "Step 3: Enter your address",
      "Step 4: Refund ways"
    ];
    titles.push(stepFiveTitle);

    const headerNodes = titles.map((title, index) => {
      return (
        <div>
          <span>{title}</span>
          {index < currentStep && !label_download ? (
            <span
              className="pull-right"
              onClick={() => this.setState({ currentStep: index })}
            >
              Edit
            </span>
          ) : null}
        </div>
      );
    });
    return (
      <div style={{ paddingTop: "20px" }}>
        <div>
          {/* <div className={styles.pageTitle}>Creating Return Label</div> */}
          {pageTitle}
          <div className={styles.pageSubTitle}>
            Order #:
            {" "}
            {targetOrder.order_number || targetOrder.increment_id}
          </div>
        </div>
        <Grid>
          <Panel onToggle={() => {}} expanded={currentStep >= 0}>
            <Panel.Heading>{headerNodes[0]}</Panel.Heading>
            <Panel.Body collapsible>{this.renderItemsSelectionPanel()}</Panel.Body>
          </Panel>
          <Panel onToggle={() => {}} expanded={currentStep >= 1}>
            <Panel.Heading>{headerNodes[1]}</Panel.Heading>
            <Panel.Body collapsible>{this.renderEmailPanel()}</Panel.Body>
          </Panel>
          <Panel onToggle={() => {}} expanded={currentStep >= 2}>
            <Panel.Heading>{headerNodes[2]}</Panel.Heading>
            <Panel.Body collapsible>{this.renderShippingFromPanel()}</Panel.Body>
          </Panel>
          <Panel onToggle={() => {}} expanded={currentStep >= 3}>
            <Panel.Heading>{headerNodes[3]}</Panel.Heading>
            <Panel.Body collapsible>{this.renderRefundWaysPanel()}</Panel.Body>
          </Panel>
          <Panel onToggle={() => {}} expanded={currentStep >= 4}>
            <Panel.Heading>{headerNodes[4]}</Panel.Heading>
            <Panel.Body collapsible>{this.renderReviewPanel(isInUSShip)}</Panel.Body>
          </Panel>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    orderHistory: getOrderHistory(store),
    returnFromAddress: getReturnFromAddress(store),
    customerID: getCustomerID(store),
    refundEstimate: getRefundEstimate(store),
    guestOrder: getGuestOrder(store),
    shipNew: getShipNew(store),
    authStatus: getAuthStatus(store)
  };
}

export default connect(mapStateToProps)(Return);
