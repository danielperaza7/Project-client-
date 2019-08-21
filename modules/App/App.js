/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { connect, batch } from "react-redux";
import PropTypes from "prop-types";
// Import Style
import Helmet from "react-helmet";
import { StickyContainer } from "react-sticky";
import styles from "./App.css";

// Import Components
import DevTools from "./components/DevTools";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import TodaysOffers from "./components/TodaysOffers/TodaysOffers";
import MobileHeaderPromotion from "./components/MobileHeaderPromotion/MobileHeaderPromotion";

// import Actions
import {
  changeStore, fetchHeader, saveClientMD
} from "./AppActions";
import { switchLanguage } from "../Intl/IntlActions";

// import Selector
import { getLocale } from "../Intl/IntlReducer";
import {
  getHeader,
  getFooter,
  getStoreName,
  getUserData,
  getProductNum,
  getProductAdded,
  getAllMasksState,
  getShowFooter,
  getShowHeader,
  getCollapseHeader,
  getClientMD,
  getNewHeader
} from "./AppReducer";
import { getAuthStatus, getWaitingForIdentity } from "../Authentication/AuthReducer";
import { PushDL_LoggedInUser } from "../Analytics/components/GA";
// import configure
// import NewsletterWithOutSubscription from '../Customer/components/Newsletter/NewsletterWithOutSubscription'
// import Newsletter from '../Customer/components/Newsletter/Newsletter';
import NewsletterWechat from "../Customer/components/Newsletter/NewsletterWechat";
import PCHeader from "../CheckoutV2/components/PCHeader/PCHeader";

