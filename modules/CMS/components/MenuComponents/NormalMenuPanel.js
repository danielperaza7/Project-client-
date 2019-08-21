import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./NormalMenuPanel.css";
import history from "../../../../history";

class NormalMenuPanel extends Component {
  renderPanelMenuItem(tab, lev, hot_rows, new_rows) {
    const { prop } = this.props;
    const break_list = [];
    if (prop.col_break && tab.sub && tab.sub.length > prop.col_break) {
      const col_num = Math.round(tab.sub.length / prop.col_break);
      for (let i = 0; i < col_num; i++) {
        const item_list = [];
        for (
          let j = 0;
          j < prop.col_break && i * prop.col_break + j < tab.sub.length;
          j++
        ) {
          item_list.push(
            this.renderPanelMenuItem(
              tab.sub[i * prop.col_break + j],
              1,
              hot_rows,
              new_rows
            )
          );
        }
        break_list.push(
          <div key={i} className={styles.break_list}>
            {item_list}
          </div>
        );
      }
    }
    const style = [styles.SecondLevelMenu, styles.otherLevelMenu];
    let menuItem;
    if (tab.click && tab.key) {
      let marginLeft = hot_rows && hot_rows.includes(tab.label) ? -25 : 0;
      marginLeft = new_rows && new_rows.includes(tab.label) ? marginLeft - 25 : marginLeft;
      menuItem = (
        <div key={tab.label}>
          <Link
            to={tab.key[0] === "/" ? tab.key : `/${tab.key}`}
            onClick={this.resetOverStatus}
          >
            <li
              className={style[lev] + (tab.click ? "" : ` ${styles["no-link"]}`)}
              key={tab.label}
              style={{ marginLeft: `${marginLeft}px` }}
            >
              {hot_rows && hot_rows.includes(tab.label) ? (
                <div className={styles.hotOrNew}>HOT</div>
              ) : null}
              {new_rows && new_rows.includes(tab.label) ? (
                <div className={styles.hotOrNew}>NEW</div>
              ) : null}
              <span>{tab.label}</span>
            </li>
          </Link>
          {tab.sub && break_list.length === 0 ? (
            tab.sub.map((tabItem) => {
              return this.renderPanelMenuItem(tabItem, 1, hot_rows, new_rows);
            })
          ) : tab.sub && break_list.length !== 0 ? (
            <div>{break_list}</div>
          ) : null}
        </div>
      );
    } else if (tab.click && tab.url && !tab.key) {
      return (
        <AtagWrapper key={tab.label} url={tab.url}>
          {menuItem}
        </AtagWrapper>
      );
    } else {
      let marginLeft = hot_rows && hot_rows.includes(tab.label) ? -25 : 0;
      marginLeft = new_rows && new_rows.includes(tab.label) ? marginLeft - 25 : marginLeft;
      menuItem = (
        <div key={tab.label}>
          <li
            className={style[lev] + (tab.click ? "" : ` ${styles["no-link"]}`)}
            key={tab.label}
            style={{ marginLeft: `${marginLeft}px` }}
          >
            {hot_rows && hot_rows.includes(tab.label) ? (
              <div className={styles.hotOrNew}>HOT</div>
            ) : null}
            {new_rows && new_rows.includes(tab.label) ? (
              <div className={styles.hotOrNew}>NEW</div>
            ) : null}
            <span>{tab.label}</span>
          </li>
          <div>
            {tab.sub && break_list.length === 0 ? (
              tab.sub.map((tabItem) => {
                return this.renderPanelMenuItem(tabItem, 1, hot_rows, new_rows);
              })
            ) : tab.sub && break_list.length !== 0 ? (
              <div>{break_list}</div>
            ) : null}
          </div>
        </div>
      );
    }
    return menuItem;
  }

  render() {
    const { prop, tab } = this.props;
    if (!tab || !tab.sub) return null;

    let middle = false;
    let right = false;
    const hot = prop.hot_rows;
    const new_items = prop.new_rows;
    const submenus = tab.sub.map((item, ind) => {
      const submemuTitle = this.renderPanelMenuItem(item, 0, hot, new_items);
      if (
        prop.cols_theme === "center"
        && prop.media
        && tab.sub.length <= 2
        && ind === tab.sub.length - 1
      ) {
        middle = true;
      }

      if (
        prop.cols_theme === "right"
        && prop.media
        && tab.sub.length <= 2
        && ind === tab.sub.length - 1
      ) {
        right = true;
      }
      const style = {
        width: "100%",
        display: "flex",
        justifyContent: "space-around"
      };
      const submenu_col_style = {};
      const highlight_bar = prop.highlight_col === ind;
      style.background = highlight_bar ? "#F7F5F0" : "";
      style.padding = highlight_bar ? "16px 32px" : "0px";
      style.marginTop = highlight_bar ? "-16px" : "0px";
      style.marginRight = highlight_bar ? "10px" : "0px";
      submenu_col_style.margin = (!prop.cols_theme || prop.cols_theme === "none") && tab.sub.length === 1
        ? "auto"
        : "";
      submenu_col_style.width = prop.cols_theme && prop.cols_theme !== "none" && tab.sub.length === 1
        ? "100%"
        : "";
      // the format of insert a piece of Youtube video: https://www.youtube.com/embed/VIDEO_ID
      return (
        <div className={styles["submenu-col"]} key={item.label} style={submenu_col_style}>
          {middle ? (
            <div
              className={styles["submenu-img"]}
              onClick={() => {
                if (prop.media_linkTo) history.push(prop.media_linkTo);
              }}
            >
              {prop.media === "image" ? (
                <img
                  src={prop.image_url ? prop.image_url.md : null}
                  style={{ maxWidth: "400px" }}
                  alt=""
                />
              ) : (
                <iframe
                  width={400}
                  height={225}
                  src={prop.video_url ? prop.video_url.md : null}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          ) : null}
          <div style={style}>{submemuTitle}</div>
          {right && prop.media ? (
            <div
              className={styles["submenu-img-right"]}
              onClick={() => {
                if (prop.media_linkTo) history.push(prop.media_linkTo);
              }}
            >
              {prop.media === "image" ? (
                <img src={prop.image_url ? prop.image_url.md : null} alt="" />
              ) : (
                <iframe
                  width={400}
                  height={225}
                  src={prop.video_url ? prop.video_url.md : null}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          ) : null}
        </div>
      );
    });

    return (
      <div
        className={styles["submenu-list-normal"]}
        style={{
          display: "flex",
          justifyContent:
            tab.sub.length <= 2 && !prop.media ? "space-around" : "space-between"
        }}
      >
        {submenus}
      </div>
    );
  }
}

export default NormalMenuPanel;
