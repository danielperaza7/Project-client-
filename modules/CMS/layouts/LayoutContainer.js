import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import ComponentContainer from "../components/ComponentContainer";
import { getClientMD } from "../../App/AppReducer";
import styles from "../CMS_predefined_classes.css";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Layout3 from "./Layout3";
import Layout4 from "./Layout4";
import GeneralLayout from "./GeneralLayout";

class LayoutContainer extends Component {
  getPredefinedClasses(array) {
    if (!array) {
      return null;
    }
    let classes = "";
    for (let i = 0; i < array.length; i++) {
      classes += styles[array[i]];
    }
    return classes;
  }

  renderComponents(positions, layoutIndex, cmsid) {
    if (!positions) return null;

    const componentsAtPositions = {};
    for (const key in positions) {
      // render all elements in positions
      if (positions[key] && positions[key].components) {
        const OnePosition = positions[key].components.map((component, index) => {
          const creative = `${cmsid}/${layoutIndex}/${key}/${index + 1}`;
          return <ComponentContainer key={index} {...component} creative={creative} />;
        });
        componentsAtPositions[key] = (
          <div
            style={
              positions[key].configs.inline_styles
                ? positions[key].configs.inline_styles
                : {}
            }
          >
            {OnePosition}
          </div>
        );
      }
    }
    return componentsAtPositions;
  }

  renderLayout(id, configs, componentsAtPositions) {
    const props = {
      ...configs,
      componentsAtPositions
    };
    let layout = null;
    switch (id) {
      case "1":
        layout = <Layout1 {...props} />;
        break;
      case "2":
        layout = <Layout2 {...props} />;
        break;
      case "3":
        layout = <Layout3 {...props} />;
        break;
      case "4":
        layout = <Layout4 {...props} />;
        break;
      case "0":
        layout = <GeneralLayout {...props} />;
        break;

      default:
        layout = <div>no layout match </div>;
        break;
    }
    return layout;
  }

  render() {
    const {
      layout_id, configs, layoutIndex, cmsid, clientMD
    } = this.props;

    const componentsAtPositions = this.renderComponents(
      configs.positions,
      layoutIndex,
      cmsid
    );
    const predefinedClasses = this.getPredefinedClasses(configs.predefined_classes);
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    return (
      <div className={predefinedClasses}>
        {["xl", "lg", "md", "sm", "xs"].map((key, index) => {
          return (
            <MediaQuery
              minWidth={width_configs.min[key]}
              maxWidth={width_configs.max[key]}
              values={clientMD && { width: clientMD && clientMD.fakeDeviceWidth }}
              key={index}
            >
              {(configs.responsive && configs.responsive[key]) || !configs.responsive
                ? this.renderLayout(layout_id, configs, componentsAtPositions)
                : null}
            </MediaQuery>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(LayoutContainer);
