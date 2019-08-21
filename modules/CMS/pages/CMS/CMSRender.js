import React, { Component } from "react";
import LayoutContainer from "../../layouts/LayoutContainer";
import DefaultMask from "../../../../components/masks/DefaultMask";
import CircleLoader from "../../../../components/masks/CircleLoader";

// eslint-disable-next-line react/prefer-stateless-function
class CMSRender extends Component {
  render() {
    const { modules, cms_type, cmsid } = this.props;

    if (!modules || modules === null) {
      return cms_type === "page" ? <DefaultMask /> : <CircleLoader />;
    }
    if (modules.length < 1) {
      return null;
    }

    const renderModules = modules.map((module, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <LayoutContainer
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            {...module}
            cmsid={cmsid}
            layoutIndex={index + 1}
          />
        </div>
      );
    });
    return <div>{renderModules}</div>;
  }
}
export default CMSRender;