import { ACCOUNT_ROUTES } from "../../config/Customer/customerConfig";

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentWillMount() {
    batch(() => {
      if (this.props.clientMD) {
        this.props.dispatch(saveClientMD(this.props.clientMD));
      }
      if (!this.props.header && this.props.reqCookie) {
        this.props.dispatch(fetchHeader(this.props.reqCookie));
      }

      if (this.props.authenticated && this.props.userData) {
        const { userData } = this.props;
        const { email, group_id } = userData;
        PushDL_LoggedInUser({ email, tier: group_id });
      }
    });
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    batch(() => {
      if (this.state.isMounted && !this.props.userData && nextProps.authenticated && nextProps.userData) {
        const { userData } = nextProps;
        const { email, group_id } = userData;
        PushDL_LoggedInUser({ email, tier: group_id });
      }
    });
  }

  render() {
    let header;

    // initialize header according to whether to show full header or not
    // PCHeader FERV2:

    if (this.props.showHeader) {
      header = !this.props.newHeader ? (
        <Header
          switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
          intl={this.props.intl}
          toggleAddPost={this.toggleAddPostSection}
          changeStore={storeName => this.props.dispatch(changeStore(storeName))}
          header={this.props.header}
          locale={this.props.locale}
          storeName={this.props.storeName}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
          authenticated={this.props.authenticated}
          userData={this.props.userData}
          collapseHeader={this.props.collapseHeader}
          fakeDeviceWidth={this.props.clientMD.fakeDeviceWidth}
        />
      ) : (
        <PCHeader
          fakeDeviceWidth={this.props.clientMD.fakeDeviceWidth}
          storeName={this.props.storeName}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
        />
      );
    } else {
      header = null;
    }

    // construct helmet
    const helmet = (
      <Helmet
        title="Premium Lingerie & Natural Skincare | Eve's Temptation & Eve by Eve's"
        meta={[
          { charset: "utf-8" },
          {
            "http-equiv": "X-UA-Compatible",
            content: "IE=edge"
          },
          {
            name: "viewport",
            content: "width=device-width,initial-scale=1,shrink-to-fit=no"
          },
          {
            name: "msapplication-TileColor",
            content: "#ffffff"
          },
          {
            name: "msapplication-TileImage",
            content: "/ms-icon-144x144.png"
          },
          {
            name: "theme-color",
            content: "#ffffff"
          },
          {
            // linkedIn https://developer.linkedin.com/zh-cn/docs/share-on-linkedin
            property: "og:title",
            content:
              "Eve by Eve’s and Eve’s Temptation - Natural Skin Care, Makeup, and Tools - Premium Lingerie, Sleep & Lounge, Activewear."
          },
          {
            // linkedIn
            // TODO:
            property: "og:image",
            content:
              "https://storage.googleapis.com/evesetus/email/LINKEDIN/linkedin-1.jpg"
          },
          {
            // linkedIn
            property: "og:description",
            content:
              "Discover and shop Eve by Eve’s complete product range of skin care, makeup, tools and women’s trending clothing. Classic French designs with exquisite craftsmanship. Discover a versatile assortment of luxury bras, panties, sleep & lounge, and activewear."
          },
          {
            // linkedIn
            property: "og:url",
            content: "https://www.evestemptation.com/"
          },
          {
            // linkedIn
            property: "og:type",
            content: "website"
          },
          {
            // twitter
            property: "twitter:card",
            content: "summary"
          },
          {
            // twitter
            property: "twitter:url",
            content: "https://www.evestemptation.com/"
          },
          {
            // twitter
            property: "twitter:title",
            content:
              "Eve by Eve’s and Eve’s Temptation - Natural Skin Care, Makeup, and Tools - Premium Lingerie, Sleep & Lounge, Activewear."
          },
          {
            // twitter
            property: "twitter:description",
            content:
              "Discover and shop Eve by Eve’s complete product range of skin care, makeup, tools and women’s trending clothing. Classic French designs with exquisite craftsmanship. Discover a versatile assortment of luxury bras, panties, sleep & lounge, and activewear."
          },
          {
            // twitter
            // TODO:
            property: "twitter:image",
            content:
              "https://storage.googleapis.com/evesetus/email/LINKEDIN/linkedin-1.jpg"
          },
          {
            // pinterest
            property: "pinterest:description",
            content:
              "Discover and shop Eve by Eve’s complete product range of skin care, makeup, tools and women’s trending clothing. Classic French designs with exquisite craftsmanship. Discover a versatile assortment of luxury bras, panties, sleep & lounge, and activewear."
          },
          {
            // pinterest
            // TODO:
            property: "pinterest:image",
            content:
              "https://storage.googleapis.com/evesetus/email/LINKEDIN/linkedin-1.jpg"
          }
        ]}
        link={[
          {
            rel: "stylesheet",
            href:
              "https://hiddenfigure.evestemptation.com/FrontEndDependency/Bootstrap/css/bootstrap.min.css"
          },
          {
            rel: "stylesheet",
            href:
              "https://hiddenfigure.evestemptation.com/FrontEndDependency/Bootstrap/css/bootstrap-theme.min.css"
          },
          {
            rel: "stylesheet",
            href:
              "https://hiddenfigure.evestemptation.com/FrontEndDependency/IonIcons/css/ionicons.min.css"
          },
          {
            rel: "stylesheet",
            href:
              "https://hiddenfigure.evestemptation.com/FrontEndDependency/fontawesome/css/font-awesome.min.css"
          },
          {
            // TODO: local development?
            rel: "stylesheet",
            href: "https://frontendpush.evestemptation.com/dist/client/css/main.css",
            type: "text/css"
          },
          {
            rel: "shortcut icon",
            href: "https://frontendpush.evestemptation.com/dist/client/favicon.ico"
          },
          {
            rel: "apple-touch-icon",
            sizes: "57x57",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-57x57.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "60x60",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-60x60.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "72x72",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-72x72.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "76x76",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-76x76.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "114x114",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-114x114.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-120x120.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "144x144",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-144x144.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "152x152",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-152x152.png"
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href:
              "https://frontendpush.evestemptation.com/dist/client/apple-icon-180x180.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href:
              "https://frontendpush.evestemptation.com/dist/client/android-icon-192x192.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "https://frontendpush.evestemptation.com/dist/client/favicon-32x32.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "https://frontendpush.evestemptation.com/dist/client/favicon-96x96.png"
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "https://frontendpush.evestemptation.com/dist/client/favicon-16x16.png"
          },
          {
            rel: "manifest",
            href: "https://frontendpush.evestemptation.com/dist/client/web-manifest.json"
          }
        ]}
      />
    );

    // <Newsletter/>
    const appBody = (
      <StickyContainer>
        {this.state.isMounted
          && !window.__REDUX_DEVTOOLS_EXTENSION__
          && process.env.NODE_ENV === "development" && <DevTools />}
        <React.Fragment>
          {helmet}
          {header}
          <Error />
          {/* <NewsletterWithOutSubscription/> */}
          <NewsletterWechat />
          <main
            className={styles.container}
            style={this.props.showHeader ? null : { marginTop: "15px" }}
          >
            <MobileHeaderPromotion />
            {this.props.children}
          </main>
          <TodaysOffers
            notShowPage={["/cart", "/checkout", "/account", ...ACCOUNT_ROUTES]}
          />
          {this.props.showFooter ? <Footer footer={this.props.footer} /> : null}
        </React.Fragment>
      </StickyContainer>
    );

    return appBody;
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

function mapStateToProps(store) {
  return {
    intl: store.intl,
    reqCookie: store.app.reqCookie,
    footer: getFooter(store),
    header: getHeader(store),
    storeName: getStoreName(store),
    locale: getLocale(store),
    authenticated: getAuthStatus(store),
    userData: getUserData(store),
    productNum: getProductNum(store),
    productAdded: getProductAdded(store),
    showHeader: getShowHeader(store),
    showFooter: getShowFooter(store),
    masks: getAllMasksState(store),
    waitingForIdentity: getWaitingForIdentity(store),
    collapseHeader: getCollapseHeader(store),
    clientMD: getClientMD(store),
    newHeader: getNewHeader(store)
  };
}

export default connect(mapStateToProps)(App);
