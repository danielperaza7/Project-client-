import React, { Component } from "react";
import {
  Grid, Row, Col, Panel
} from "react-bootstrap";
import { connect, batch } from "react-redux";
import Helmet from "react-helmet";
import { Element, scroller } from "react-scroll";
import { Cookies } from "react-cookie";
import history from "../../../../history";

import OrderSummary from "../../components/OrderSummary/OrderSummary";
import ItemsListWrapper from "../../components/ItemsList/ItemsListWrapper";
import PanelYourInfo from "../../components/PanelYourInfo/PanelYourInfo";
import PanelShipping from "../../components/PanelShipping/PanelShipping";
import PanelPayment from "../../components/PanelPayment/PanelPayment";
import PanelReview from "../../components/PanelReview/PanelReview";
// import PanelFooterButton from "../../components/PanelFooterButton/PanelFooterButton";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import CustomModal from "../../../../components/Modal/CustomModal";
import DefaultMask from "../../../../components/masks/DefaultMask";
import styles from "./CheckoutPage.css";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

// actions
import {
  constructOrderSuccessDataV2,
  PushDL_OrderSuccess,
  onCheckoutOption,
  constructCheckoutData,
  onCheckout
} from "../../../Analytics/components/GA";

import {
  setOrderEmail,
  setOrderPhone,
  fetchBraintreeToken,
  setCheckoutStep,
  saveNewAddress,
  postOrder,
  setOrderSuccessData,
  setShipNew,
  resetCheckoutPartState,
  fetchCart,
  setShipExistID,
  setBillExistID,
  setBillNew,
  setUseAsBilling,
  setBillingAddress,
  setShippingAddress
} from "../../CheckoutActions";

import {
  getUserData,
  getCartShippingAddress,
  getCartBillingAddress
} from "../../../App/AppReducer";

