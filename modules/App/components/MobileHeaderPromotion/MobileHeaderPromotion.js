import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";

// getters
import { getClientMD } from "../../AppReducer";

class MobileHeaderPromotion extends Component {
  render() {
    const { clientMD } = this.props;
    return (
      <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
        <CMSBlock cmsid="header-promotions" />
      </MediaQuery>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(MobileHeaderPromotion);
