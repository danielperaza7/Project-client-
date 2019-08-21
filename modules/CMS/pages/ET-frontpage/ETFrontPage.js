/* eslint-disable react/destructuring-assignment */
import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import CMSRender from "../CMS/CMSRender";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";

// import actions
import { fetchCMSPage, setShowMobileHeaderPromotion } from "../../CMSActions";

// import getters
import { getCMSPage, getFetchingCMSPage } from "../../CMSReducer";

class ETFrontPage extends React.PureComponent {
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
    const { cmsPage } = this.props;
    const params = {
      id: "homepage-et",
      country: "us",
      lan: "en"
    };
    if (!cmsPage || cmsPage.url !== params.id) {
      this.props.dispatch(
        fetchCMSPage(params, "user", this.handleFetchCMSIdContentResponse)
      );
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setShowMobileHeaderPromotion(false));
  }

  handleFetchCMSIdContentResponse(err) {
    // if err show message in a modal
    if (err) {
      console.error("err");
    } else {
      // initialize local copy ...
      this.setState({
        // modules: data.modules,
        // meta: data.meta,
        // title: data.title,
        // type: data.type,

        contentFetched: true
      });
    }
  }

  render() {
    const { cmsPage } = this.props;
    const props = {
      modules: cmsPage ? cmsPage.modules : null,
      meta: cmsPage ? cmsPage.meta : null,
      title: cmsPage ? cmsPage.title : null,
      cmsid: "homepage-et"
    };
    const historyProps = {
      pathname: this.props.location.pathname,
      search: this.props.location.search,
      name: "Eve's Temptation Homepage"
    };
    const meta = [
      {
        property: "og:title",
        content: props.title
      },
      {
        property: "og:description",
        content: props.meta ? props.meta[1].content : ""
      },
      {
        property: "og:url",
        content: `https://www.evestemptation.com${historyProps.pathname}`
      },
      {
        property: "twitter:url",
        content: `https://www.evestemptation.com${historyProps.pathname}`
      },
      {
        property: "twitter:title",
        content: props.title
      },
      {
        property: "twitter:description",
        content: props.meta ? props.meta[1].content : ""
      },
      {
        property: "pinterest:description",
        content: props.meta ? props.meta[1].content : ""
      },
      {
        content: props.meta ? props.meta[0].content : "",
        name: "keyword"
      },
      {
        content: props.meta ? props.meta[1].content : "",
        name: "description"
      }
    ];

    return (
      <React.Fragment>
        <Helmet title={props.title} meta={props.meta ? meta : []} />
        <CMSRender {...props} />
        {this.state.contentFetched || (cmsPage && cmsPage.url === props.cmsid) ? (
          <CustomHistory record={historyProps} />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(store) {
  return {
    cmsPage: getCMSPage(store),
    fetchingPage: getFetchingCMSPage(store)
  };
}

export default connect(mapStateToProps)(ETFrontPage);
