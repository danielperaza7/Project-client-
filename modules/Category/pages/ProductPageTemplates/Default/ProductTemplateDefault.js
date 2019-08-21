/*
  Default product layout

*/

import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { connect, batch } from "react-redux";
import { PropTypes } from "prop-types";
import _ from "lodash";
import BreadcrumbDefault from "../../../components/Breadcrumb/default/BreadcrumbDefault";
import ProductBoard from "../../../components/Product/ProductBoard/ProductBoard";
import ProductRowCardResponsiveBasics from "../../../components/Product/ProductRowCardResponsiveBasics/ProductRowCardResponsiveBasics";
import GoBack from "../../../../App/components/CustomHistory/GoBack";
import VividDetail from "../../../components/VividDetail/VividDetail";
import CustomerReviews from "../../../components/CustomerReviews/CustomerReviews";
import styles from "./ProductTemplateDefault.css";
import {
  fetchCompleteLookProducts,
  fetchCompleteLookProductsReviewData,
  fetchAlsolikeProducts,
  setFetchingCompleteLookProducts,
  setFetchingAlsolikeProducts,
  fetchCustomerReviews
} from "../../../CategoryActions";
import { ACTION_FIELD_LIST } from "../../../../Analytics/components/GA";
import KitDetail from "../../../components/KitDetail/KitDetail";

class ProductLayoutDefault extends React.PureComponent {
  componentDidMount() {
    if (!window) {
      return; // do not render this part while SSR
    }
    batch(() => {
      this.fetchRelatedProducts();
      if (this.props.fetchingCompleteTheLookProducts || !this.props.completeLookProducts) {
        return;
      }
      const display_id_list = [];
      const products = this.props.completeLookProducts;
      products.forEach((product) => {
        display_id_list.push(product.display_id);
      });
      this.props.dispatch(fetchCompleteLookProductsReviewData(display_id_list));
    });
  }

  componentDidUpdate(prevProps) {
    batch(() => {
      if (this.props.fetchingCompleteTheLookProducts || !this.props.completeLookProducts) {
        return;
      }
      if (!_.isEqual(prevProps.completeLookProducts, this.props.completeLookProducts)) {
        const display_id_list = [];
        const products = this.props.completeLookProducts;
        products.forEach((product) => {
          display_id_list.push(product.display_id);
        });
        this.props.dispatch(fetchCompleteLookProductsReviewData(display_id_list));
      }
    });
  }

  fetchRelatedProducts() {
    batch(() => {
      if (this.props.mainProduct) {
        if (this.props.mainProduct.related) {
        // fetch complete the look products
          if (this.props.mainProduct.related.complete_the_look) {
            this.props.dispatch(
              fetchCompleteLookProducts(this.props.mainProduct.related.complete_the_look)
            );
          } else {
            this.props.dispatch(setFetchingCompleteLookProducts(false));
          }

          // fetch also like products
          if (this.props.mainProduct.related.alsolike) {
            this.props.dispatch(
              fetchAlsolikeProducts(this.props.mainProduct.related.alsolike)
            );
          } else {
            this.props.dispatch(setFetchingAlsolikeProducts(false));
          }
        }
        this.props.dispatch(fetchCustomerReviews(this.props.mainProduct.display_id));
      } else {
        this.props.dispatch(setFetchingAlsolikeProducts(false));
        this.props.dispatch(setFetchingCompleteLookProducts(false));
      }
    });
  }

  renderCompleteTheLook() {
    if (this.props.fetchingCompleteTheLookProducts || !this.props.completeLookProducts) {
      return <div>loading</div>;
    }
    const products = this.props.completeLookProducts;

    if (!products || products.length < 1) {
      return <div>No product</div>;
    }

    return products.map((product, index) => {
      return (
        <Row className={styles["related-compltelook-row"]} key={product.display_id}>
          <ProductBoard
            tiers={this.props.tiers}
            product={product}
            customerGroupId={this.props.customerGroupId}
            DL={{
              list: ACTION_FIELD_LIST.DETAIL_PAGE_DEFAULT_COMPLETELOOK,
              position: index + 1
            }}
            galleryMode="GalleryCarousel"
            detail="0"
            enable_link="true"
            settings={{
              infinite: false,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              dots: true,
              lazyLoad: true
            }}
          />
        </Row>
      );
    });
  }

