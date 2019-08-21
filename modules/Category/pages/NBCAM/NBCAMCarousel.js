import React, { Component } from "react";
import { Carousel, Glyphicon } from "react-bootstrap";
import MediaQuery from "react-responsive";
// import ScrollableAnchor from "react-scrollable-anchor";

import {
  NBCAM_GALLERY_IMAGES_THUMBNAIL,
  NBCAM_GALLERY_IMAGES
} from "../../../../config/config";
import styles from "./NBCAM.css";
import PopUpImage from "./NBPopUpImage";

class NBCarousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      prevIcon: <Glyphicon style={{ color: "#FD71A3" }} glyph="chevron-left" />,
      nexiIcon: <Glyphicon style={{ color: "#FD71A3" }} glyph="chevron-right" />,
      showModal: false,
      popUpImageSrc: NBCAM_GALLERY_IMAGES[0]
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(idx) {
    this.setState({
      showModal: true,
      popUpImageSrc: NBCAM_GALLERY_IMAGES[idx]
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  // renderCarouselTitle() {
  //   return (
  //     <div className={styles.eventGalleryTitleAndDescription}>
  //       <ScrollableAnchor id={'section0'}><div /></ScrollableAnchor>
  //       <div className={styles.eventGalleryTitle}>
  //         <MediaQuery minWidth={992}>
  //           <img
  //             src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart.svg"
  //             className={styles.pinkHeart}
  //             alt="pink heart"
  //           />
  //           <span style={{ margin: '0px 32px' }}>Event Gallery</span>
  //           <img
  //             src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart_reverse.svg"
  //             className={styles.pinkHeart} alt="reverse pink heart"
  //           />
  //         </MediaQuery>
  //         <MediaQuery maxWidth={991} >
  //           <span>Event Gallery</span>
  //         </MediaQuery>
  //       </div>
  //       <div className={styles.eventGalleryDescription}>
  //         <span style={{ lineHeight: '24px' }}>
  //         In support of raising awareness to the importance of breast health, we participated in Making Strides Against Breast Cancer walks in our community.
  //         We invited influencers of all backgrounds to our #EvesGoesPink event in Beverly Hills where we educated them on our core values as a brand that regardless of shape and size,
  //         everyone should feel confident in their own skin.
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

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
                    popUpImageSrc: NBCAM_GALLERY_IMAGES[idx1]
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
                    popUpImageSrc: NBCAM_GALLERY_IMAGES[idx2]
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
                    popUpImageSrc: NBCAM_GALLERY_IMAGES[index]
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
    for (let i = 0; i < NBCAM_GALLERY_IMAGES_THUMBNAIL.length; i += 4) {
      const curImg = NBCAM_GALLERY_IMAGES_THUMBNAIL[i];
      const curImgPlusOne = NBCAM_GALLERY_IMAGES_THUMBNAIL[i + 1];
      const curImgPlusTwo = NBCAM_GALLERY_IMAGES_THUMBNAIL[i + 2];
      const curImgPlusThree = NBCAM_GALLERY_IMAGES_THUMBNAIL[i + 3];

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
    for (let i = 0; i < NBCAM_GALLERY_IMAGES_THUMBNAIL.length; i += 2) {
      const curImg = NBCAM_GALLERY_IMAGES_THUMBNAIL[i];
      const curImgPlusOne = NBCAM_GALLERY_IMAGES_THUMBNAIL[i + 1];
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
    for (let i = 0; i < NBCAM_GALLERY_IMAGES_THUMBNAIL.length; i++) {
      const curImg = NBCAM_GALLERY_IMAGES_THUMBNAIL[i];
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
