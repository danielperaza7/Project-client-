/**
 * Created by warrenchen on 3/22/17.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";

import UserStatus from "./UserStatus";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import styles from "./MainStatusBar.css";

const ColSettings = {
  left: {
    lg: 3, md: 4, sm: 12, xs: 12
  },
  middle: {
    lg: 6, md: 5, sm: 6, xs: 6
  },
  right: {
    lg: 3, md: 3, sm: 3, xs: 3
  }
};
export default class StoreNavtabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { width: 400 };
  }

  componentDidMount() {
    if (typeof window !== "undefined" && this.state.width === 400) {
      this.setState({ width: window.document.documentElement.clientWidth - 30 });
    }
  }

  render() {
    const { collapseHeader, fakeDeviceWidth } = this.props;
    const { width } = this.state;
    // const width= window ? window.document.documentElement.clientWidth - 30 : 375;

    return (
      <div
        className={styles["main-status-bar"]}
        style={collapseHeader && width < 992 ? { marginTop: "-40px" } : null}
      >
        <div className="container">
          <Row>
            <Col {...ColSettings.left}>
              <nav>
                <ul className={styles["store-tab-container"]}>
                  <li
                    className={
                      this.props.storeName === "et"
                        ? styles["store-tab-select-et"]
                        : styles["store-tab-no-select-et"]
                    }
                  >
                    <Link
                      to="/et"
                      className={styles.storeBtn}
                      onClick={() => this.props.changeStore("et")}
                      style={{ height: "40px" }}
                    >
                      {"EVE'S TEMPTATION"}
                    </Link>
                  </li>
                  <li
                    className={
                      this.props.storeName === "ebe"
                        ? styles["store-tab-select"]
                        : styles["store-tab-no-select"]
                    }
                  >
                    <Link
                      to="/ebe"
                      className={styles.storeBtn}
                      onClick={() => this.props.changeStore("ebe")}
                      style={{ height: "40px", marginRight: "1px !important" }}
                    >
                      {"EVE BY EVE'S"}
                    </Link>
                  </li>
                </ul>
              </nav>
            </Col>
            <Col
              {...ColSettings.middle}
              smHidden
              xsHidden
              className={styles["main-promotion-content"]}
            >
              <CMSBlock {...{ cmsid: "header-promotions" }} />
            </Col>
            <Col
              {...ColSettings.right}
              smHidden
              xsHidden
              className={styles["cart-user-container"]}
            >
              <div className={`${styles["app-status"]}`}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#C1B497",
                    fontFamily: "GothamMedium"
                  }}
                >
                  <UserStatus
                    userData={this.props.userData}
                    authenticated={this.props.authenticated}
                  />
                </span>
                <span style={{ margin: "0 0 0 10px" }}>
                  <MediaQuery minWidth={992} values={{ width: fakeDeviceWidth }}>
                    <ShoppingCart
                      productNum={this.props.productNum}
                      productAdded={this.props.productAdded}
                      type="pc"
                    />
                  </MediaQuery>
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
