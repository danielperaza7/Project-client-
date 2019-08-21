import React, { Component } from "react";
import Helmet from "react-helmet";
import NoProduct from "../../Category/components/CategoryList/NoProduct";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Page Not Found" />
        <NoProduct msg="Page Not Found: 404" />
      </div>
    );
  }
}

export default NotFoundPage;
