import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import Slider from "react-slick";
import { SLICK_CAROUSEL_CSS } from "../../../../config/config";
import ProductCard from "../../../Category/components/ProductCard/ProductCard";

import styles from "./ProductsGallery1.css";

export const ProductsGallery1Info = {
  id: "products_gallery_1",
  description: "show a gallery of products with links",
  image: "",
  props: {
    settings: {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      // centerMode: true,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    },
    applied_section: "menu_desktop"
  },
  PRODUCT_DATA: {
    list_ids: [
      "1001406",
      "1001407",
      "1001408",
      "Y1437683",
      "1001001",
      "1001405",
      "1001404",
      "1398113",
      "1398114",
      "1001403",
      "1001402",
      "1001401"
    ],
    data_fetch_mode: "clientOnLoad",
    product_id_type: "list_ids"
  },
  responsive: {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  }
};

let autoplayTimer_et;

class ProductsGallery1 extends PureComponent {
  constructor(props) {
    super(props);
    const settings = {
      ...ProductsGallery1Info.props.settings,
      ...this.props.settings
    };
    // const settings = this.props.settings || ProductsGallery1Info.props.settings;
    const currentBP = settings.responsive
      ? settings.responsive.find((resp) => {
        return (
          window !== undefined
            && resp.breakpoint > window.document.documentElement.clientWidth
        );
      })
      : "";
    this.state = {
      current_index: 0,
      length: currentBP ? currentBP.settings.slidesToShow : settings.slidesToShow,
      goForth: true,
      slidesToShow: currentBP ? currentBP.settings.slidesToShow : settings.slidesToShow,
      slidesToScroll: currentBP
        ? currentBP.settings.slidesToScroll
        : settings.slidesToScroll,
      autoplay: settings.autoplay,
      autoplaySpeed: settings.autoplaySpeed || 5000,
      hidden: true
    };

    this.autoplay = this.autoplay.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onAfterChange = this.onAfterChange.bind(this);
  }

  componentDidMount() {
    this._mount = true;
    if (this.state.autoplay) {
      if (this.props.applied_section === "menu_desktop") {
        setTimeout(() => {
          clearInterval(autoplayTimer_et);
          this.setState({ hidden: false });
        }, 400);
      }
      autoplayTimer_et = setInterval(
        this.autoplay,
        this.props.applied_section === "menu_desktop" ? 0 : this.state.autoplaySpeed
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this._mount && nextProps.products) {
      this.setState({ length: nextProps.products.length });
    }
  }

  componentWillUnmount() {
    this._mount = false;
    if (autoplayTimer_et) {
      clearInterval(autoplayTimer_et);
    }
  }

  onMouseEnter() {
    if (this.state.autoplay) {
      clearInterval(autoplayTimer_et);
    }
  }

  onMouseLeave() {
    if (!this._mount) {
      return;
    }
    if (this.state.autoplay) {
      autoplayTimer_et = setInterval(this.autoplay, this.state.autoplaySpeed);
    }
  }

  onAfterChange(current_index) {
    if (!this._mount) {
      return;
    }
    this.setState({ current_index });
  }

  autoplay() {
    if (!this._mount) {
      return;
    }
    const toGo = this.state.goForth
      ? Math.min(
        this.state.length - this.state.slidesToShow,
        this.state.current_index + this.state.slidesToScroll
      )
      : Math.max(this.state.current_index - this.state.slidesToScroll, 0);
    if (toGo === this.state.length - this.state.slidesToScroll) {
      this.setState({ goForth: false });
    } else if (toGo === 0) {
      this.setState({ goForth: true });
    }
    if (this.refs.slider) this.refs.slider.slickGoTo(toGo);
  }

  render() {
    // Other CMS components use this.props.onLoad, this.props.onClick to inform ComponentComtainer to push promotion viewed/clicked data.
    // ProductsGallery1 and ProductCard1 push promotion viewed/clicked data in ProductCard Component (Reuse some code of productViewed and productClick).
    const {
      products,
      promData,
      creative,
      settings: propSettings,
      membershipPriceDisabled,
      tags,
      applied_section
    } = this.props;
    const { hidden } = this.state;
    const settings = {
      ...ProductsGallery1Info.props.settings,
      ...propSettings
    };

    if (!products) {
      return null;
    }

    const currentBP = settings.responsive
      ? settings.responsive.find(
        resp => resp.breakpoint > window.document.documentElement.clientWidth
      )
      : "";
    const slidesNumber = currentBP
      ? currentBP.settings.slidesToShow
      : settings.slidesToShow;

    const renderProducts = products.map((product, index) => {
      const tiers = {
        0: "guest",
        1: "VIP",
        2: "VVIP"
      };
      const range = {
        min: this.state.current_index,
        max: this.state.current_index + slidesNumber
      };

      if (!product) {
        return <div> No Current Product</div>;
      }

      const tagVals = [];
      if (tags && tags.hasOwnProperty(product.list_id)) {
        tagVals.push(tags[product.list_id]);
      }
      // console.log('renderProduct called', tagVals);
      return (
        <div className={styles["product-wrapper"]} key={index}>
          <ProductCard
            product={product}
            tiers={tiers}
            DL={{
              list: `CMS - ProductsGallery1${
                this.props.actionField ? ` - ${this.props.actionField}` : " - Undefined"
              }`,
              position: index + 1
            }}
            scrollDirection="horizontal"
            scrollableAncestor={this.refs.ProductsGallery1}
            notVisible={index < range.min || index >= range.max}
            promData={promData}
            creative={creative}
            membershipPriceDisabled={membershipPriceDisabled}
            tagVals={tagVals}
            from={applied_section}
          />
        </div>
      );
    });

    return (
      <div
        ref="ProductsGallery1"
        className="ProductsGallery1"
        style={{
          visibility:
            hidden && this.props.applied_section === "menu_desktop" ? "hidden" : "visible"
        }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <Helmet link={SLICK_CAROUSEL_CSS} />
        <Slider
          ref="slider"
          className={styles.slider}
          {...settings}
          autoplay={false}
          infinite
          afterChange={(current_index) => {
            this.onAfterChange(current_index);
          }}
        >
          {renderProducts}
        </Slider>
      </div>
    );
  }
}

export default ProductsGallery1;
