/**
 * Created by chris on 3/30/17.
 */

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import headerStyles from "./Header.css";
import LinkWrapper from "../../../CMS/components/LinkWrapper/LinkWrapper.js";

import styles from "./HeaderNavMobilePage.css";

export default class HeaderNavMobileItem extends Component {
  renderSub(data) {
    const { saleBlock } = this.props;
    const submenuColSetting = {
      lg: 2,
      md: 2,
      sm: 3,
      xs: 4
    };
    const submenus = data.sub
      ? data.sub.map((submenu) => {
        const submenuTitleLinkprops = {
          path: submenu.key,
          click: submenu.click,
          url: submenu.url,
          browserPushCallback: this.props.close
        };
        if (!submenu.label) {
          console.log("ERROR submenu has no label", submenu);
          return null;
        }
        return (
          <div key={submenu.label.replace(/\s+/g, "-").toLowerCase()}>
            <LinkWrapper {...submenuTitleLinkprops}>
              <div className={styles.submenuTitle}>{submenu.label}</div>
            </LinkWrapper>
            <div className={styles.submenuContent}>
              {submenu.sub
                ? submenu.sub.map((item) => {
                  const linkProps = {
                    path: item.key,
                    click: item.click,
                    url: item.url,
                    browserPushCallback: this.props.close
                  };
                  const imageUrl = item.image && item.image.url
                    ? item.image.url
                    : "http://placehold.it/148x148";
                  const imageAlt = item.image && item.image.title ? item.image.title : "";
                  return (
                    <Col
                      key={item.label.replace(/\s+/g, "-").toLowerCase()}
                      {...(saleBlock ? null : submenuColSetting)}
                      className={headerStyles["header-nav-item"]}
                      style={{
                        paddingLeft: "0px",
                        marginLeft: saleBlock ? "20px" : ""
                      }}
                    >
                      <LinkWrapper {...linkProps}>
                        {saleBlock ? null : (
                          <img
                            className={styles.mobileMenuItemImage}
                            src={imageUrl}
                            alt={imageAlt}
                          />
                        )}
                        {item.label}
                      </LinkWrapper>
                    </Col>
                  );
                })
                : null}
            </div>
          </div>
        );
      })
      : null;
    return <div>{submenus}</div>;
  }

  render() {
    const data = this.props.data;
    return (
      <div>
        <Row>
          <Col xsOffset={2} xs={8} style={{ textAlign: "center" }}>
            {data.name}
          </Col>
        </Row>
        {this.renderSub(data)}
      </div>
    );
  }
}
