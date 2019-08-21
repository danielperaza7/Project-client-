import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Sticky } from "react-sticky";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderMobileSearchBar from "./HeaderMobileSearchBar";
import HeaderNavIcon from "./HeaderNavIcon";
// import HeaderMenuDesktop from "../../../CMS/components/MenuComponents/HeaderMenuDesktop";
import MainStatusBar from "../MainStatusBar/MainStatusBar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import {
  getServerLocation, getCollapseHeaderMenu, getNavOpen, getNewsletter
} from "../../AppReducer";
import { setCollapseHeader, handleNavStatus } from "../../AppActions";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
// Import Style
import styles from "./Header.css";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMobileSearchBar: false,
      showMobileNavIcon: false
    };
    this.changeHeaderStyle = this.changeHeaderStyle.bind(this);
    this.onMobileSearchToggled = this.onMobileSearchToggled.bind(this);
    this.onMobileSearchChanged = this.onMobileSearchChanged.bind(this);
    this.onMobileNavToggled = this.onMobileNavToggled.bind(this);
    this.onMobileNavChanged = this.onMobileNavChanged.bind(this);
    this.changeCollapseHeader = this.changeCollapseHeader.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.changeHeaderStyle);
  }

  onMobileSearchChanged(newState) {
    this.setState({
      showMobileSearchBar: newState
    });
  }

  onMobileSearchToggled() {
    this.setState({
      showMobileSearchBar: true
    });
  }

  onMobileNavToggled() {
    this.setState({
      showMobileNavIcon: true
    });
    this.props.dispatch(handleNavStatus(true));
  }

  onMobileNavChanged(newState) {
    this.setState({
      showMobileNavIcon: newState
    });
  }

  changeCollapseHeader(bool) {
    this.props.dispatch(setCollapseHeader(bool));
  }

  changeHeaderStyle(event) {
    if (event && event.target && event.target.body && event.target.scrollingElement) {
      const scrollTop = event.target.body.scrollTop + event.target.scrollingElement.scrollTop;
      const triggerPoint = 150;
      if (scrollTop >= triggerPoint && !this.props.collapseHeader) {
        this.changeCollapseHeader(true);
      } else if (scrollTop < triggerPoint && this.props.collapseHeader) {
        this.changeCollapseHeader(false);
      }
    }
  }

  renderHeaderLogo() {
    // this.props.header is null, no fetching data from HIDDEN_FIGURE_URL
    const serverLocation = typeof this.props.serverLocation !== "undefined" && this.props.serverLocation.pathname
      ? this.props.serverLocation.pathname
      : "";
    let currentLocation = serverLocation;
    let logo_src = this.props.storeName === "et"
      ? "https://hiddenfigure.evestemptation.com/email/LOGO/ET%20Logo%2020px_H.svg"
      : "https://hiddenfigure.evestemptation.com/email/LOGO/EBE%20Logo%2020px_H.svg";
    const altText = this.props.storeName === "et" ? "Eve's Temptation" : "Eve by Eve's";
    if (this.props.header && this.props.header.logo) {
      logo_src = this.props.header.logo.url;
    }
    if (typeof (window) !== "undefined" && window.location) {
      currentLocation = window.location.pathname;
    }
    const mySet = new Set();
    mySet.add("/");
    mySet.add("/et");
    mySet.add("/ebe");
    if ((mySet.has(serverLocation) && !currentLocation) || mySet.has(currentLocation)) {
      return (
        <h1 className={styles.logo_h1}>
          <Link to={`/${this.props.storeName}`}>
            <img
              className={styles[`logo-${this.props.storeName}`]}
              src={logo_src}
              alt={altText}
              title={altText}
            />
          </Link>
        </h1>
      );
    }

    return (
      <Link to={`/${this.props.storeName}`}>
        <img
          className={styles[`logo-${this.props.storeName}`]}
          src={logo_src}
          alt={altText}
          title={altText}
        />
      </Link>
    );
  }

  renderHeaderBottom() {
    if (!this.props.header || !this.props.header.menus) {
      return null;
    }
    return (
      <div className={styles["nav-tab-row"]}>
        <CMSBlock {...{ cmsid: "HeaderMenuDesktop" }} />
      </div>
    );
  }

  renderHeaderMiddle() {
    const { collapseHeader } = this.props;
    const styleClass = collapseHeader ? styles.collapseHeaderMiddle : styles.headerMiddle;
    return (
      <div key="header-title" className={`${styleClass} text-center`}>
        {this.renderHeaderLogo()}
      </div>
    );
  }

  renderHeaderMobile() {
    if (!this.props.header) {
      return null;
    }
    return (
      <Row className={styles["mobile-nav-row"]}>
        <li className={styles["mobile-nav-row-item"]}>
          <i className="ion-android-menu" onClick={this.onMobileNavToggled} />
        </li>
        <li className={styles["mobile-nav-row-item"]}>
          <i className="ion-android-search" onClick={this.onMobileSearchToggled} />
        </li>
        <li className={styles["mobile-nav-row-item"]}>{this.renderHeaderLogo()}</li>
        <Link to="/account/dashboard/">
          <li className={styles["mobile-nav-row-item"]}>
            <i className="ion-android-person" />
          </li>
        </Link>
        <ShoppingCart
          className={styles["mobile-nav-row-item"]}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
          type="mobile"
        />
      </Row>
    );
  }

  render() {
    const { fakeDeviceWidth, collapseHeaderMenu, showNewsletter } = this.props;
    const boxShadow = "0 0 0 100vh rgba(0, 0, 0, .5)";
    return (
      <Sticky
        topOffset={-80}
        stickyStyle={{ marginTop: 0, zIndex: 1031 }}
        style={{
          height: "10px",
          boxShadow: collapseHeaderMenu || !showNewsletter ? "" : boxShadow
        }}
      >
        <MainStatusBar
          changeStore={this.props.changeStore}
          storeName={this.props.storeName}
          authenticated={this.props.authenticated}
          userData={this.props.userData}
          productNum={this.props.productNum}
          productAdded={this.props.productAdded}
          collapseHeader={this.props.collapseHeader}
          fakeDeviceWidth={fakeDeviceWidth}
        />
        <MediaQuery minWidth={992} values={{ width: fakeDeviceWidth }}>
          <header className={styles["header-container"]} ref="header-container">
            {this.renderHeaderMiddle()}
            {this.renderHeaderBottom()}
          </header>
        </MediaQuery>
        <MediaQuery maxWidth={991} values={{ width: fakeDeviceWidth }}>
          <header className={`${styles["header-mid-row"]}`}>
            <div className="container">
              {this.renderHeaderMobile()}

              {this.state.showMobileNavIcon ? (
                <HeaderNavIcon
                  header={this.props.header}
                  changeStore={storeName => this.props.changeStore(storeName)}
                  callbackParent={(newState) => {
                    this.onMobileNavChanged(newState);
                  }}
                  authenticated={this.props.authenticated}
                  userData={this.props.userData}
                  productNum={this.props.productNum}
                  storeName={this.props.storeName}
                />
              ) : null}

              {this.state.showMobileSearchBar ? (
                <HeaderMobileSearchBar
                  callbackParent={(newState) => {
                    this.onMobileSearchChanged(newState);
                  }}
                />
              ) : null}
            </div>
          </header>
        </MediaQuery>
      </Sticky>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object
};

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

function mapStateToProps(store) {
  return {
    showNewsletter: getNewsletter(store),
    serverLocation: getServerLocation(store),
    collapseHeaderMenu: getCollapseHeaderMenu(store),
    navOpen: getNavOpen(store)
  };
}

export default connect(mapStateToProps)(Header);
