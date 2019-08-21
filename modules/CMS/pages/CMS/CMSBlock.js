import React, { Component } from "react";
import { connect } from "react-redux";
import CMSRender from "./CMSRender";

// import actions
import { fetchCMSIdContent } from "../../CMSActions";

class CMSBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: this.props.blocks
        ? this.props.blocks[`${this.props.cmsid}`]
          ? this.constructMatchedUrlBlocks(
            this.props.blocks[`${this.props.cmsid}`].modules
          )
          : ""
        : ""
    };
  }

  componentDidMount() {
    // const id = 'ebe-homepage';
    if (!window) return; // do not render this part while SSR

    if (!this.state.modules) {
      const params = {
        id: this.props.cmsid,
        country: "us",
        lan: "en"
      };
      this.props.dispatch(fetchCMSIdContent(params, "user"));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!window) return; // do not render this part while SSR

    if (nextProps.blocks[`${nextProps.cmsid}`]) {
      const nextPropsModules = nextProps.blocks[`${nextProps.cmsid}`].modules;
      const modules = this.constructMatchedUrlBlocks(nextPropsModules);
      this.setState({
        modules
      });
    }
  }

  constructMatchedUrlBlocks(inputModules) {
    let modules = [];

    // if specify an empty array, return no component to render
    if (this.props.urls === []) return modules;

    const urls = this.props.urls || [];

    if (this.props.urls && urls.length > 0) {
      inputModules.forEach((module) => {
        // Start from the end to beginning, find the longest breadcrumb url first
        for (let i = urls.length - 1; i >= 0; i--) {
          if (module.url === urls[i]) {
            // if found, store everything matching that url
            modules = inputModules.filter((item) => {
              return item.url === module.url;
            });
            // if found, end the forEach loop
            return;
          }
        }
      });
    } else {
      // if no url, fall back to only matching cmsid
      modules = inputModules;
    }
    return modules;
  }

  render() {
    const { cmsid, colorCategory } = this.props;
    const props = {
      cmsid,
      modules: this.state.modules,
      cms_type: "block"
    };
    if (!this.state.modules && colorCategory) return null;
    return <CMSRender {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    blocks: state.cms.cms_block
  };
}

export default connect(mapStateToProps)(CMSBlock);
