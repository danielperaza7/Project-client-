import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import MediaQuery from "react-responsive";
import CMSRender from "./CMSRender";

import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";

// import actions
import { fetchCMSPage, setShowMobileHeaderPromotion } from "../../CMSActions";
import { getCMSPage, getFetchingCMSPage } from "../../CMSReducer";
import { getServerLocation } from "../../../App/AppReducer";

// import configs
import { CURRENT_DOMAIN } from "../../../../config/config";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

class CMSPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modules:null,
      // meta:null,
      // title:null,
      contentFetched: false
    };
    this.handleFetchCMSIdContentResponse = this.handleFetchCMSIdContentResponse.bind(
      this
    );
  }

  componentWillMount() {
    this.props.dispatch(setShowMobileHeaderPromotion(true));
  }

  componentDidMount() {
    const { cmsPage, params } = this.props;
    const local_params = {
      id: params.cmsid,
      country: "us",
      lan: "en"
    };
    if (!cmsPage || cmsPage.url !== local_params.id) {
      this.props.dispatch(
        fetchCMSPage(local_params, "user", this.handleFetchCMSIdContentResponse)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.cmsid !== nextProps.params.cmsid) {
      const params = {
        id: nextProps.params.cmsid,
        country: "us",
        lan: "en",
        isPage: true
      };
      this.props.dispatch(
        fetchCMSPage(params, "user", this.handleFetchCMSIdContentResponse)
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setShowMobileHeaderPromotion(false));
  }

  handleFetchCMSIdContentResponse(err, data) {
    console.log("handleFetchCMSIdContentResponse called");
    // if err show message in a modal
    if (err) {
      console.log("err");
    } else {
      // initialize local copy ...
      this.setState({
        // modules: data.modules,
        // meta: data.meta,
        // title: data.title,
        type: data.type,
        contentFetched: true
      });
    }
  }

  showDropDownMunuButton(cms_url) {
    if (
      cms_url === "shipping"
      || cms_url === "return"
      || cms_url === "faqs"
      || cms_url === "about-us"
      || cms_url === "career"
      || cms_url === "store-location"
      || cms_url === "privacy-policy"
      || cms_url === "terms-and-conditions"
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { serverLocation, cmsPage, location } = this.props;
    // console.log('CMSPage.js Render', this.props);
    const props = {
      cmsid: this.props.params.cmsid,
      modules: cmsPage ? cmsPage.modules : null, // modules means the whole json file in website font-end cms editor
      meta: cmsPage ? cmsPage.meta : null,
      title: cmsPage ? cmsPage.title : null,
      cms_type: cmsPage ? cmsPage.type : null,
      cms_url: cmsPage ? cmsPage.url : null
    };
    // const { cmsPage, fetchingPage } = this.props;
    const historyProps = {
      pathname: location.pathname,
      search: location.search,

      name: cmsPage ? cmsPage.title : ""
    };
    const canonicalUrl = CURRENT_DOMAIN + serverLocation.pathname;
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    cmsPage ? cmsPage.title : "";

    return (
      <div>
        <Helmet
          title={props.title}
          meta={props.meta ? props.meta : []}
          link={[
            {
              rel: "canonical",
              href: canonicalUrl
            }
          ]}
        />
        {this.showDropDownMunuButton(props.cms_url) ? (
          <MediaQuery
            minWidth={width_configs.min.xs}
            maxWidth={width_configs.max.xs}
            key="xs"
          >
            <DropdownMenu />
          </MediaQuery>
        ) : null}
        <CMSRender {...props} />
        {this.state.contentFetched ? (
          <CustomHistory record={historyProps} />
        ) : null}
      </div>
    );
  }
}

CMSPage.need = [
  (props, store) => {
    const params = {
      id: props.cmsid,
      country: "us",
      lan: "en"
    };
    return fetchCMSPage(
      params,
      "user",
      CMSPage.handleFetchCMSIdContentResponse
    );
  }
];

function mapStateToProps(store) {
  return {
    cmsPage: getCMSPage(store),
    fetchingPage: getFetchingCMSPage(store),
    serverLocation: getServerLocation(store)
  };
}

export default connect(mapStateToProps)(CMSPage);