  renderAlsolike() {
    if (this.props.fetchingAlsoLikeProducts || !this.props.alsolikeProducts) {
      return <div> Loading </div>;
    }
    const products = this.props.alsolikeProducts;
    if (!products || products.length < 1) {
      return <div>No product</div>;
    }
    return products.map((product, index) => {
      return (
        <div className={styles["related-alsolike-row"]} key={product.display_id}>
          <ProductRowCardResponsiveBasics
            tiers={this.props.tiers}
            product={product}
            DL={{
              list: ACTION_FIELD_LIST.DETAIL_PAGE_DEFAULT_ALSOLIKE,
              position: index + 1
            }}
            customerGroupId={this.props.customerGroupId}
          />
        </div>
      );
    });
  }

  renderKitDetail() {
    // console.log('renderKitDetail', this.props.mainProduct);
    return (
      <KitDetail
        kitDetail={this.props.mainProduct.kit_details}
        kitProducts={this.props.mainProduct.sub_products}
      />
    );
  }

  renderSkinCareVividDetail = (mainProduct) => {
    return _.get(mainProduct, "vivid_details[0].image.device.pc.xl") ? (
      <div className={styles.imageContainer}>
        <img
          className={styles.skinCareVividDetailPicture}
          src={mainProduct.vivid_details[0].image.device.pc.xl}
          alt="skinCareVividDetail"
        />
      </div>
    ) : null;
  }

  render() {
    const ColSettings = {
      left: { sm: 7, xs: 12 },
      middle: { sm: 1, xs: 0 },
      right: { sm: 4, xs: 12 }
    };
    const {
      mainProduct,
      completeLookProducts,
      alsolikeProducts,
      customerGroupId,
      tiers,
      location
    } = this.props;

    // console.log('ProductTemplateDefault render props', this.props.mainProduct.kit_details);
    return (
      <div>
        <div className={styles.template}>
          <div className={styles.goBack}>
            <GoBack />
          </div>
          <Grid>
            <BreadcrumbDefault breadcrumbs={mainProduct.breadcrumb} />
            <Row className={styles["main-product-wrapper"]}>
              <ProductBoard
                product={mainProduct}
                tiers={tiers}
                customerGroupId={customerGroupId}
                location={location}
                DL={{ list: ACTION_FIELD_LIST.DETAIL_PAGE_DEFAULT_MAIN, position: 1 }}
                galleryMode="GalleryWithThumbnails"
                detail="1"
              />
            </Row>
            <Row>
              {mainProduct.store === "et" ? (
                <VividDetail details={mainProduct.vivid_details} />
              ) : (
                this.renderSkinCareVividDetail(mainProduct)
              )}
            </Row>
            <Row>
              {mainProduct.kit_details && mainProduct.sub_products
                ? this.renderKitDetail()
                : null}
            </Row>
            <Row className={styles.divider}>
              <Col
                {...ColSettings.left}
                style={{ display: !completeLookProducts ? "none" : "" }}
                className={styles["complete-the-look-wrapper"]}
              >
                <h2 className={styles.h2first}>Complete The Look</h2>
                {this.renderCompleteTheLook()}
              </Col>
              <Col {...ColSettings.middle} />
              <Col
                {...ColSettings.right}
                style={{ display: !alsolikeProducts ? "none" : "" }}
              >
                <h2 className={styles.h2second}>People Also Like</h2>
                {this.renderAlsolike()}
              </Col>
            </Row>
            <Row id="review">
              <CustomerReviews />
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

ProductLayoutDefault.propTypes = {
  alsolikeProducts: PropTypes.array,
  completeLookProducts: PropTypes.array,
  customerGroupId: PropTypes.number,
  fetchingAlsoLikeProducts: PropTypes.bool,
  fetchingCompleteTheLookProducts: PropTypes.bool,
  fetchingKitDetailProducts: PropTypes.bool,
  fetchingMainProduct: PropTypes.bool,
  location: PropTypes.object,
  mainProduct: PropTypes.object,
  tiers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  dispatch: PropTypes.func
};

export default connect()(ProductLayoutDefault);
