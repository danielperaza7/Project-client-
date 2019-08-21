// import independent component
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getClientMD } from "../../../App/AppReducer";
import styles from "./KitDetail.css";
import // fetchKitDetailProducts,
// setFetchingKitDetailProducts,
"../../CategoryActions";
import // getKitDetailProducts,
"../../CategoryReducer";

class KitImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: 0,
      backgroundUrl: this.props.detail.background_image.lg
    };

    this.updateBackgroundAndNailpolishImage = this.updateBackgroundAndNailpolishImage.bind(
      this
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateBackgroundAndNailpolishImage);
  }

  updateBackgroundAndNailpolishImage() {
    const { detail } = this.props;
    if (window.innerWidth >= 1440) {
      this.setState({
        backgroundUrl: detail.background_image.lg
      });
    } else if (window.innerWidth >= 1024) {
      this.setState({
        backgroundUrl: detail.background_image.md
      });
    } else if (window.innerWidth >= 768) {
      this.setState({
        backgroundUrl: detail.background_image.sm
      });
    } else {
      this.setState({
        backgroundUrl: ""
      });
    }
  }

  selectButton(idx) {
    this.setState({
      chosen: idx
    });
    return true;
  }

  renderButtons(detailProducts) {
    // console.log('renderButtons', detailProducts);
    const colorHex = [];
    for (let i = 0; i < detailProducts.length; i++) {
      colorHex[i] = detailProducts[i].attr.color_hex[0].id;
    }

    return colorHex.map((e, idx) => {
      const hex = colorHex[idx];
      let activeStyle = null;
      let inactiveStyle = null;
      if (hex === "ffffff") {
        activeStyle = {
          backgroundColor: `#${hex}`,
          boxShadow: "0 0 0 1px #BEBEBE, inset 0 0 0 1px #BEBEBE",
          border: "solid 5px #FFF"
        };
        inactiveStyle = {
          backgroundColor: `#${hex}`,
          boxShadow: "0 0 0 1px #FFF, inset 0 0 0 1px #BEBEBE",
          border: "solid 5px #FFF"
        };
      } else {
        activeStyle = {
          backgroundColor: `#${hex}`,
          boxShadow: `0 0 0 1px #${hex}`,
          border: "solid 5px #FFFFFF"
        };
        inactiveStyle = {
          backgroundColor: `#${hex}`,
          boxShadow: "0 0 0 5px #FFFFFF",
          border: "solid 5px #FFFFFF"
        };
      }
      return (
        <li
          className={styles.kitRoundButton}
          style={this.state.chosen === idx ? activeStyle : inactiveStyle}
          key={idx}
          onClick={() => {
            this.selectButton(idx);
          }}
        />
      );
    });
  }

  renderKitContainerImage(urls) {
    return urls.map((ele, idx) => {
      return (
        <img
          className={styles.kitContainerImage}
          src={urls[idx].md.url || urls[idx].md}
          alt="Nail Polish"
          style={{ display: this.state.chosen === idx ? "inline-block" : "none" }}
          key={idx}
        />
      );
    });
  }

  renderContainerBody(urls, detailProducts) {
    return (
      <div className={styles.kitContainer}>
        {/* Kit Container left Part: Nail Polish Image */}
        <div className={styles.kitContainerImageContainer}>
          {this.renderKitContainerImage(urls)}
        </div>
        {/* Kit Container right part: button sets */}
        <ul className={styles.kitButtonContainer}>
          {this.renderButtons(detailProducts)}
        </ul>
      </div>
    );
  }

  render() {
    const { detail, detailProducts } = this.props;
    // console.log('KitImagePicker Render', this.props);
    const urls = [];
    for (let i = 0; i < detailProducts.length; i++) {
      urls[i] = detail.sub_image[detailProducts[i].sku] || detailProducts[i].images.main.images;
    }
    // console.log(urls);

    return (
      <div>
        <h3 className={styles.title}>{detail.kit_title}</h3>
        {/* KitImagePicker Body */}
        <div
          className={styles["kit-detail"]}
          style={{ backgroundImage: `url(${this.state.backgroundUrl})` }}
        >
          {this.renderContainerBody(urls, detailProducts)}
        </div>
      </div>
    );
  }
}

KitImagePicker.propTypes = {
  detail: PropTypes.object,
  detailProducts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  background_image: PropTypes.object,
  kit_title: PropTypes.object,
  clientMD: PropTypes.object,

  dispatch: PropTypes.func
};

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(KitImagePicker);
