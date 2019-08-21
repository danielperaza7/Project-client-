import React, { PureComponent } from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import Waypoint from "react-waypoint";

// import actions
import {
  fetchProductsWithListIds,
  fetchProductBoardData,
  fetchProductsWithRewardPoints
} from "../../Category/CategoryActions";

import {
  getCustomerGroupId,
  getTiers,
  getClientMD,
  getStoreName,
  getMobileStoreName
} from "../../App/AppReducer";
import { getProductType } from "../CMSReducer";
import {
  pushPromotionList,
  constructPromData,
  PushDL_ClickPromotion
} from "../../Analytics/components/GA";

// import image components
import Image1, { Image1Info } from "./Image/Image1";
import Image2, { Image2Info } from "./Image/Image2";

// import images gallery components
import ImagesGallery1, { ImagesGallery1Info } from "./ImagesGallery/ImagesGallery1";

// import complex carousel
import CarouselComplex1, {
  CarouselComplex1Info
} from "./CarouselComplex/CarouselComplex1";

// import prodcut components
import ProductsGallery1, {
  ProductsGallery1Info
} from "./ProductsGallery/ProductsGallery1";
import ProductCard1, { ProductCard1Info } from "./Product/ProductCard1";
import ProductBoard1, { ProductBoard1Info } from "./Product/ProductBoard1";
import ProductCardList, { ProductCardListInfo } from "./Product/ProductCardList";
import ProductsGrid2, { ProductsGrid2Info } from "./ProductsGrid/ProductsGrid2";

// import text components
import Text1, { Text1Info } from "./Text/Text1";
import TextTitle, { TextTitleInfo } from "./Text/TextTitle";

// import divider components
import BlankRow, { BlankRowInfo } from "./Divider/BlankRow";

// import markdown
import MarkdownMarked, { MarkdownMarkedInfo } from "./Markdown/MarkdownMarked";
import MarkdownVerticalCarousel, {
  MarkdownVerticalCarouselInfo
} from "./MarkdownVerticalCarousel/MarkdownVerticalCarousel";
// import navigation
import Navigation, { NavigationInfo } from "./Navigation/Navigation";

// import google map
import GoogleMap, { GoogleMapInfo } from "./GoogleMap/GoogleMap";
import FaqsPanel, { FaqsPanelInfo } from "./FaqsPanel/FaqsPanel";
import TitleWithImage, { TitleWithImageInfo } from "./Text/TitleWithImage/TitleWithImage";
import FollowUs, { FollowUsInfo } from "./FollowUs/FollowUs";
import NewsLetter, { NewsLetterInfo } from "./NewsLetter/NewsLetter";
import OurHistory, { OurHistoryInfo } from "./OurHistory/OurHistory";
import BreastType, { BreastTypeInfo } from "./BreastType/BreastType";
import BreastTypeENG, { BreastTypeInfo_eng } from "./BreastType_ENG/BreastTypeENG";
import Clearance, { ClearanceInfo } from "./Clearance/Clearance";
import HeaderMenuDesktop, {
  HeaderMenuDesktopInfo
} from "./MenuComponents/HeaderMenuDesktop";
import BlogMobile, { BlogMobileInfo } from "./MenuComponents/BlogMobile";
import NewArrivalsMobile, {
  NewArrivalsMobileInfo
} from "./MenuComponents/NewArrivalsMobile";
import SaleMobile, { SaleMobileInfo } from "./MenuComponents/SaleMobile";
import FileDownloader, { FileDownloaderInfo } from "./FileDownloader/FileDownloader";

import InsPhotoTemplate, { InsPhotoTemplateInfo } from "./InsPhtotos/InsPhotoTemplate.js";
import FooterNotice, { FooterNoticeInfo } from "./FooterNotice/FooterNotice.js";
import ResponsiveNavigation, {
  ResponsiveNavigationInfo
} from "./ResponsiveNavigationMenu/ResponsiceNavigation.js";
import IconText, { IconTextInfo } from "./Text/IconText.js";
import AdsGrid, { AdsGridInfo } from "./AdsGrid/AdsGrid";
import Navigation1, { Navigation1Info } from "./Navigation/Navigation1";
import ImageSet, { ImageSetInfo } from "./ImageSet/ImageSet";

// import RPPR components
import RPRPList, { RPRPListInfo } from "./RPRP/RPRPList";
import BannerTabletAndDesktop, {
  BannerTabletAndDesktopInfo
} from "./RPRP/BannerTabletAndDesktop";
import BannerMobile, { BannerMobileInfo } from "./RPRP/BannerMobile";

// import video components

let viewTimer_et;

class ComponentContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      viewed: false,
      loaded: false
    };
    this.renderComponent = this.renderComponent.bind(this);
    this.handleProductsDataResponse = this.handleProductsDataResponse.bind(this);
    this.fetchProductDataWith = this.fetchProductDataWith.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEnter = this.onEnter.bind(this);
    // this.onSwitch = this.onSwitch.bind(this);
  }

  componentDidMount() {
    const { productType } = this.props;
    const PRODUCT_DATA = {
      // not used, for reference only
      list_ids: ["1398114"],
      data_fetch_mode: "clientOnLoad", // "server", "clientOnLoad","clientOnView"
      product_id_type: "list_ids" // list_ids, display_ids
    };
    this.fetchProductDataWith(this.props.PRODUCT_DATA, productType);
  }

  componentDidUpdate(prevProps) {
    const { productType } = this.props;
    if (prevProps.productType !== productType) {
      this.fetchProductDataWith(this.props.PRODUCT_DATA, productType);
    }
  }

  onLoad() {
    this.setState({ loaded: true });
  }

  onClick() {
    if (this.props.props.promData && this.props.props.promData.id) {
      PushDL_ClickPromotion(
        constructPromData(
          this.props.props.promData,
          this.props.creative,
          this.props.position || ""
        )
      );
    }
  }

  onEnter() {
    if (this.props.props.promData && this.props.props.promData.id) {
      pushPromotionList(
        constructPromData(
          this.props.props.promData,
          this.props.creative,
          this.props.position || ""
        )
      );
    }
    this.setState({ viewed: true });
  }

  fetchProductDataWith(P_DATA, productType) {
    if (P_DATA) {
      if (P_DATA.data_fetch_mode === "clientOnLoad" && P_DATA.product_id_type) {
        if (P_DATA.product_id_type === "list_ids" && P_DATA.list_ids) {
          const list = !Array.isArray(P_DATA.list_ids) && productType
            ? P_DATA.list_ids[productType]
            : P_DATA.list_ids;
          this.props.dispatch(
            fetchProductsWithListIds(list, this.handleProductsDataResponse)
          );
        } else if (P_DATA.product_id_type === "display_ids" && P_DATA.display_ids) {
          this.props.dispatch(
            fetchProductBoardData(P_DATA.display_ids, this.handleProductsDataResponse)
          );
        } else if (P_DATA.product_id_type === "skus" && P_DATA.list_ids) {
          this.props.dispatch(
            fetchProductsWithRewardPoints(
              P_DATA.list_ids,
              this.handleProductsDataResponse
            )
          );
        }
      }
    }
  }

  handleProductsDataResponse(data) {
    this.setState({
      products: data.products
    });
  }

  renderComponent(id, oriProps, inline_styles) {
    const props = {
      ...oriProps,
      responsive: this.props.responsive,
      onLoad: this.onLoad,
      onClick: this.onClick,
      creative: this.props.creative,
      urls: this.props.urls,
      fakeDeviceWidth: this.props.clientMD.fakeDeviceWidth,
      inline_styles
    };
    // console.log('props in renderComponent', props);
    // for pure CMS components, use onLoad and onClick to inform ComponentContainer push data;
    // for reused components, like productCard, just pass needed data(like creative), push data by the components themselves.
    // console.log('products in renderComponent', this.state.products);
    switch (id) {
      case Image1Info.id:
        return <Image1 {...props} />;
      case Image2Info.id:
        return <Image2 {...props} />;
      case ImagesGallery1Info.id:
        return <ImagesGallery1 {...props} />;
      case ProductsGallery1Info.id:
        return <ProductsGallery1 {...props} products={this.state.products} />;
      case CarouselComplex1Info.id:
        return (
          <CarouselComplex1
            {...props}
            products={this.state.products}
            tag_list={this.props.tag_list}
          />
        );
      case ProductCard1Info.id:
        return (
          <ProductCard1
            {...props}
            products={this.state.products}
            customerGroupId={this.props.customer_group_id}
            tiers={this.props.tiers}
          />
        );
      case ProductsGrid2Info.id:
        return (
          <ProductsGrid2
            {...props}
            products={this.state.products}
            tag_list={this.props.tag_list}
          />
        );
      case ProductBoard1Info.id:
        return (
          <ProductBoard1
            {...props}
            products={this.state.products}
            customerGroupId={this.props.customer_group_id}
            tiers={this.props.tiers}
          />
        );
      case Text1Info.id:
        return <Text1 {...props} />;
      case TextTitleInfo.id:
        return <TextTitle {...props} />;
      case BlankRowInfo.id:
        return <BlankRow {...props} />;
      case MarkdownMarkedInfo.id:
        return <MarkdownMarked {...props} />;
      case FaqsPanelInfo.id:
        return <FaqsPanel {...props} />;
      case MarkdownVerticalCarouselInfo.id:
        return <MarkdownVerticalCarousel {...props} />;
      case NavigationInfo.id:
        return <Navigation {...props} />;
      case Navigation1Info.id:
        return <Navigation1 {...props} />;
      case GoogleMapInfo.id:
        return <GoogleMap {...props} />;
      case TitleWithImageInfo.id:
        return <TitleWithImage {...props} />;
      case FollowUsInfo.id:
        return <FollowUs {...props} />;
      case NewsLetterInfo.id:
        return <NewsLetter {...props} />;
      case OurHistoryInfo.id:
        return <OurHistory {...props} />;
      case BreastTypeInfo.id:
        return <BreastType {...props} />;
      case BreastTypeInfo_eng.id:
        return <BreastTypeENG {...props} />;
      case ClearanceInfo.id:
        return <Clearance {...props} />;
      case HeaderMenuDesktopInfo.id:
        return <HeaderMenuDesktop {...props} />;
      case BlogMobileInfo.id:
        return <BlogMobile {...props} storeName={this.props.mobileStoreName || "et"} />;
      case NewArrivalsMobileInfo.id:
        return <NewArrivalsMobile {...props} />;
      case SaleMobileInfo.id:
        return <SaleMobile {...props} />;
      case FileDownloaderInfo.id:
        return <FileDownloader {...props} />;
      case InsPhotoTemplateInfo.id:
        return <InsPhotoTemplate {...props} />;
      case FooterNoticeInfo.id:
        return <FooterNotice {...props} />;
      case ResponsiveNavigationInfo.id:
        return <ResponsiveNavigation {...props} />;
      case IconTextInfo.id:
        return <IconText {...props} />;
      case ProductCardListInfo.id:
        return (
          <ProductCardList
            {...props}
            products={this.state.products}
            customerGroupId={this.props.customer_group_id}
            tiers={this.props.tiers}
          />
        );
      case AdsGridInfo.id:
        return <AdsGrid {...props} />;
      case ImageSetInfo.id:
        return <ImageSet {...props} />;
      case RPRPListInfo.id:
        return <RPRPList {...props} products={this.state.products} />;
      case BannerTabletAndDesktopInfo.id:
        return <BannerTabletAndDesktop {...props} />;
      case BannerMobileInfo.id:
        return <BannerMobile {...props} />;
      default:
        return <div>Not valid componenct</div>;
    }
  }

  render() {
    const {
      id,
      props,
      responsive,
      creative,
      position,
      clientMD,
      inline_styles,
      responsive_styles,
      urls
    } = this.props;
    const defaultNode = null;

    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    // console.log('Component Container this.state', this.state);

    return (
      <div
        style={
          inline_styles
            ? { ...inline_styles, position: "relative" }
            : { position: "relative" }
        }
      >
        {["xl", "lg", "md", "sm", "xs"].map((key) => {
          return (
            <MediaQuery
              minWidth={width_configs.min[key]}
              maxWidth={width_configs.max[key]}
              values={clientMD && { width: clientMD && clientMD.fakeDeviceWidth }}
              key={key}
            >
              {responsive && responsive[key]
                ? this.renderComponent(
                  id,
                  props,
                  responsive_styles ? responsive_styles[key] : ""
                )
                : defaultNode}
            </MediaQuery>
          );
        })}

        {this.state.loaded
        && !this.state.viewed
        && !this.props.notVisible
        && (props.promData && props.promData.id) ? (
          <Waypoint
            onEnter={() => {
              viewTimer_et = window.setTimeout(this.onEnter, 1000);
            }}
            onLeave={() => {
              if (typeof viewTimer_et !== "undefined" && viewTimer_et) {
                window.clearTimeout(viewTimer_et);
              }
            }}
            scrollableAncestor={this.props.scrollableAncestor || window}
            topOffset={
              this.props.scrollDirection === "horizontal"
                ? "0"
                : window.document.documentElement.clientWidth <= 992
                  ? "75px"
                  : "158px"
            }
          >
            <div style={{ width: "100%", bottom: "20%", position: "absolute" }} />
          </Waypoint>
          ) : (
            ""
          )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    tiers: getTiers(store),
    customer_group_id: getCustomerGroupId(store),
    clientMD: getClientMD(store),
    productType: getProductType(store),
    storeName: getStoreName(store),
    mobileStoreName: getMobileStoreName(store)
  };
}

export default connect(mapStateToProps)(ComponentContainer);

// how admin configs data looks like
const components = [
  {
    id: "products_gallery_1",
    props: {},
    responsive: {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true
    },
    products_SERVER: {
      list_ids: ["1398114", "Y1437683", "Y1434683"],
      send_detail_data: true,
      on_view_fetch: null
    }
  }
];

// send_detail_data true response:
const componentsResponse = [
  {
    id: "products_gallery_1",
    props: {
      products: [{}, {}]
    },
    responsive: {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true
    }
  }
];
