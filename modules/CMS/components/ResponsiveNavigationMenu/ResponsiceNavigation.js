// global import
import React from "react";
import {
  Grid, MenuItem, ButtonToolbar, Dropdown
} from "react-bootstrap";
import MediaQuery from "react-responsive";

// CSS import
import styles from "./ResponsiveNavigation.css";

export const ResponsiveNavigationInfo = {
  id: "ResponsiveNavigation"
  /**
   * How to use this compoment in CMS

    id: 'ResponsiveNavigation',
    props: {
      menuName: 'Choose a Scenario (21 in total)',
      menus: [
        'Petite',
        'Underarm Bulge',
        'East West',
        'Relaxed',
        'Round',
        'Plus Size',
        'Teardrop',
        'Wireless Bras',
        'T-shirt Bras',
        'Racerback',
        'Lace Unlined Bras',
        'Bra Accessories',
        'Beauty',
        'Panties',
        'Holiday Season',
        'Sleep & Lounge',
        'Activewear',
        'New Arrivals',
        'Swimwear',
        'Clearance',
        'Shapewear',
      ]
    }
  */
};

const ResponsiveNavigation = (props) => {
  const { menus, menuName } = props;
  console.log("ResponsiceNavigation", props);

  const renderMenuItemPC = menus.map((item, index) => {
    if (!item) {
      return null;
    }

    let itemStyle = null;
    if (index !== 0) {
      itemStyle = {
        borderLeft: "solid 1px",
        padding: "0px 20px",
        margin: "3px 0px",
        cursor: "pointer"
      };
    } else {
      itemStyle = {
        padding: "0px 20px",
        margin: "3px 0px",
        cursor: "pointer"
      };
    }

    return (
      <li style={itemStyle}>
        <a href={`#${item}`}>{item}</a>
      </li>
    );
  });

  const renderMenuItemMobile = (title, key) => {
    const renderOptions = menus.map((item, index) => {
      return (
        <MenuItem eventKey={index} href={`#${item}`} style={{ paddingTop: "10px" }}>
          {item}
        </MenuItem>
      );
    });

    const ToggleStyle = {
      width: "100%",
      marginTop: "10px",
      borderRadius: "0px",
      textAlign: "left",
      backgroundImage: "none",
      backgroundColor: "white"
    };

    return (
      <ButtonToolbar>
        <Dropdown style={{ width: "100%" }} key={key}>
          <Dropdown.Toggle style={ToggleStyle}>{title}</Dropdown.Toggle>
          <Dropdown.Menu style={{ width: "100%", height: "300px", overflow: "auto" }}>
            {renderOptions}
          </Dropdown.Menu>
        </Dropdown>
      </ButtonToolbar>
    );
  };

  return (
    <Grid className={styles.navigation}>
      <MediaQuery maxWidth={767}>{renderMenuItemMobile(menuName, "Scenario")}</MediaQuery>
      <MediaQuery minWidth={768}>
        <div className={styles.productListContainer}>
          <ul className={styles["product-list"]}>{renderMenuItemPC}</ul>
        </div>
      </MediaQuery>
    </Grid>
  );
};

export default ResponsiveNavigation;
