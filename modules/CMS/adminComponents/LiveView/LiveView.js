import React, { Component } from "react";
// import CMSRender from "../../pages/CMS/CMSRender";
import styles from "./LiveView.css";

class LiveView extends Component {
  render() {
    const { /* modules, meta, title, */ url_id, mode, width, height, is_new
    } = this.props;
    if (!url_id || url_id === "") {
      return <div>Need url_id to show CMS preview</div>;
    }
    if (is_new) {
      return <div>New CMS preview will be enable after being saved</div>;
    }
    const DEVToken = "ZHNhZmV3amIyMTRqayQzMiQjQCQhIUAxMiRzYWNmbnp4bQ=="; // ignore effective range, get data anyway
    /*
    const props = {
      modules: modules,
      meta: meta,
      title: title
    };
    */
    const iframeWidth = mode === "default" ? "100%" : width;
    const iframeHeight = mode === "default" ? "100%" : height;
    return (
      <div className={styles.liveViewWrapper}>
        <iframe
          src={`/page/${url_id}?devtoken=${DEVToken}`}
          width={iframeWidth}
          height={iframeHeight}
          ref="live_iframe"
        />
      </div>
    );
  }
}

// <CMSRender className={style.liveView} {...props}/>

export default LiveView;
