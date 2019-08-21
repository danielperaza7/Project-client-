import React, { Component } from "react";
import _ from "lodash";
import marked from "marked";
import { connect } from "react-redux";
import { Panel, PanelGroup } from "react-bootstrap";
import styles from "./FaqsPanel.css";
import { getClientMD } from "../../../App/AppReducer";

export const FaqsPanelInfo = {
  id: "panel",
  description: "panel for faqs",
  props: {
    Category: "categoryName",
    options: [
      { title: "panelTitle1", html: "panelContent1" },
      { title: "panelTitle2", html: "panelContent2" }
    ]
  }
};

class FaqsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedDetailIndex: ""
    };
    this.selectDetailEntry = this.selectDetailEntry.bind(this);
  }

  selectDetailEntry(index) {
    this.setState({
      expandedDetailIndex: this.setState.expandedDetailIndex === index ? null : `${index}`
    });
  }

  render() {
    const { options } = this.props;
    const content = options.map((option, index) => {
      if (!option || _.isEmpty(option)) {
        return null;
      }
      const title = (
        <Panel.Heading>
          <Panel.Title toggle>
            <span>{option.title}</span>
            <span className="pull-right">
              <i
                className={
                  `${index}` !== this.state.expandedDetailIndex
                    ? "ion-ios-arrow-down"
                    : "ion-ios-arrow-up"
                }
              />
            </span>
          </Panel.Title>
        </Panel.Heading>
      );
      return (
        <Panel
          key={index}
          id={option.title}
          eventKey={`${index}`}
          className={styles["single-panel"]}
        >
          {title}
          <Panel.Body collapsible>
            <div
              className={styles.panelContent}
              dangerouslySetInnerHTML={{ __html: marked(option.html) }}
            />
          </Panel.Body>
        </Panel>
      );
    });
    return (
      <PanelGroup
        accordion
        className={styles.panels}
        id="info-panels"
        onSelect={this.selectDetailEntry}
        // defaultActiveKey="0"
      >
        {content}
      </PanelGroup>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(FaqsPanel);
