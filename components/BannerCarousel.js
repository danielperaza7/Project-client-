/**
 * This component is for creating the carousel whose children items contain one image and one link
 * And also with an optional caption
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

class BannerCarousel extends Component {
  renderItemList() {
    if (!this.props.itemList) return "loading";
    return this.props.itemList.map((item) => {
      let cap = null;
      if (item.caption) {
        cap = (
          <CarouselCaption>
            <p>{item.caption}</p>
          </CarouselCaption>
        );
      }
      return (
        <CarouselItem key={item.link}>
          <Link to={item.link}>
            <img src={item.img} alt="" />
          </Link>
          {cap}
        </CarouselItem>
      );
    });
  }

  render() {
    return <Carousel>{this.renderItemList()}</Carousel>;
  }
}

export default BannerCarousel;
