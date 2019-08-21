import React, { Component } from "react";
import _ from "lodash";
import Slider from "react-slick";
import Helmet from "react-helmet";

import { SLICK_CAROUSEL_CSS } from "../../../../../config/config";

import SingleType from "./SingleType";

import styles from "./TypeCarousel.css";

class TypeCarousel extends Component {
  componentDidMount() {
    this.refs.slider.slickGoTo();
  }

  componentDidUpdate() {
    this.refs.slider.slickGoTo(parseInt(this.props.selectedType) - 1);
  }

  render() {
    const { BreastType, handleChangeType, selectedType } = this.props;

    if (!BreastType) {
      return null;
    }

    const carouselItems = _.map(BreastType, (value, key) => {
      return (
        <div key={value.title}>
          {" "}
          <SingleType typeKey={key} singleType={value} />
          {" "}
        </div>
      );
    });

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrow: true,
      pauseOnHover: true,
      dots: false,
      lazyLoad: true,
      nextArrow: (
        <img src="https://storage.googleapis.com/evesetus/email/BREAST_TYPE/right_arrow.png" alt="" />
      ),
      prevArrow: (
        <img src="https://storage.googleapis.com/evesetus/email/BREAST_TYPE/left_arrow.png" alt="" />
      ),
      afterChange: (index) => {
        handleChangeType(`${index + 1}`, true);
      },
      initialSlide: parseInt(selectedType) - 1
    };

    return (
      <div className={styles.typeCarousel}>
        <Helmet link={SLICK_CAROUSEL_CSS} />
        <Slider ref="slider" {...settings}>
          {carouselItems}
        </Slider>
      </div>
    );
  }
}

export default TypeCarousel;
