// import { connect } from "react-redux";
import React from "react";
// import { getClientMD } from "../../../App/AppReducer";
import styles from "./FooterNotice.css";

export const FooterNoticeInfo = {
  id: "footer-notice",
  description: "footer notice content",
  image: "",
  props: {
    options: {
      source: "footer notice content"
    }
  }
};

const FooterNotice = React.memo(
  ({ options = {} }) => options.source && <div className={styles.notice}>{options.source}</div>
);

export default FooterNotice;
