/*
  Gallery carousel built from react-bootstrap carousel
  props in Gallery
*/

import React, { Component } from "react";
import { Image, Col } from "react-bootstrap";
import Helmet from "react-helmet";
import Slider from "react-slick";

import GalleryEnlarger from "../GalleryEnlarger";

import styles from "./GalleryCarousel.css";
import { SLICK_CAROUSEL_CSS } from "../../../../../config/config";

class GalleryCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_index: 0
    };

    this.nextClick = this.nextClick.bind(this);
  }

  nextClick(current_index) {
    this.setState({ current_index });
  }

  render() {
    if (!this.props.Gallery || this.props.Gallery.length < 1) {
      return null;
    }
    const { quality = "md", onLoad } = this.props;
    const settings = {
      ...this.props.settings,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      lazyLoad: true,
      afterChange: this.nextClick
    };

    const ColSettings = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12
    };

    let carouselItems;
    if (this.props.enableEnlarge) {
      carouselItems = this.props.Gallery.map((item, index) => {
        return (
          <div key={index}>
            <GalleryEnlarger
              current_index={this.state.current_index}
              Gallery={this.props.Gallery}
            >
              <Image
                className={styles.image}
                src={item.images[quality].url}
                alt={item.title ? item.title : null}
                title={item.title ? item.title : null}
                responsive
                onLoad={index === 0 && onLoad ? onLoad : () => {}}
              />
            </GalleryEnlarger>
          </div>
        );
      });
    } else {
      carouselItems = this.props.Gallery.map((item, index) => {
        return (
          <div key={index}>
            <Image
              className={styles.image}
              src={item.images[quality].url}
              alt={item.title ? item.title : null}
              title={item.title ? item.title : null}
              responsive
              onLoad={index === 0 && onLoad ? onLoad : () => {}}
            />
          </div>
        );
      });
    }

    return (
      <Col {...ColSettings}>
        <Helmet link={SLICK_CAROUSEL_CSS} />
        <Slider className={styles.slider} {...settings}>
          {carouselItems}
        </Slider>
      </Col>
    );
  }
}

export default GalleryCarousel;
