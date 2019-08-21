import React, { Component } from "react";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import styles from "./Navigation.css";
// this generates a list of LinkWrappers. Shown as a vertical or horizontal navigation bar.

export const NavigationInfo = {
  id: "navigation",
  description: "navigation, group of LinkWrappers",
  props: {
    options: {
      direction: "horizontal" // vertical
    },
    items1: [
      {
        id: "shipping",
        title: "Shipping Policy",
        link: {
          path: "/page/shipping",
          click: true
        }
      },
      {
        id: "return",
        title: "Return and Exchange",
        link: {
          path: "/page/return",
          click: true
        }
      },
      {
        id: "giftcard",
        title: "Gift Card",
        link: {
          path: "/page/giftcard",
          click: true
        }
      },
      {
        id: "faqs",
        title: "FAQs",
        link: {
          path: "/page/faqs",
          click: true
        }
      }
    ],
    items2: [
      {
        id: "about-us",
        title: "About us",
        link: {
          path: "/page/about-us",
          click: true
        }
      },
      {
        id: "blog",
        title: "Blog",
        link: {
          path: "/ebe/category/clothing",
          click: true
        }
      },
      {
        id: "career",
        title: "Careers",
        link: {
          path: "/page/career",
          click: true
        }
      },
      {
        id: "location",
        title: "Store Locations",
        link: {
          path: "/page/store-location",
          click: true
        }
      },
      {
        id: "term",
        title: "Terms & Conditions",
        link: {
          path: "/page/terms-and-conditions",
          click: true
        }
      },
      {
        id: "policy",
        title: "Privacy Policy",
        link: {
          path: "/page/privacy-policy",
          click: true
        }
      }
    ],
    nav_styles: "background_color_change" // "check_appearance"
  }
};

class Navigation extends Component {
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
    const {
      items1, items2, options, nav_styles
    } = this.props;
    // console.log('Navigation', this.props);
    if (!items1) {
      return <div> Sorry, we did not find any links. </div>;
    }

    if (!options) {
      const options = {
        direction: "vertical"
      };
    }
    const theme = nav_styles === "check_appearance" ? "navigation_ca" : "navigation_bgc";
    const theme_selected = nav_styles === "check_appearance"
      ? "nav-item-selected_ca"
      : "nav-item-selected_bgc";
    return (
      <div>
        <ul
          className={
            options.direction === "vertical"
              ? styles[theme]
              : `${styles[theme]} ${styles.horizontal}`
          }
        >
          <li className={styles.subtitle}>SERVICE</li>
          {items1.map((item) => {
            // return <li key={item.id} className={item.link.path == selected ? styles[theme_selected] : ''}><LinkWrapper {...item.link}><i className="ion-checkmark" style={{ fontSize: '16px', marginLeft: '-10px', color: '#ADA082', display: nav_styles == 'check_appearance' && item.link.path == selected ? '' : 'none' }} /><span>{item.title}</span></LinkWrapper></li>;
            return (
              <li
                key={item.id}
                className={item.link.path === selected ? styles[theme_selected] : ""}
              >
                <LinkWrapper {...item.link}>
                  <span>{item.title}</span>
                </LinkWrapper>
              </li>
            );
          })}
        </ul>
        <ul
          className={
            options.direction === "vertical"
              ? styles[theme]
              : `${styles[theme]} ${styles.horizontal}`
          }
        >
          <hr size="30" style={{ margin: "0px", color: "#9B9B9B" }} />
          <li className={styles.subtitle} style={{ marginTop: "21px" }}>
            ABOUT
          </li>
          {items2.map((item) => {
            // return <li key={item.id} className={item.link.path == selected ? styles[theme_selected] : ''}><LinkWrapper {...item.link}><i className="ion-checkmark" style={{ fontSize: '16px', marginLeft: '-10px', color: '#ADA082', display: nav_styles == 'check_appearance' && item.link.path == selected ? '' : 'none' }} /><span>{item.title}</span></LinkWrapper></li>;
            return (
              <li
                key={item.id}
                className={item.link.path === selected ? styles[theme_selected] : ""}
              >
                <LinkWrapper {...item.link}>
                  <span>{item.title}</span>
                </LinkWrapper>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Navigation;
