import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import _ from "lodash";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { getClientMD } from "../../App/AppReducer";

class GeneralLayout extends Component {
  render() {
    if (!this.props) {
      return null;
    }
    const {
      colSettings,
      inline_classNames = "",
      inline_styles = {},
      componentsAtPositions,
      responsive,
      clientMD
    } = this.props;
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    if (!colSettings) return null;

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
              {!responsive || responsive[key] ? (
                <Row className={inline_classNames} style={inline_styles}>
                  {_.map(componentsAtPositions, (value, key) => {
                    return (
                      <Col {...colSettings[key]} key={key}>
                        {" "}
                        {value}
                        {" "}
                      </Col>
                    );
                  })}
                </Row>
              ) : null}
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

export default connect(mapStateToProps)(GeneralLayout);
