import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "./searchBarAnimated";
import styles from "./HeaderMenuDesktop.css";

function AtagWrapper(props) {
  return <a href={props.url}>{props.children}</a>;
}

class HeaderMenuDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedIndex: null,
      prevIndex: null,
      overMenuBar: false,
      overMenuPanel: false,
      overSearch: false,
      openedByTouch: false
    };
    this.renderPanelMenuItem = this.renderPanelMenuItem.bind(this);
    this.resetOverStatus = this.resetOverStatus.bind(this);
    this.handleTouchMenuBar = this.handleTouchMenuBar.bind(this);
    this.handleClickKeyLink = this.handleClickKeyLink.bind(this);
  }

  resetOverStatus() {
    this.setState({
      openedIndex: null,
      overMenuBar: false,
      overMenuPanel: false,
      overSearch: false,
      openedByTouch: false
    });
  }

  handleClickKeyLink(event, index) {
    if (this.state.openedByTouch) {
      if (!this.state.overMenuBar || this.state.prevIndex !== index) {
        event.preventDefault();
        this.setState({
          overMenuBar: true,
          prevIndex: index,
          openedIndex: index
        });
      }
    }
  }

  handleTouchMenuBar() {
    this.setState({
      openedByTouch: true
    });
  }

  renderMenuBar() {
    const menu = this.props.menu;

    const inMenu = (this.state.overMenuPanel || this.state.overMenuBar) && !this.state.overSearch;
    const menuBar = menu.map((tab, index) => {
      let tabItem;
      if (!tab.label) return null;
      const red = !!(tab.label.toUpperCase() === "SALE" || tab.label === "3/$59 Bras");
      const pink = tab.label === "#EvesGoesPink";
      const itemInner = (
        <li
          className={
            styles["menu-btn"]
            + (tab.click ? "" : ` ${styles["no-link"]}`)
            + (index === this.state.openedIndex && inMenu
              ? ` ${styles["current-menu-btn"]}`
              : "")
          }
          key={index}
          onMouseEnter={() => {
            this.setState({ openedIndex: index, prevIndex: this.state.openedIndex });
          }}
          onMouseLeave={() => {}}
          onTouchStart={this.handleTouchMenuBar}
          style={{
            color: red ? "#fd4f57" : pink ? "#FF6F9B" : "",
            fontFamily: red || pink ? "GothamMedium !important" : ""
          }}
          onClick={this.resetOverStatus}
        >
          <span>{tab.label}</span>
        </li>
      );
      if (tab.click) {
        if (tab.key) {
          tabItem = (
            <Link
              to={tab.key[0] === "/" ? tab.key : `/${tab.key}`}
              key={index}
              onClick={e => this.handleClickKeyLink(e, index)}
            >
              {itemInner}
            </Link>
          );
        } else if (tab.url) {
          tabItem = (
            <a href={tab.url} target="_blank" key={index}>
              {itemInner}
            </a>
          );
        } else {
          tabItem = itemInner;
        }
      } else {
        tabItem = itemInner;
      }
      return tabItem;
    });
    return menuBar;
  }

  renderPanelMenuItem(tab, lev) {
    const style = [styles.SecondLevelMenu, styles.otherLevelMenu];
    let menuItem;
    if (tab.click && tab.key) {
      menuItem = (
        <div key={tab.label}>
          <Link
            to={tab.key[0] === "/" ? tab.key : `/${tab.key}`}
            onClick={this.resetOverStatus}
          >
            <li
              className={style[lev] + (tab.click ? "" : ` ${styles["no-link"]}`)}
              key={tab.label}
            >
              <span>{tab.label}</span>
            </li>
          </Link>
          <div>
            {tab.sub
              ? tab.sub.map(tabItem => this.renderPanelMenuItem(tabItem, 1))
              : null}
          </div>
        </div>
      );
    } else if (tab.click && tab.url && !tab.key) {
      return (
        <AtagWrapper key={tab.label} url={tab.url}>
          {menuItem}
        </AtagWrapper>
      );
    } else {
      menuItem = (
        <div key={tab.label}>
          <li
            className={style[lev] + (tab.click ? "" : ` ${styles["no-link"]}`)}
            key={tab.label}
          >
            <span>{tab.label}</span>
          </li>
          <div>
            {tab.sub
              ? tab.sub.map(tabItem => this.renderPanelMenuItem(tabItem, 1))
              : null}
          </div>
        </div>
      );
    }
    return menuItem;
  }

  renderMenuPanel() {
    const menu = this.props.menu;

    return menu.map((tab, index) => {
      console.log("00000", menu);
      let submenus = null;
      if (tab.sub) {
        submenus = tab.sub.map((item) => {
          const submemuTitle = this.renderPanelMenuItem(item, 0);
          return (
            <div className={styles["submenu-col"]} key={item.label}>
              <div>{submemuTitle}</div>
            </div>
          );
        });
      }
      return (
        <div
          className={
            styles["submenu-wrapper"]
            + (this.state.openedIndex === index ? "" : " hidden")
          }
          key={tab.label}
        >
          {submenus}
        </div>
      );
    });
  }

  renderPanalClose() {
    if (this.state.openedByTouch) {
      return (
        <div>
          <span className={styles.closePanelBtn} onClick={this.resetOverStatus}>
            <i className="ion-ios-close-empty" />
          </span>
        </div>
      );
    }
    return null;
  }

  render() {
    const menu = this.props.menu;

    if (!menu) {
      return null;
    }
    return (
      <div style={{ marginTop: "15px" }}>
        <div className="text-center">
          <ButtonGroup
            className={styles["menu-bar"]}
            onMouseEnter={() => {
              this.setState({ overMenuBar: true });
            }}
            onMouseLeave={() => {
              this.setState({ overMenuBar: false });
            }}
          >
            {this.renderMenuBar()}
            <li
              className={`${styles["menu-btn"]} ${styles["search-btn"]}`}
              onMouseEnter={() => {
                this.setState({ overSearch: true });
              }}
              onMouseLeave={() => {
                this.setState({ overSearch: false });
              }}
            >
              <SearchBar />
            </li>
          </ButtonGroup>
        </div>
        <div
          className={
            `${((this.state.overMenuPanel || this.state.overMenuBar)
            && !this.state.overSearch
            && this.state.openedIndex !== null
            && menu[this.state.openedIndex]
            && menu[this.state.openedIndex].sub
              ? "show "
              : "hidden ")
            + styles["menu-panel"]
            } text-center container `
          }
          onMouseEnter={() => {
            this.setState({ overMenuPanel: true });
          }}
          onMouseLeave={() => {
            this.setState({ overMenuPanel: false });
            this.setState({ openedIndex: null });
          }}
        >
          {this.renderPanalClose()}
          {this.renderMenuPanel()}
        </div>
      </div>
    );
  }
}

export default HeaderMenuDesktop;
