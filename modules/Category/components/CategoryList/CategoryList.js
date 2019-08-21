/*
    Created by YZ 20170327
    This file takes care of products listing for cetain given category
*/
import React, { Component } from "react";
import _ from "lodash";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./CategoryList.css";
import DefaultMask from "../../../../components/masks/DefaultMask";
import NoProduct from "./NoProduct";
import { ACTION_FIELD_LIST } from "../../../Analytics/components/GA";

class CategoryList extends Component {
  renderProductList() {
    return this.props.productList.map((product, index) => {
      return (
        <li key={product.list_id} className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
          <ProductCard
            tiers={this.props.tiers}
            groupId={this.props.customer_group_id}
            product={product}
            DL={{
              list: ACTION_FIELD_LIST.CATEGORY_PAGE_DEFAULT_CATEGORY,
              position: index + 1
            }}
            showDiscountLabel={this.props.showDiscountLabel}
          />
        </li>
      );
    });
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
        <ul className={styles["product-list"]}>{this.renderProductList()}</ul>
      </div>
    );
  }
}

export default CategoryList;
