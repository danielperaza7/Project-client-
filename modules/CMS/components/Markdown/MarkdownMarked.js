import React, { Component } from "react";

import marked from "marked";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import styles from "./MarkdownMarked.css";
import CollapsedWrapper from "../CollapsedWrapper/CollapsedWrapper.js";
import { getClientMD } from "../../../App/AppReducer";

export const MarkdownMarkedInfo = {
  id: "markdown-marked",
  description: "markdown renderer",
  image: "",
  props: {
    options: {
      // see details at https://github.com/rexxars/react-markdown
      source: "markdown content"
    },
    collapsed: {
      isCollapsed: false,
      maxHeight: "50px",
      borderColor: "black",
      collapsedInfo: "Continue Reading",
      expandedInfo: "Finish Reading",
      collapsedBoxHeight: "24px",
      minHeight: "300px"
    }
  }
};

const getMarkdownText = (src) => {
  const rawMarkup = marked(src);
  return { __html: rawMarkup };
};

class MarkdownMarked extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const {
      options, onClick, collapsed, markdownStyle, clientMD
    } = this.props;
    if (!options || !options.source) {
      return null;
    }
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    if (!collapsed || !collapsed.isCollapsed) {
      return (
        <div>
          {["xl", "lg", "md", "sm", "xs"].map((key) => {
            return (
              <MediaQuery
                minWidth={width_configs.min[key]}
                maxWidth={width_configs.max[key]}
                values={{ width: clientMD && clientMD.fakeDeviceWidth }}
                key={key}
              >
                <div
                  dangerouslySetInnerHTML={getMarkdownText(options.source)}
                  style={markdownStyle ? markdownStyle[key] : {}}
                  className={`${styles["markdown-style"]} markdown-style`}
                  onClick={onClick}
                />
              </MediaQuery>
            );
          })}
        </div>
      );
    }
    const Collapse_props = {
      maxHeight: collapsed.maxHeight,
      borderColor: collapsed.borderColor,
      collapsedInfo: collapsed.collapsedInfo,
      expandedInfo: collapsed.expandedInfo,
      collapsedBoxHeight: collapsed.collapsedBoxHeight,
      minHeight: collapsed.minHeight,
      expandedCollapse: collapsed.expandedCollapse
    };

    return (
      <div>
        {["xl", "lg", "md", "sm", "xs"].map((key) => {
          return (
            <MediaQuery
              minWidth={width_configs.min[key]}
              maxWidth={width_configs.max[key]}
              values={{ width: clientMD && clientMD.fakeDeviceWidth }}
              key={key}
            >
              {
                <CollapsedWrapper {...Collapse_props}>
                  <div
                    dangerouslySetInnerHTML={getMarkdownText(options.source)}
                    style={markdownStyle ? markdownStyle[key] : {}}
                    className={`${styles["markdown-style"]} markdown-style`}
                    onClick={onClick}
                  />
                </CollapsedWrapper>
              }
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

export default connect(mapStateToProps)(MarkdownMarked);
