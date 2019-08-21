/*
 Default breadcrumb
*/

import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./BreadcrumbDefault.css";

export default class BreadcrumbDefault extends Component {
  render() {
    const breadcrumbs = this.props.breadcrumbs;
    if (!breadcrumbs || breadcrumbs.length < 1) {
      return null;
    }
    return (
      <Breadcrumb className={styles["breadcrumb-wrapper"]}>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Breadcrumb.Item active className={styles["breadcrumb-name"]} key={index}>
              <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  }
}
