import React, { Component } from "react";
import { Row } from "react-bootstrap";

import GalleryCarousel from "./GalleryCarousel/GalleryCarousel";
// import GalleryWithThumbnails from "./GalleryWithThumbnails/GalleryWithThumbnails";
import CustomModal from "../../../../components/Modal/CustomModal";

import styles from "./GalleryEnlarger.css";

/*
props: {
mode: GalleryCarousel, // or "GalleryWithThumbnails"
enableEnlarge: true,
settings: {} // if mode is "GalleryCarousel"
}
*/

class GalleryEnlarger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current_index: this.props.current_index || 0,
      enlarge_modal: false
    };
  }

  renderGalleryModal() {
    const { enlarge_modal } = this.state;
    const { current_index } = this.props;
    const modalProps = {
      size: "full",
      showModal: enlarge_modal,
      onHide: () => {
        this.setState({ enlarge_modal: false });
      }
    };
    const CarouselProps = {
      Gallery: this.props.Gallery,
      quality: "xl",
      settings: { initialSlide: current_index }
    };
    const height = window.document.documentElement.clientHeight - 30;
    const width = window.document.documentElement.clientWidth - 30;
    const maxWidth = height < 1200 ? height : 1200;
    const realWidth = width < maxWidth ? width : maxWidth;
    const paddingTop = height - realWidth > 0 ? (height - realWidth) / 2 : 0;

    return (
      <CustomModal {...modalProps}>
        <div className={`text-center ${styles.customModal}`}>
          <Row
            className={styles.modalGalleryWrapper}
            style={{ maxWidth: `${maxWidth}px`, paddingTop: `${paddingTop}px` }}
          >
            <GalleryCarousel {...CarouselProps} />
          </Row>
        </div>
      </CustomModal>
    );
  }

  render() {
    return (
      <div>
        <div
          className={styles.enlargeWrapper}
          onClick={() => {
            this.setState({
              enlarge_modal: true
            });
          }}
        >
          {this.props.children}
          <span className={styles.enlargeText}>
            {" "}
            <i className="ion-android-expand" />
            {" "}
            {"Click Image to Enlarge"}
            {" "}
          </span>
        </div>
        {this.state.enlarge_modal ? this.renderGalleryModal() : ""}
      </div>
    );
  }
}

export default GalleryEnlarger;
