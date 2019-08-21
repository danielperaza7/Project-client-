import React, { Component } from "react";
import _ from "lodash";
import MediaQuery from "react-responsive";
import ColorCategoryCard from "../ColorCategoryCard/ColorCategoryCard";
import styles from "./ColorCategoryList.css";
import DefaultMask from "../../../../components/masks/DefaultMask";
import NoProduct from "./NoProduct";
import { ACTION_FIELD_LIST } from "../../../Analytics/components/GA";

class ColorCategoryList extends Component {
  renderProductList() {
    const { clientMD } = this.props;
    const colorList = {};
    const title_color = {};
    this.props.productList.forEach((product, index) => {
      const colorGroup = _.get(product, "attr.color[0]") ? product.attr.color[0] : null;
      const titleColor = _.get(product, "attr.color_hex")
        ? product.attr.color_hex[0]
        : null;
      if (!colorList[colorGroup]) {
        colorList[colorGroup] = [];
        title_color[colorGroup] = titleColor;
      }
      colorList[colorGroup].push(
        <ColorCategoryCard
          tiers={this.props.tiers}
          groupId={this.props.customer_group_id}
          colorGroup={colorGroup}
          product={product}
          DL={{
            list: ACTION_FIELD_LIST.CATEGORY_PAGE_DEFAULT_CATEGORY,
            position: index + 1
          }}
          clientMD={clientMD}
        />
      );
    });
    const list = [];
    _.forEach(colorList, (value, key) => {
      list.push(
        <div>
          <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.triangle_container}>
              <div
                className={styles.triangle}
                style={{
                  borderColor: `transparent #${title_color[key]} #${
                    title_color[key]
                  } transparent`
                }}
              />
              <div className={styles.colorName} style={{ color: `#${title_color[key]}` }}>
                {key}
              </div>
            </div>
            <div className={styles.itemNum}>
              {`${value.length} ${
                value.length > 1 ? "items" : "item"
              }`}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div
              style={{
                display: "inline-flex",
                marginTop: "35px",
                width: "100%",
                height: "fit-content"
              }}
            >
              <div
                className={styles.triangle_mobile}
                style={{
                  backgroundColor: `#${title_color[key]}`,
                  borderColor: `#${title_color[key]}`
                }}
              />
              <div
                className={styles.colorName_mobile}
                style={{ color: `#${title_color[key]}`, display: "inline-flex" }}
              >
                {key}
                <div
                  className={styles.triangleR_mobile}
                  style={{
                    backgroundColor: `#${title_color[key]}`,
                    borderColor: `#${title_color[key]}`
                  }}
                />
              </div>
            </div>
            <div className={styles.itemNum_mobile}>
              {`${value.length} ${
                value.length > 1 ? "items" : "item"
              }`}
            </div>
          </MediaQuery>
          {value}
        </div>
      );
    });

    return list;
  }

  render() {
    const { productList, fetchingCategoryProducts } = this.props;
    if (fetchingCategoryProducts) {
      return <DefaultMask />;
    }
    if (!productList) {
      return null;
    } if (_.isEmpty(productList) || productList.length < 1) {
      return <NoProduct msg="Sorry, no products found ..." />;
    }
    return (
      <div className={styles.productlistContainer}>
        <ul>{this.renderProductList()}</ul>
      </div>
    );
  }
}

export default ColorCategoryList;
