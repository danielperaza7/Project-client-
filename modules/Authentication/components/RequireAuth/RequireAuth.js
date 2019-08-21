/*
 * This component is a high order component, its only purpose is to restrict user from login into protected resource
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import selector
import { getAuthStatus } from "../../AuthReducer";

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push("/signin");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push("/signin");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(store) {
    return {
      authenticated: getAuthStatus(store)
    };
  }

  return connect(mapStateToProps)(Authentication);
}
