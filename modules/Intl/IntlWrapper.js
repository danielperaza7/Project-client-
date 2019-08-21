import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";

export function IntlWrapper({ intl, children }) {
  return <IntlProvider {...intl}>{children}</IntlProvider>;
}

IntlWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  intl: PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl
  };
}

export default connect(mapStateToProps)(IntlWrapper);
