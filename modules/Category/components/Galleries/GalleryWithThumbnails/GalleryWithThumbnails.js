/*
  Image Galler with Thumbnails
*/
import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";

import GalleryEnlarger from "../GalleryEnlarger";
import styles from "./GalleryWithThumbnails.css";

class GalleryWithThumbnails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // images_qty:this.props.Gallery.length,
      current_page: 1,
      page_size: 5,
      current_pos: 0,
      hover_pos: -1
    };
  }

  setCurrentPos(index) {
    this.setState({
      current_pos: index
    });
  }

  setHoverPos(index) {
    this.setState({
      hover_pos: index
    });
  }

  resetHoverPos() {
    this.setState({
      hover_pos: -1
    });
  }

  showNextGroup() {
    if (this.state.current_page * this.state.page_size < this.props.Gallery.length) {
      const nextPage = this.state.current_page + 1;
      this.setState({
        current_page: nextPage,
        current_pos: 0
      });
    }
  }

  showLastGroup() {
    if (this.state.current_page > 1) {
      const lastPage = this.state.current_page - 1;
      this.setState({
        current_page: lastPage,
        current_pos: 0
      });
    }
  }

  renderImageThumbnails() {
    // check input data, otherwise return null
    if (this.props.Gallery && this.props.Gallery.length > 0) {
      const helpArray = [];
      for (let i = 0; i < this.state.page_size; i++) {
        helpArray.push(i);
      }
      const ThumbnailList = helpArray.map((index) => {
        const imageIndex = (this.state.current_page - 1) * this.state.page_size + index;
        if (imageIndex < this.props.Gallery.length) {
          const Gallery_Name = this.props.Gallery[imageIndex].title
            ? this.props.Gallery[imageIndex].title
            : null;
          return (
            <li
              key={imageIndex}
              onMouseEnter={() => this.setHoverPos(index)}
              onMouseLeave={() => this.resetHoverPos(index)}
              onClick={() => this.setCurrentPos(index)}
              className={`${
                index === this.state.current_pos ? styles["current-thumbnail"] : ""
              } ${styles.thumbnail}`}
            >
              <div>
                <Image
                  src={this.props.Gallery[imageIndex].images.xs.url}
                  alt={Gallery_Name}
                  title={Gallery_Name}
                  responsive
                />
              </div>
            </li>
          );
        }
        return null;
      });
      return ThumbnailList;
    }
    return null;
  }

  // calcHeight(node){
  //   console.log("====", node.offsetHeight);
  //   if (node && !this.state.height) {
  //     this.setState({
  //         page_size: Math.floor(node.offsetHeight/60)
  //     });
  //   }
  // }

  render() {
    if (!this.props.Gallery) {
      return null;
    }
    const ColSettings = {
      left: {
        lg: 2, md: 2, sm: 2, xs: 2
      },
      right: {
        lg: 10, md: 10, sm: 10, xs: 10
      }
    };

    const showPos = this.state.hover_pos === -1 ? this.state.current_pos : this.state.hover_pos;
    const showImageIndex = (this.state.current_page - 1) * this.state.page_size + showPos;
    let currentImage = this.props.Gallery
      && this.props.Gallery[showImageIndex]
      && this.props.Gallery[showImageIndex].images
      ? this.props.Gallery[showImageIndex].images.lg
      : "";
    // for gif use md, for non-gif use lg
    if (currentImage && currentImage !== "" && currentImage.url.indexOf(".gif") > -1) {
      currentImage = this.props.Gallery[showImageIndex].images.md;
    }
    const currentImage_name = this.props.Gallery
      && this.props.Gallery[showImageIndex]
      && this.props.Gallery[showImageIndex].title
      ? this.props.Gallery[showImageIndex].title
      : "";
    const showLastGroupArrow = this.state.current_page > 1;
    const showNextGroupArrow = this.state.current_page * this.state.page_size < this.props.Gallery.length;
    const current_index = (this.state.current_page - 1) * this.state.page_size + this.state.current_pos;
    return (
      <div className={styles["gallery-wrapper"]}>
        <Col {...ColSettings.left}>
          <ul className={styles["verti-bar"]}>
            <li
              className={showLastGroupArrow ? "" : "hidden"}
              onClick={() => this.showLastGroup()}
            >
              <i className="ion-ios-arrow-up" />
            </li>
            {this.renderImageThumbnails()}
            <li
              className={showNextGroupArrow ? "" : "hidden"}
              onClick={() => this.showNextGroup()}
            >
              <i className="ion-ios-arrow-down" />
            </li>
          </ul>
        </Col>
        <Col {...ColSettings.right}>
          {this.props.enableEnlarge ? (
            <div>
              <GalleryEnlarger current_index={current_index} Gallery={this.props.Gallery}>
                <Image
                  src={currentImage.url}
                  responsive
                  ref="mainImage"
                  onLoad={
                    current_index === 0 && this.props.onLoad
                      ? this.props.onLoad
                      : () => {}
                  }
                  alt={currentImage_name}
                  title={currentImage_name}
                />
              </GalleryEnlarger>
            </div>
          ) : (
            <Image
              src={currentImage.url}
              alt={currentImage_name}
              title={currentImage_name}
              responsive
              onLoad={
                current_index === 0 && this.props.onLoad ? this.props.onLoad : () => {}
              }
            />
          )}
        </Col>
      </div>
    );
  }
}

export default GalleryWithThumbnails;
