import React, { Component } from "react";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

import styles from "./Navigation.css";

// this generates a list of LinkWrappers. Shown as a vertical or horizontal navigation bar.

export const Navigation1Info = {
  id: "navigation1",
  description: "navigation, group of LinkWrappers",
  props: {
    options: {
      direction: "horizontal" // vertical
    },
    items: [
      //
      {
        id: "shipping",
        title: "Shipping Policy",
        link: {
          path: "/ebe/category/clothing",
          click: true
        }
      },
      {
        id: "return",
        title: "Return and Exchange",
        link: {
          path: "/ebe/category/clothing",
          click: true
        }
      },
      {
        id: "faqs",
        title: "FAQs",
        link: {
          path: "/ebe/category/clothing",
          click: true
        }
      },
      {
        id: "about-us",
        title: "About us",
        link: {
          path: "/ebe/category/clothing",
          click: true
        }
      }
    ],
    nav_styles: "background_color_change" // 'check_appearance'
  }
};

class Navigation1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  componentDidMount() {
    this.setState({
      selected: window.location.pathname
    });
  }

  render() {
    const { selected } = this.state;
    const { items, options, nav_styles } = this.props;
    console.log("Navigation1", this.props);
    if (!items) {
      return <div> Sorry, we did not find any links. </div>;
    }

    if (!options) {
      const options = {
        direction: "vertical"
      };
    }
    const theme = nav_styles === "check_appearance" ? "navigation1_ca" : "navigation1_bgc";
    const theme_selected = nav_styles === "check_appearance"
      ? "nav-item-selected_ca"
      : "nav-item-selected_bgc";
    return (
      <ul
        className={
          options.direction === "vertical"
            ? styles[theme]
            : `${styles[theme]} ${styles.horizontal}`
        }
      >
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className={item.link.path === selected ? styles[theme_selected] : ""}
            >
              <LinkWrapper {...item.link}>
                <i
                  className="ion-checkmark"
                  style={{
                    fontSize: "16px",
                    marginLeft: "-10px",
                    color: "#ADA082",
                    display:
                      nav_styles === "check_appearance" && item.link.path === selected
                        ? ""
                        : "none"
                  }}
                />
                <span>{item.title}</span>
              </LinkWrapper>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Navigation1;
