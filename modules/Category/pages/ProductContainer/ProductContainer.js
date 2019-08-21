/*
  productContainer.js

  This is a container page containing product details content,
  This container will render different layout or template according to products view mode
*/

import React from "react";
import { connect, batch } from "react-redux";

import Helmet from "react-helmet";
import { PropTypes } from "prop-types";

// import product layouts
import ProductTemplateDefault from "../ProductPageTemplates/Default/ProductTemplateDefault";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";

// import Actions
import { fetchMainProduct, resetMainProduct } from "../../CategoryActions";

// import getter
import {
  getCurrentProduct,
  getFetchingMainProduct,
  getCompleteLookProducts,
  getAlsolikeProducts,
  getFetchingAlsoLikeProducts,
  getFetchingCompleteTheLookProducts,
  getFetchingKitDetailProducts
} from "../../CategoryReducer";
import { getTiers, getCustomerGroupId, getServerLocation } from "../../../App/AppReducer";

import DefaultMask from "../../../../components/masks/DefaultMask";

import { CURRENT_DOMAIN } from "../../../../config/config";

import { constructGoogleStructuredData } from "../../../SEO/helpers";

class ProductContainer extends React.PureComponent {
  componentDidMount() {
    const {
      currentProduct, match
    } = this.props;

    if (!currentProduct) {
      this.props.dispatch(fetchMainProduct(match.params.productId));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.productId !== this.props.match.params.productId) {
      batch(() => {
        this.props.dispatch(resetMainProduct());
        this.props.dispatch(fetchMainProduct(this.props.match.params.productId));
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetMainProduct());
  }

  setViewComponent() {
    switch (this.props.currentProduct.view_mode) {
      case "default":
        return (
          <div>
            <ProductTemplateDefault
              mainProduct={this.props.currentProduct}
              completeLookProducts={this.props.completeLookProducts}
              alsolikeProducts={this.props.alsolikeProducts}
              fetchingMainProduct={this.props.fetchingMainProduct}
              fetchingAlsoLikeProducts={this.props.fetchingAlsoLikeProducts}
              fetchingCompleteTheLookProducts={this.props.fetchingCompleteTheLookProducts}
              fetchingKitDetailProducts={this.props.fetchingKitDetailProducts}
              tiers={this.props.tiers}
              customerGroupId={this.props.customerGroupId}
              location={this.props.location}
            />
          </div>
        );
      default:
        return <div> No view mode matches</div>;
    }
  }

  render() {
    const { serverLocation } = this.props;
    const canonicalUrl = CURRENT_DOMAIN + serverLocation.pathname;
    const historyProps = {
      pathname: this.props.location.pathname,
      search: this.props.location.search,
      name:
        this.props.currentProduct && this.props.currentProduct.name
          ? this.props.currentProduct.name
          : null
    };

    if (!this.props.fetchingMainProduct && this.props.currentProduct) {
      const keyword = this.props.currentProduct.meta && this.props.currentProduct.meta.keyword
        ? {
          name: "keyword",
          content: this.props.currentProduct.meta.keyword
        }
        : {};
      const description = this.props.currentProduct.meta && this.props.currentProduct.meta.description
        ? {
          name: "description",
          content: this.props.currentProduct.meta.description
        }
        : {};
      const title = this.props.currentProduct.meta && this.props.currentProduct.meta.title
        ? this.props.currentProduct.meta.title
        : "";
      const pictureUrl = this.props.currentProduct.images
        && this.props.currentProduct.images.main
        && this.props.currentProduct.images.main.images
        && this.props.currentProduct.images.main.images.lg
        && this.props.currentProduct.images.main.images.lg.url
        ? this.props.currentProduct.images.main.images.lg.url
        : "https://storage.googleapis.com/evesetus/email/LINKEDIN/linkedin-1.jpg";
      const meta = [
        {
          property: "og:title",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.title
              ? this.props.currentProduct.meta.title
              : ""
        },
        {
          property: "og:description",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.description
              ? this.props.currentProduct.meta.description
              : ""
        },
        {
          property: "og:url",
          content: `https://www.evestemptation.com${historyProps.pathname}`
        },
        {
          property: "og:image",
          content: pictureUrl
        },
        {
          property: "twitter:url",
          content: `https://www.evestemptation.com${historyProps.pathname}`
        },
        {
          property: "twitter:image",
          content: pictureUrl
        },
        {
          property: "twitter:title",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.title
              ? this.props.currentProduct.meta.title
              : ""
        },
        {
          property: "twitter:description",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.description
              ? this.props.currentProduct.meta.description
              : ""
        },
        {
          property: "pinterest:description",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.description
              ? this.props.currentProduct.meta.description
              : ""
        },
        {
          property: "pinterest:image",
          content: pictureUrl
        },
        {
          name: "keyword",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.keyword
              ? this.props.currentProduct.meta.keyword
              : ""
        },
        {
          name: "description",
          content:
            this.props.currentProduct.meta && this.props.currentProduct.meta.description
              ? this.props.currentProduct.meta.description
              : ""
        }
      ];

      return (
        <div>
          <Helmet
            title={title}
            meta={meta}
            link={[
              {
                rel: "canonical",
                href: canonicalUrl
              }
            ]}
            script={[
              {
                type: "application/ld+json",
                innerHTML: constructGoogleStructuredData(
                  "Product",
                  this.props.currentProduct
                )
              }
            ]}
          />
          {this.setViewComponent()}
          {!this.props.fetchingMainProduct ? (
            <CustomHistory record={historyProps} />
          ) : null}
        </div>
      );
    }

    return <DefaultMask />;
  }
}

ProductContainer.propTypes = {
  currentProduct: PropTypes.object,
  completeLookProducts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  alsolikeProducts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fetchingMainProduct: PropTypes.bool,
  fetchingAlsoLikeProducts: PropTypes.bool,
  fetchingCompleteTheLookProducts: PropTypes.bool,
  fetchingKitDetailProducts: PropTypes.bool,
  tiers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customerGroupId: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  serverLocation: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,

  dispatch: PropTypes.func
};

function mapStateToProps(store) {
  return {
    currentProduct: getCurrentProduct(store),
    completeLookProducts: getCompleteLookProducts(store),
    alsolikeProducts: getAlsolikeProducts(store),
    fetchingMainProduct: getFetchingMainProduct(store),
    fetchingAlsoLikeProducts: getFetchingAlsoLikeProducts(store),
    fetchingCompleteTheLookProducts: getFetchingCompleteTheLookProducts(store),
    fetchingKitDetailProducts: getFetchingKitDetailProducts(store),
    tiers: getTiers(store),
    customerGroupId: getCustomerGroupId(store),
    serverLocation: getServerLocation(store)
  };
}

export default connect(mapStateToProps)(ProductContainer);
