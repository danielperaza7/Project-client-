import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import CMSRender from "../CMS/CMSRender";
import CustomHistory from "../../../App/components/CustomHistory/CustomHistory";
import { fetchCMSPage, setShowMobileHeaderPromotion } from "../../CMSActions";
import { getCMSPage, getFetchingCMSPage } from "../../CMSReducer";

// import history from "../../../../history";

class RootPage extends React.PureComponent {
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
      id: "homepage-root",
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
      console.debug("err");
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
      cmsid: "homepage-root"
    };

    const location = typeof window !== "undefined" ? window.location : {};

    const historyProps = {
      pathname: location.pathname,
      search: location.search,
      name: "Homepage"
    };
    const meta = [
      {
        property: "og:title",
        content: props.title ? props.title : ""
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
        content: props.title ? props.title : ""
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

    if (!props.meta) {
      return null;
    }

    return (
      <React.Fragment>
        <Helmet title={props.title ? props.title : ""} meta={props.meta ? meta : ""} />
        <Helmet>
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "url": "https://www.evestemptation.com/",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.evestemptation.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            `}
          </script>
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name" : "Eve by Eve's",
                "url": "https://www.evestemptation.com",
                "sameAs" : [
                  "https://www.facebook.com/evebyeves/",
                  "https://www.instagram.com/evebyeves/",
                  "https://twitter.com/evebyeves",
                  "https://www.pinterest.com/evesclub/",
                  "https://www.youtube.com/channel/UCXQTY1RHiu4_f8Vj9qrmSsQ"
                ]
              }
            `}
          </script>
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "LocalBusiness",
                "name" : "Eve by Eve's",
                "url": "https://www.evestemptation.com",
                "logo": "https://hiddenfigure.evestemptation.com/email/LOGO/EBE-BLACK-LOGO-1.svg",
                "image": "https://hiddenfigure.evestemptation.com/email/LOGO/EBE-BLACK-LOGO-1.svg",
                "description": "Beauty, Cosmetic & Personal Care in Beverly Hills, California",
                "telephone": "+1 855-844-0545",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Los Angeles",
                  "addressRegion": "CA",
                  "streetAddress": "350 N Camden Drive",
                  "postalCode": "90210"
                },
                "openingHours": [
                  "Mo-Fr 9am - 6pm PST"
                ]
              }
            `}
          </script>
        </Helmet>
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

export default connect(mapStateToProps)(RootPage);
