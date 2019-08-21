import React, { Component } from "react";
import { connect } from "react-redux";
import { getClientMD } from "../../../App/AppReducer";
import styles from "./FileDownloader.css";

export const FileDownloaderInfo = {
  id: "file-downloader",
  description: "file downloader",
  image: "",
  props: {
    options: {
      source: "Employment Application Form",
      url:
        "https://hiddenfigure.evestemptation.com/email/Document/employmentApplication.pdf"
    }
  }
};

class FileDownloader extends Component {
  render() {
    let defaultName = this.props.options.url.split("/");
    defaultName = defaultName[defaultName.length - 1];
    return (
      <a
        className={styles.docLink}
        href={this.props.options.url}
        // download={this.props.options.fileName==''?defaultName:this.props.options.fileName}
      >
        {this.props.options.source}
      </a>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(FileDownloader);