// getters
import {
  getCheckoutStep,
  getLoadingCart,
  getCurrentShippingMethod,
  getPriceCalcResult,
  getOrderEmail,
  getSaveNewBillingAddress,
  getSaveNewShippingAddress,
  getPaymentMethod,
  getNonceBraintreePaypal,
  getNonceBraintreeCreditCard,
  getTokenBraintreeSavedSelected,
  getSaveNewPayment,
  getOrderPhone,
  getReferID,
  getReferType
} from "../../CheckoutReducer";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeOrderErrorMessage: "",
      placeOrderErrorShow: false,
      loading_placeOrder: false,
      shippingToSave: "",
      billingToSave: "",
      current_priceCalcResult: {},
      retryPayment: false,
      braintree_device_data: null,
      coupon_code: ""
    };
    this.handleEditStep = this.handleEditStep.bind(this);
    this.handlePlaceOrderResponse = this.handlePlaceOrderResponse.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleOrderSuccessDataPush = this.handleOrderSuccessDataPush.bind(this);
    this.braintreeDataCollector = this.braintreeDataCollector.bind(this);
    this.clientTokenFetched = this.clientTokenFetched.bind(this);
  }

  componentDidMount() {
    batch(() => {
      const { authenticated, customer } = this.props;
      if (
        this.props.priceCalcResult
      && this.props.priceCalcResult.value.products.length > 0
      ) {
        if (this.props.authenticated) {
          onCheckout(
            constructCheckoutData(
              1,
              "initialization",
              this.props.priceCalcResult.value.products
            )
          );
        } else {
          const cookie = new Cookies();
          const token = cookie.get("x-auth");
          if (token) this.props.dispatch(fetchCart("", true, "initialization"));
          else {
            onCheckout(
              constructCheckoutData(
                1,
                "initialization",
                this.props.priceCalcResult.value.products
              )
            );
          }
        }
      }
      if (this.props.customer) {
        if (this.props.customer.addresses.length === 0) {
          this.props.dispatch(setShipNew(true));
        } else {
          this.props.dispatch(setShipNew(false));
        }
      }
      this.props.dispatch(fetchBraintreeToken(this.clientTokenFetched));
      this.props.dispatch(resetCheckoutPartState());

      if (authenticated && customer) {
        this.autoCompleteSteps(customer);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // auto next step
    batch(() => {
      const { authenticated, customer } = nextProps;
      if (authenticated && !this.props.customer && customer) {
        if (customer.addresses.length === 0) this.props.dispatch(setShipNew(true));
        else this.props.dispatch(setShipNew(false));
        this.autoCompleteSteps(customer);
      }
      if (nextProps.checkoutStep === 3) {
        this.setState({ retryPayment: false });
      }
    });
  }

  addressesMatch(address1, address2) {
    return this.getAddressString(address1) === this.getAddressString(address2);
  }

  getNormalizedString(data) {
    // Output 0~9, A~Z only
    if (!data) return "";
    return data
      .toString()
      .replace(/\W/g, "")
      .toUpperCase();
  }

  getAddressString(address) {
    const {
      country_id,
      city,
      firstname,
      lastname,
      postcode,
      region_code,
      street,
      telephone
    } = address;
    return (
      this.getNormalizedString(country_id)
      + this.getNormalizedString(city)
      + this.getNormalizedString(firstname)
      + this.getNormalizedString(lastname)
      + this.getNormalizedString(postcode.substring(0, 5))
      + this.getNormalizedString(region_code)
      + this.getNormalizedString(street)
      + this.getNormalizedString(telephone)
    );
  }

  setAddressFormValues(formName, address) {
    switch (formName) {
      case "shipping_address":
        this.props.dispatch(setShippingAddress(address));
        break;
      case "billing_address":
        this.props.dispatch(setBillingAddress(address));
        break;
      default:
        break;
    }
  }

  autoCompleteSteps(customer) {
    batch(() => {
      console.log("autoCompleteSteps called");
      const {
        email, phone, addresses, cartSchema
      } = customer; // lastLogin
      if (customer && (email || phone)) {
        if (this.props.authenticated) {
          this.props.dispatch(fetchCart("", true, "sign-in"));
        } else {
          this.props.dispatch(fetchCart("", true, "not-sign-in"));
        }
        const loginRecently = true; // should be caculated from current date and lastLogin, if gap is too long then don't put addresses into forms
        let futureStep = 1; // shipping address
        let index = -1; // matched index in addressbook
        let matchedAddressInBook = false;
        let defaultShippingAddress = false;
        let defaultBillingAddress = false;
        this.props.dispatch(setOrderEmail(email));
        this.props.dispatch(setOrderPhone(phone));
        // if cartSchema has shipping address, use it
        if (
          cartSchema
        && cartSchema.shipping_address
        && this.isValidAddress(cartSchema.shipping_address)
        ) {
          matchedAddressInBook = false;
          // if cart shipping address matches any one in addressbook, update state
          if (addresses && addresses.length > 0) {
            index = -1;
            for (let i = 0; i < addresses.length && index < 0; i++) {
              if (this.addressesMatch(cartSchema.shipping_address, addresses[i])) {
                index = i;
              }
              if (addresses[i].default_shipping) {
                defaultShippingAddress = addresses[i];
              }
            }
            if (index > -1) {
            // address in book matches current cart shipping address
              matchedAddressInBook = addresses[index];
              this.props.dispatch(setShipExistID(addresses[index]._id));
              futureStep = 2;
              onCheckoutOption({
                actionField: { step: 3, option: "old_address" }
              });
            }
          }
          // shipping address has no match in addresses book
          if (!matchedAddressInBook) {
            if (loginRecently) {
            // if recently logged in put cartShippingAddress into shippingAddressForm
              console.log("autoCompleteSteps will use as new SHIPPING address form data");
              this.props.dispatch(setShipNew(true));
              onCheckoutOption({
                actionField: { step: 3, option: "new_address" }
              });
              //  to do...
              this.props.dispatch(setShippingAddress(cartSchema.shipping_address));
              this.setAddressFormValues("shipping_address", cartSchema.shipping_address);
              futureStep = 2;
            } else if (defaultShippingAddress) {
            // select existing default shipping address
              this.props.dispatch(setShipExistID(defaultShippingAddress._id));
              onCheckoutOption({
                actionField: { step: 3, option: "old_address" }
              });
              futureStep = 2;
            }
          }
        }
        // if cartSchema has billing address, use it
        if (
          cartSchema
        && cartSchema.billing_address
        && this.isValidAddress(cartSchema.billing_address)
        ) {
        // check if cart billing address is same as shipping address
          if (
            this.addressesMatch(cartSchema.billing_address, cartSchema.shipping_address)
          ) {
            this.props.dispatch(setUseAsBilling());
          } else {
            matchedAddressInBook = false;
            // if cart billing address matches any one in addressbook, update state
            if (addresses && addresses.length > 0) {
              index = -1;
              for (let i = 0; i < addresses.length && index < 0; i++) {
                if (this.addressesMatch(cartSchema.billing_address, addresses[i])) {
                  index = i;
                }
                if (addresses[i].default_billing) {
                  defaultBillingAddress = addresses[i];
                }
              }
              if (index > -1) {
              // address in book matches current cart shipping address
                matchedAddressInBook = addresses[index];
                console.log(
                  "autoCompleteSteps BILLING matchedAddressInBook found!! : ",
                  index
                );
                this.props.dispatch(setBillExistID(addresses[index]._id));
              }
            }
            // billing address has no match in addresses book
            if (!matchedAddressInBook) {
              if (loginRecently) {
              // if recently logged in put cartShippingAddress into shippingAddressForm
                console.log("autoCompleteSteps will use as new BILLING address form data");
                this.props.dispatch(setBillNew(true));
                // //  to do...
                // !!! Shipping and billing address form shares the same redux form
                // !!! Leave billing address form auto complete for later development...
                this.props.dispatch(setBillingAddress(cartSchema.billing_address));
              // this.setAddressFormValues('billing_address', cartSchema.billing_address);
              } else if (defaultBillingAddress) {
              // select existing default shipping address
                this.props.dispatch(setBillExistID(defaultBillingAddress._id));
              }
            }
          }
        }
        this.props.dispatch(setCheckoutStep(futureStep));
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.checkoutStep !== prevProps.checkoutStep) {
      try {
        if (window.document.documentElement.clientWidth < 768) {
          scroller.scrollTo(`ele${this.props.checkoutStep}`, {
            duration: 250,
            delay: 0,
            smooth: true,
            offset: 10
          });
        }
      } catch (err) {
        // err happened.
      }
    }
  }

  getStepsNames() {
    return [
      "Using this email",
      "Using this address",
      "Using this payment",
      "Place order"
    ];
  }

  isValidAddress(address) {
    if (!address) return false;
    const {
      country_id,
      city,
      firstname,
      lastname,
      postcode,
      region_code,
      street,
      telephone
    } = address;
    const isValid = country_id
      && city
      && firstname
      && lastname
      && postcode
      && region_code
      && street
      && street[0]
      && telephone;
    return isValid;
  }

  braintreeDataCollector() {
    console.log("------ braintree data collector ------");
    try {
      window.braintree.client.create(
        {
          authorization: this.props.braintreeClientToken
        },
        (clientErr, clientInstance) => {
          if (clientErr) {
            console.error(" - Error creating client:", clientErr);
            return;
          }
          window.braintree.dataCollector.create(
            {
              client: clientInstance,
              kount: true
            },
            (dataCollectorError, dataCollectorInstance) => {
              if (dataCollectorError) {
                // Handle error in Hosted Fields creation
                console.log("Error in data Collector creation", dataCollectorError);
                return;
              }
              // At this point, you should access the dataCollectorInstance.deviceData value and provide it
              // to your server, e.g. by injecting it into your form as a hidden input.
              if (dataCollectorInstance.deviceData) {
                this.setState({
                  braintree_device_data: dataCollectorInstance.deviceData
                });
                console.log("deviceData", dataCollectorInstance.deviceData);
              }
            }
          );
        }
      );
    } catch (e) {
      console.log("braintreeDataCollector failed", e.message);
    }
  }

  clientTokenFetched() {
    // collect data for fraud order
    this.braintreeDataCollector();
  }

  handleEditStep(step) {
    this.props.dispatch(setCheckoutStep(step));
  }

  handlePlaceOrder() {
    this.setState({ loading_placeOrder: true });
    const {
      priceCalcResult,
      orderEmail,
      orderPhone,
      paymentMethod,
      paymentToken,
      saveNewPayment,
      referID,
      referType,
      customer,
      cartShippingAddress
    } = this.props;
    console.log(
      "--- place order try ---",
      this.props.saveNewShippingAddress,
      this.props.saveNewBillingAddressorderEmail,
      paymentMethod,
      paymentToken
    );
    const {
      gift_card_usage,
      reward_point_usage,
      shipping_method,
      grand_total
    } = priceCalcResult.value;

    const request = {};

    // Set the purchase store type to be online
    request.store_type = "online";

    // 0. item list is not Empty
    if (
      !priceCalcResult
      || !priceCalcResult.value
      || !priceCalcResult.value.products
      || priceCalcResult.value.products.length === 0
    ) {
      this.setState({
        placeOrderErrorMessage: "Cart items no found or empty",
        placeOrderErrorShow: true,
        loading_placeOrder: false
      });
      return;
    }
    // 1. shipping method
    if (!shipping_method) {
      this.setState({
        placeOrderErrorMessage: "Please select one shipping method",
        placeOrderErrorShow: true,
        loading_placeOrder: false
      });
      return;
    }
    request.shipping_method = shipping_method;
    // 2. order email
    if (!orderEmail && !orderPhone) {
      this.setState({
        placeOrderErrorMessage: "Please enter your contact information",
        placeOrderErrorShow: true,
        loading_placeOrder: false
      });
      return;
    }

    if (
      customer.notify_methods.includes("email")
      || !customer.notify_methods
      || customer.notify_methods.length === 0
    ) {
      request.email = orderEmail;
    } else {
      request.phone = orderPhone;
    }

    // 3. shipping_address
    if (!cartShippingAddress) {
      this.setState({
        placeOrderErrorMessage: "Please enter your shipping address",
        placeOrderErrorShow: true,
        loading_placeOrder: false
      });
      return;
    }
    request.address = cartShippingAddress;

    // 4. payment_method
    if (!paymentMethod || !paymentToken) {
      this.setState({
        placeOrderErrorMessage: "Please finish your payment setting",
        placeOrderErrorShow: true,
        loading_placeOrder: false
      });
      return;
    }
    request.payment_method = paymentMethod;
    if (paymentMethod === "braintree_saved") {
      request.token = paymentToken;
    } else {
      request.nonce = paymentToken;
    }
    request.save_payment_method = saveNewPayment;
    request.reward_point_usage = reward_point_usage;
    request.gift_card_usage = gift_card_usage;
    request.braintree_device_data = this.state.braintree_device_data;

    // 5. grand_total
    request.grand_total = grand_total;

    // 6. referer
    if (referType && referID !== "") {
      switch (referType) {
        case "shoppingGuide":
          request.bonus_staff_ids = [referID];
          break;
        default:
          break;
      }
    }

    // 7. tags
    // console.log(this.props.priceCalcResult.value.coupon_code);
    request.coupon_code = this.props.priceCalcResult.value.coupon_code;

    // reset placeOrderResponseErrorMessage
    this.setState({
      placeOrderResponseErrorMessage: "",
      placeOrderErrorShow: true
    });

    this.setState({
      shippingToSave: JSON.parse(JSON.stringify(this.props.cartShippingAddress)),
      billingToSave: JSON.parse(JSON.stringify(this.props.cartBillingAddress)),
      current_priceCalcResult: JSON.parse(JSON.stringify(this.props.priceCalcResult))
    });

    const checkoutOption = { actionField: { step: 5, option: shipping_method } };
    onCheckoutOption(checkoutOption);
    this.props.dispatch(postOrder(request, this.handlePlaceOrderResponse));
  }

  handlePlaceOrderResponse(response, msg) {
    this.setState({ loading_placeOrder: false });
    if (!response) {
      let convertedMsg = "";
      if (msg.toUpperCase().includes("CVV")) {
        convertedMsg = "Please check your CVV.";
      } else if (msg.toUpperCase().includes("AVS")) {
        convertedMsg = "Please check your billing address.";
      } else if (msg.toUpperCase().includes("BRAINTREE")) {
        convertedMsg = "Please check your payment method and billing information.";
      }
      this.setState({
        placeOrderErrorMessage: convertedMsg || msg || "Please try later",
        placeOrderErrorShow: true,
        retryPayment: true
      });
      this.props.dispatch(setCheckoutStep(2));
    } else {
      // history.push('success page')
      this.handleOrderSuccessDataPush(
        response.order_id,
        response.order_success_info.products
      );
      if (this.props.saveNewShippingAddress) {
        this.props.dispatch(saveNewAddress(this.state.shippingToSave));
      }
      if (this.props.saveNewBillingAddress) {
        this.props.dispatch(saveNewAddress(this.state.billingToSave));
      }

      this.props.dispatch(setOrderSuccessData(response));
      console.log("order placed, should push to order placed page", response);
      history.push("/checkout/success");
    }
  }

  handleOrderSuccessDataPush(orderID, products) {
    // Google analytics: construct DL_Data
    if (this.state.current_priceCalcResult) {
      const DL_Data = constructOrderSuccessDataV2(
        orderID,
        this.state.current_priceCalcResult,
        products
      );
      console.log("handleOrderSuccessDataPush", DL_Data);
      PushDL_OrderSuccess(DL_Data);
    }
  }

  render() {
    const { checkoutStep, loadingCart, customer } = this.props;
    const colSettings = {
      left: {
        xs: 12, sm: 7, md: 7, lg: 8
      },
      right: {
        xs: 12, sm: 5, md: 5, lg: 4
      }
    };
    const Titles = [
      "Your Information",
      "Shipping Address",
      "Payment Information",
      "Review and Shipping Method"
    ];
    const modalProps = {
      size: "medium",
      showModal: this.state.placeOrderErrorShow && this.state.placeOrderErrorMessage,
      onHide: () => {
        this.setState({
          placeOrderErrorShow: false,
          placeOrderErrorMessage: ""
        });
      },
      padding: "20px"
    };
    const headerNodes = [0, 1, 2, 3].map((object, index) => {
      return (
        <PanelHeader
          thisStep={index}
          currentStep={checkoutStep}
          editAction={this.handleEditStep}
          hasEmail={
            customer && customer.notify_methods && customer.notify_methods.length > 0
          }
        />
      );
    });
    return (
      <Grid>
        <Helmet
          title={`${Titles[checkoutStep]} - Checkout`}
          script={[
            {
              src: "https://www.paypalobjects.com/api/checkout.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.39.0/js/paypal-checkout.min.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.39.0/js/client.min.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.39.0/js/data-collector.min.js"
            },
            {
              src: "https://js.braintreegateway.com/web/3.39.0/js/hosted-fields.min.js"
            },
            {
              src:
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyBe_KXwdc-mBeWQa8Js4T2htfbmJtzeuek&libraries=places"
            }
          ]}
        />
        <div className={styles.checkout_title}>
          <i className={`ion-ios-locked ${styles["ion-ios-locked"]}`} />
          {" "}
SECURE CHECKOUT
          {" "}
        </div>
        {/* <div>currentStep : {checkoutStep}  Test only: <button onClick={() => { this.props.dispatch(setCheckoutStep(checkoutStep + 1)); }}>next step</button></div> */}

        <Row className="show-grid">
          <Col {...colSettings.left} className={styles.stepPanels}>
            <div className={styles.leftCol}>
              <Element name="ele0" />
              <Panel
                expanded={checkoutStep >= 0}
                style={{ border: checkoutStep > 0 ? "none" : "" }}
              >
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{headerNodes[0]}</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <PanelYourInfo
                      editing={checkoutStep === 0}
                      showSummary={checkoutStep > 0}
                      method={customer ? customer.notify_methods : null}
                    />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

              <Element name="ele1" />
              <Panel
                expanded={checkoutStep >= 1}
                style={{ border: checkoutStep > 1 ? "none" : "" }}
              >
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{headerNodes[1]}</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <PanelShipping
                      editing={checkoutStep === 1}
                      showSummary={checkoutStep > 1}
                    />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

              <Element name="ele2" />
              <Panel
                expanded={checkoutStep >= 2}
                style={{ border: checkoutStep > 2 ? "none" : "" }}
              >
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{headerNodes[2]}</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <PanelPayment
                      editing={checkoutStep === 2}
                      showSummary={checkoutStep > 2}
                      retryPayment={this.state.retryPayment}
                    />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

              <Element name="ele3" />
              <Panel
                expanded={checkoutStep >= 3}
                style={{ border: checkoutStep > 3 ? "none" : "" }}
              >
                <Panel.Heading>
                  <Panel.Title componentClass="h3">{headerNodes[3]}</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body>
                    <PanelReview
                      handlePlaceOrder={this.handlePlaceOrder}
                      editing={checkoutStep === 3}
                      showSummary={checkoutStep > 3}
                    />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </div>
          </Col>
          <Col {...colSettings.right}>
            <OrderSummary btnAction={this.handlePlaceOrder} />
            {loadingCart ? (
              "no product"
            ) : (
              <ItemsListWrapper mode="YOUR ORDER ITEMS" noButtons atCheckoutPage />
            )}
          </Col>
        </Row>
        <CustomModal {...modalProps}>{this.state.placeOrderErrorMessage}</CustomModal>
        {this.state.loading_placeOrder ? <DefaultMask fixed /> : null}
      </Grid>
    );
  }
}
// footer={checkoutStep === 1 ? <PanelFooterButton name={"Using this address"} /> : null}
function mapStateToProps(store) {
  const paymentTokenGetter = {
    braintree_saved: getTokenBraintreeSavedSelected(store),
    braintree_credit_card: getNonceBraintreeCreditCard(store),
    braintree_paypal_account: getNonceBraintreePaypal(store)
  };
  return {
    checkoutStep: getCheckoutStep(store),
    loadingCart: getLoadingCart(store),
    shippingMethod: getCurrentShippingMethod(store),
    saveNewShippingAddress: getSaveNewShippingAddress(store),
    saveNewBillingAddress: getSaveNewBillingAddress(store),
    priceCalcResult: getPriceCalcResult(store),
    orderEmail: getOrderEmail(store),
    orderPhone: getOrderPhone(store),
    cartShippingAddress: getCartShippingAddress(store),
    cartBillingAddress: getCartBillingAddress(store),
    paymentMethod: getPaymentMethod(store),
    paymentToken: paymentTokenGetter[getPaymentMethod(store)],
    customer: getUserData(store),
    saveNewPayment: getSaveNewPayment(store),
    authenticated: getAuthStatus(store),
    referID: getReferID(store),
    referType: getReferType(store)
    // braintreeClientToken: getBraintreeToken(store)
  };
}

export default connect(mapStateToProps)(CheckoutPage);
