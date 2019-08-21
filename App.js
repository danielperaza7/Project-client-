/* eslint-disable react/destructuring-assignment */
/**
 * Root Component
 */
import React from "react";
import { Provider, connect, batch } from "react-redux";
import { Router } from "react-router-dom";
import PropTypes from "prop-types";
import {
  InitializeGA,
  logPageView,
  InitializeETEBEData,
  PushDL_allViewedProducts,
  PushDL_ViewPromotion,
  PushDL_FilterData
} from "./modules/Analytics/components/GA";
// eslint-disable-next-line import/no-named-as-default
import IntlWrapper from "./modules/Intl/IntlWrapper";
import {
  clearCartJustAdded,
  fetchCustomer,
  setNewHeader,
  collapseHeaderMenu,
  handleNavStatus,
  checkWechatPopUpWindow
} from "./modules/App/AppActions";
import { getIdentityResponse, getUserByToken } from "./modules/Authentication/AuthActions";
import { getAuthStatus } from "./modules/Authentication/AuthReducer";
import { fetchCart } from "./modules/CheckoutV2/CheckoutActions";
import AppContainer from "./modules/App/App";

// Import Routes
import RoutesList from "./routes";
import history from "./history";

InitializeGA();
InitializeETEBEData();

class App extends React.PureComponent {
  componentWillMount() {
    this._history = history.listen(() => this.onLoad(history.location));
    if (typeof window !== "undefined") {
      batch(() => {
        if (this.props.token) {
          this.props.dispatch(getUserByToken(this.props.token));
        }
        this.props.dispatch(getIdentityResponse());
        this.props.dispatch(checkWechatPopUpWindow(this.props.cookie));
      });
      this.onLoad(history.location);
    }
  }

  componentWillUnmount() {
    this._history();
  }

  // eslint-disable-next-line consistent-return
  onLoad = location => batch(() => {
    const { props } = this;
    // 0.
    const pathName = location.pathname;

    console.log('OnLoad:');
    // disappear add to bag dropdown:
    props.dispatch(clearCartJustAdded());
    props.dispatch(collapseHeaderMenu(true));
    props.dispatch(handleNavStatus(false));

    // 1. GA & ReCaptcha:
    logPageView();
    PushDL_allViewedProducts();
    PushDL_ViewPromotion();
    if (!pathName.includes("/category") && !pathName.includes("/semi-annual-clearance")) {
      PushDL_FilterData();
    }

    // 2. fetch customer object or cart using token
    // in fetch customer and fetch cart, will check token from 'yorozuya_ct', yorozuya admin login as customer
    if (!location.query) {
      // eslint-disable-next-line no-param-reassign
      location.query = { yorozuya_ct: this.props.token };
    }

    if (!location.query.yorozuya_ct) {
      return false;
    }

    const yorozuyaToken = location.query.yorozuya_ct;
    switch (pathName) {
      case "/account":
        props.dispatch(fetchCustomer(false, true, yorozuyaToken));
        break;
      case "/cart":
        props.dispatch(fetchCart(yorozuyaToken));
        break;
      case "/checkout":
        props.dispatch(fetchCart(yorozuyaToken, true));
        break;
      default: {
        if (
          pathName.indexOf("/account/") > -1
          && pathName.indexOf("/account/password/") < 0
        ) {
          props.dispatch(fetchCustomer(false, true, yorozuyaToken));
        } else {
          props.dispatch(fetchCustomer(false, false, yorozuyaToken));
        }
        break;
      }
    }
    if (pathName.indexOf("checkout") !== -1) props.dispatch(setNewHeader(true));
    else props.dispatch(setNewHeader(false));

    if (
      pathName.indexOf("return") !== -1
      && pathName.indexOf("guest") === -1
      && pathName.indexOf("page") === -1
    ) {
      props.dispatch(fetchCustomer(false, true, yorozuyaToken, "returnPage"));
    }

    // 3. record location history
    let newPath = "";
    try {
      newPath = window.location.href;
    } catch (err) {
      console.log(err);
    }
    ETEBEData.prevPath = newPath;

    // 4. disappear add to bag dropdown:
    props.dispatch(clearCartJustAdded());

    // 5. Scroll to top:
    if (!location.hash || location.hash.indexOf("#") < 0) {
      window.scrollTo(0, 0);
    }
  })

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    const {
      token,
      store,
      dispatch,
      router: RouterComponent = Router,
      routerProps = {},
      ...appProps
    } = this.props;

    return (
      <Provider store={store}>
        <IntlWrapper>
          <RouterComponent history={history} {...routerProps}>
            <AppContainer {...appProps}><RoutesList token={token} /></AppContainer>
          </RouterComponent>
        </IntlWrapper>
      </Provider>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired
};

export default connect(store => ({ authenticated: getAuthStatus(store) }))(App);
