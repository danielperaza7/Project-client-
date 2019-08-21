// global import
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import ProductCard from "../../../Category/components/ProductCard/ProductCard";
import styles from "./ProductsGrid1.css";

export const ProductsGrid1Info = {
  id: "products_grid_1"
};

/**
 *
 *This is used to render product for Eva CMS Page checkout V2
 * @class ProductsGrid1
 * @extends {Component}
 */
class ProductsGrid1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGridCollpase: true
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const curCollapseState = this.state.productGridCollpase;
    this.setState({ productGridCollpase: !curCollapseState });
  }

  render() {
    const { products, membershipPriceDisabled, tags } = this.props;

    if (!products) {
      return <div>No products data!!!</div>;
    }

    const renderProducts = products.map((product, index) => {
      const tiers = {
        0: "guest",
        1: "VIP",
        2: "VVIP"
      };

      const tagVals = [];
      if (tags && tags.hasOwnProperty(product.list_id)) {
        tagVals.push(tags[product.list_id]);
      }

      if (product && product.list_id && window.innerWidth > 768) {
        return (
          <li
            key={product.list_id}
            className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-6"
          >
            <ProductCard
              tiers={tiers}
              product={product}
              DL={{
                list: `CMS - ProductsGallery1${
                  this.props.actionField ? ` - ${this.props.actionField}` : " - Undefined"
                }`,
                position: index + 1
              }}
              membershipPriceDisabled={membershipPriceDisabled}
              tagVals={tagVals}
            />
          </li>
        );
      } if (product && product.list_id && index < 6) {
        return (
          <li
            key={product.list_id}
            className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-6"
          >
            <ProductCard
              tiers={tiers}
              product={product}
              DL={{
                list: `CMS - ProductsGallery1${
                  this.props.actionField ? ` - ${this.props.actionField}` : " - Undefined"
                }`,
                position: index + 1
              }}
              membershipPriceDisabled={membershipPriceDisabled}
              tagVals={tagVals}
            />
          </li>
        );
      }

      return null;
    });

    const collapseProps = {
      height: this.state.productGridCollpase ? "680px" : "auto",
      width: "100%",
      marginBottom: "48px",
      overflow: this.state.productGridCollpase ? "hidden" : "visible"
    };

    const collapseButtonProps = {
      display: this.state.productGridCollpase ? "block" : "none",
      borderBottom: "1px solid",
      width: "100%",
      textAlign: "center",
      paddingTop: "10px",
      background: "linear-gradient(rgba(255, 255, 255, 0), white 50%, white)",
      position: "absolute",
      top: "640px",
      left: "0px",
      borderColor: "#a3854738",
      color: "#A38547",
      fontFamily: "GothamMedium",
      fontSize: "14px"
    };

    return (
      <ul className={styles["product-list"]}>
        <MediaQuery maxWidth={767}>
          <div style={{ ...collapseProps, display: "flex", flexWrap: "wrap" }}>
            {renderProducts}
          </div>
          <div
            id="collapseButton"
            style={{ ...collapseButtonProps }}
            onClick={this.onClick}
          >
            <div>SEE MORE</div>
            <i className={`ion-chevron-down ${styles["select-arrow-icon"]}`} />
          </div>
        </MediaQuery>
        <MediaQuery minWidth={768}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>{renderProducts}</div>
        </MediaQuery>
      </ul>
    );
  }
}

export default ProductsGrid1;
