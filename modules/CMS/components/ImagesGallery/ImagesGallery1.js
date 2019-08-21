import React, { Component } from "react";
import Helmet from "react-helmet";
import Slider from "react-slick";
import { SLICK_CAROUSEL_CSS } from "../../../../config/config";
import ComponentContainer from "../ComponentContainer";
import styles from "./ImagesGallery1.css";

export const ImagesGallery1Info = {
  id: "images_gallery_1",
  description: "show a gallery of images with links",
  image: "",
  props: {
    image_type: 1,
    settings: {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 8000,
      pauseOnHover: true,
      dots: true,
      lazyLoad: true
    },
    gallery: [
      {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          key: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare"
      },
      {
        image_url: {
          xl:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
          lg:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
          md:
            "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
        },
        link: {
          path: "product/h123456",
          click: true,
          url: null
        },
        description: "Eve by Eve's Skincare",
        title: "Eve by Eve's Skincare"
      }
    ],
    arrow_style: "basic" // 'circle', 'semicircle', 'no_arrow'
  }
};

let autoplayTimer;

class ImagesGallery1 extends Component {
  constructor(props) {
    super(props);

    const settings = this.props.settings || ImagesGallery1Info.props.settings;
    const currentBP = settings.responsive
      ? settings.responsive.find((resp) => {
        return resp.breakpoint > window.document.documentElement.clientWidth;
      })
      : "";

    this.state = {
      current_index: 0,
      length: this.props.gallery
        ? this.props.gallery.length
        : this.props.settings.slidesToShow,
      slidesToShow: currentBP ? currentBP.settings.slidesToShow : settings.slidesToShow,
      slidesToScroll: currentBP
        ? currentBP.settings.slidesToScroll
        : settings.slidesToScroll,
      autoplay: settings.autoplay,
      autoplaySpeed: settings.autoplaySpeed || 5000
    };

    this.autoplay = this.autoplay.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.afterChange = this.afterChange.bind(this);
  }

  componentDidMount() {
    if (this.state.autoplay) {
      autoplayTimer = window.setInterval(this.autoplay, this.state.autoplaySpeed);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery) {
      this.setState({ length: nextProps.gallery.length });
    }
  }

  componentWillUnmount() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
    }
  }

  onMouseEnter() {
    if (this.state.autoplay) {
      window.clearInterval(autoplayTimer);
    }
  }

  onMouseLeave() {
    if (this.state.autoplay) {
      autoplayTimer = window.setInterval(this.autoplay, this.state.autoplaySpeed);
    }
  }

  autoplay() {
    if (this.refs.slider) this.refs.slider.slickNext();
  }

  afterChange(current_index) {
    this.setState({ current_index });
  }

  render() {
    const {
      responsive,
      gallery,
      arrow_style,
      image_type,
      promData,
      creative
    } = this.props;
    const settings = this.props.settings || ProductsGallery1Info.props.settings;

    if (!gallery) {
      return null;
    }

    const carouselItems = gallery.map((image, index) => {
      const range = {
        min: this.state.current_index,
        max: this.state.current_index + this.state.slidesToShow
      };
      const props = {
        id: `image_${image_type || 1}`,
        props: image.promData
          ? image
          : {
            ...image,
            promData
          },
        creative,
        responsive,
        position: index + 1,
        scrollDirection: "horizontal",
        notVisible: index < range.min || index >= range.max
      };
      return (
        <div key={index}>
          <ComponentContainer {...props} />
        </div>
      );
    });
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={styles.sliderWrapper}
      >
        <Helmet link={SLICK_CAROUSEL_CSS} />
        <Slider
          ref="slider"
          className={`${arrow_style || "basic"} ${styles.slider}`}
          {...settings}
          autoplay={false}
          afterChange={(current_index) => {
            this.afterChange(current_index);
          }}
        >
          {carouselItems}
        </Slider>
      </div>
    );
  }
}

export default ImagesGallery1;
