import React, { Component } from "react";
import { Carousel, Glyphicon } from "react-bootstrap";
import MediaQuery from "react-responsive";

import {
  STOREPAGE_GALLERY_IMAGES_THUMBNAIL,
  STOREPAGE_GALLERY_IMAGES
} from "../../../../config/config";
import styles from "./StorePage.css";
import PopUpImage from "./NBPopUpImage";

class NBCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      prevIcon: <Glyphicon style={{ color: "#FD71A3" }} glyph="chevron-left" />,
      nexiIcon: <Glyphicon style={{ color: "#FD71A3" }} glyph="chevron-right" />,
      showModal: false,
      popUpImageSrc: STOREPAGE_GALLERY_IMAGES[0]
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(idx) {
    this.setState({
      showModal: true,
      popUpImageSrc: STOREPAGE_GALLERY_IMAGES[idx]
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  renderGalleryCellDesktopAndTablet(img1, img2, idx1, idx2) {
    return (
      <div style={{ marginRight: "16px" }}>
        <MediaQuery minWidth={768}>
          <div className={styles.galleryCellContainer}>
            <div style={{ marginTop: "68px" }}>
              <img
                width={256}
                height={167}
                alt="250X167"
                src={img1}
                onClick={() => {
                  this.setState({
                    showModal: true,
                    popUpImageSrc: STOREPAGE_GALLERY_IMAGES[idx1]
                  });
                }}
              />
            </div>
            <div style={{ marginLeft: "266px", marginTop: "16px" }}>
              <img
                width={256}
                height={167}
                alt="250X167"
                src={img2}
                onClick={() => {
                  this.setState({
                    showModal: true,
                    popUpImageSrc: STOREPAGE_GALLERY_IMAGES[idx2]
                  });
                }}
              />
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }

  renderGalleryCellCellphone(img, index) {
    return (
      <div style={{ marginRight: "16px" }}>
        <MediaQuery maxWidth={767}>
          <div className={styles.galleryCellContainer}>
            <div style={{ marginTop: "40px" }}>
              <img
                width={256}
                height={167}
                alt="250X167"
                src={img}
                onClick={() => {
                  this.setState({
                    showModal: true,
                    popUpImageSrc: STOREPAGE_GALLERY_IMAGES[index]
                  });
                }}
              />
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }

  renderCarouselItemDesktop() {
    const component = [];
    for (let i = 0; i < STOREPAGE_GALLERY_IMAGES_THUMBNAIL.length; i += 4) {
      const curImg = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i];
      const curImgPlusOne = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i + 1];
      const curImgPlusTwo = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i + 2];
      const curImgPlusThree = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i + 3];

      component.push(
        <Carousel.Item>
          <div className={styles.carouselItemContainer}>
            {this.renderGalleryCellDesktopAndTablet(curImg, curImgPlusOne, i, i + 1)}
            {this.renderGalleryCellDesktopAndTablet(
              curImgPlusTwo,
              curImgPlusThree,
              i + 2,
              i + 3
            )}
          </div>
        </Carousel.Item>
      );
    }
    return component;
  }

  renderCarouselItemTablet() {
    const component = [];
    for (let i = 0; i < STOREPAGE_GALLERY_IMAGES_THUMBNAIL.length; i += 2) {
      const curImg = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i];
      const curImgPlusOne = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i + 1];
      component.push(
        <Carousel.Item>
          <div className={styles.carouselItemContainer}>
            {this.renderGalleryCellDesktopAndTablet(curImg, curImgPlusOne, i, i + 1)}
          </div>
        </Carousel.Item>
      );
    }
    return component;
  }

  renderCarouselItemCellphone() {
    const component = [];
    for (let i = 0; i < STOREPAGE_GALLERY_IMAGES_THUMBNAIL.length; i++) {
      const curImg = STOREPAGE_GALLERY_IMAGES_THUMBNAIL[i];
      component.push(
        <Carousel.Item>
          <div className={styles.carouselItemContainer}>
            {this.renderGalleryCellCellphone(curImg, i)}
          </div>
        </Carousel.Item>
      );
    }
    return component;
  }

  render() {
    const { prevIcon, nexiIcon } = this.state;
    return (
      <div>
        <div>{/* {this.renderCarouselTitle()} */}</div>
        <PopUpImage
          showModal={this.state.showModal}
          onHide={this.closeModal}
          src={this.state.popUpImageSrc}
        />
        <div className={styles.carouselContainer}>
          <MediaQuery minWidth={1048}>
            <Carousel indicators={false} prevIcon={prevIcon} nextIcon={nexiIcon}>
              {this.renderCarouselItemDesktop()}
            </Carousel>
          </MediaQuery>
          <MediaQuery minWidth={768} maxWidth={1047}>
            <Carousel indicators={false} prevIcon={prevIcon} nextIcon={nexiIcon}>
              {this.renderCarouselItemTablet()}
            </Carousel>
          </MediaQuery>
          <MediaQuery maxWidth={767}>
            <Carousel indicators={false} prevIcon={prevIcon} nextIcon={nexiIcon}>
              {this.renderCarouselItemCellphone()}
            </Carousel>
          </MediaQuery>
        </div>
      </div>
    );
  }
}

export default NBCarousel;
