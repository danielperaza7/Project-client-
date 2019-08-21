/*
  props:
    path:"product/h123456",
    click:true,
    url:null
*/

import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkWrapper.css";

const LinkWrapper = ({
  path, click, url, children, browserPushCallback
}) => {
  if (!click) {
    return <div className="link-wrapper">{children}</div>;
  }
  if (path) {
    const checkedKey = path[0] === "/" ? path : `/${path}`;
    return (
      <div className="link-wrapper">
        <Link
          to={checkedKey}
          style={{
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none"
          }}
          onClick={() => {
            if (browserPushCallback) {
              browserPushCallback();
            }
          }}
        >
          {children}
        </Link>
      </div>
    );
  }
  if (url) {
    return (
      <a href={url} className="link-wrapper" style={{ color: "rgba(0,0,0,0.87)" }}>
        {children}
      </a>
    );
  }
  // default return
  return <div className={styles["link-wrapper"]}>{children}</div>;
};

export default LinkWrapper;
