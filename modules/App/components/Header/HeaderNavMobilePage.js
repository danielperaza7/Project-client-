/**
 * Created by chris on 3/30/17.
 */

import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import HeaderNavMobileItem from "./HeaderNavMobileItem";
import HeaderNavLangSwitch from "./HeaderNavLangSwitch";
import headerStyles from "./Header.css";
import styles from "./HeaderNavMobilePage.css";
import LinkWrapper from "../../../CMS/components/LinkWrapper/LinkWrapper.js";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";

export default class HeaderNavMobilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: this.props.header.menus[this.props.storeName][0],
      onLang: false
    };
    this.changeNav = this.changeNav.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.storeName !== nextProps.storeName) {
      this.setState({ activeData: nextProps.header.menus[nextProps.storeName][0] });
    }
  }

  changeNav(tabData) {
    this.setState({
      activeData: tabData
    });
    this.props.parentCallbackFalse();
  }

  changeLang() {
    this.setState({
      onLang: true
    });
    this.props.parentCallbackTrue();
  }

  renderLeftNav() {
    const { header, storeName } = this.props;
    return header.menus[storeName].map(
      (tabData, index) => (
        <Button
          key={index}
          onClick={() => this.changeNav(tabData)}
          className={
            JSON.stringify(this.state.activeData) === JSON.stringify(tabData)
              ? tabData.label.toLowerCase() === "sale"
                || tabData.label === "#EvesGoesPink"
                || tabData.label === "3/$59 Bras"
                ? headerStyles["curTab-red"]
                : headerStyles.curTab
              : ""
          }
          style={{
            color:
              tabData.label.toLowerCase() === "sale" || tabData.label === "3/$59 Bras"
                ? "#fd4f57"
                : tabData.label === "#EvesGoesPink"
                  ? "#FF6F9B"
                  : ""
          }}
        >
          {tabData.label}
        </Button>
      )
      // why some menus have no keys? => this.state.activeData.key===tabData.key cannot work
    );
    /* <Button block onClick={ () => this.changeLang()}><i className="ion-earth"></i> Lang</Button> */
  }

  renderRightSidePanel() {
    const content = this.state.activeData.label ? this.state.activeData.label : "normal";
    if (this.props.onLangSwitched) {
      return <HeaderNavLangSwitch className={headerStyles["mobile-nav-data"]} />;
    }
    const linkProps = {
      path: this.state.activeData.key,
      click: this.state.activeData.click,
      url: this.state.activeData.url,
      browserPushCallback: this.props.close
    };
    return (
      <div>
        <LinkWrapper {...linkProps}>
          <div className={styles.channelTitle}>
            {this.state.activeData.label}
            {" "}
Channel
            <span className="pull-right">
              <i className="ion-chevron-right" />
            </span>
          </div>
        </LinkWrapper>
        {content === "NEW ARRIVALS" ? (
          <CMSBlock
            {...{
              cmsid:
                linkProps.path.indexOf("ebe") !== -1
                  ? "NewArrivalsMobile_ebe"
                  : "NewArrivalsMobile_et"
            }}
          />
        ) : null}
        {content === "SALE" ? (
          <CMSBlock
            {...{
              cmsid:
                linkProps.path.indexOf("ebe") !== -1 ? "Sale_Mobile_ebe" : "Sale_Mobile_et"
            }}
          />
        ) : null}
        {content === "BLOG" ? <CMSBlock {...{ cmsid: "Blog_Mobile" }} /> : null}
        {content === "NEW ARRIVALS" ? null : (
          <div style={{ marginTop: content === "SALE" ? "480px" : "" }}>
            <HeaderNavMobileItem
              data={this.state.activeData}
              className={headerStyles["mobile-nav-data"]}
              close={this.props.close}
              saleBlock={content === "SALE"}
            />
          </div>
        )}
      </div>
    );
  }

  render() {
    const ColSettings = {
      left: { xs: 2 },
      right: { xs: 9 }
    };

    if (!this.props.header) {
      return "loading...";
    }

    return (
      <div className={headerStyles["mobile-nav-page"]}>
        <div className={headerStyles["mobile-nav-main"]}>
          <Col {...ColSettings.left} className={headerStyles["mobile-nav-leftbtn"]}>
            {this.renderLeftNav()}
          </Col>
          <Col {...ColSettings.right} className={headerStyles["mobile-nav-item"]}>
            {this.renderRightSidePanel()}
          </Col>
        </div>
      </div>
    );
  }
}
