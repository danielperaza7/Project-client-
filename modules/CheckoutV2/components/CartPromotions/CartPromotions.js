import React, { Component } from "react";
import { connect } from "react-redux";
import marked from "marked";
import styles from "./CartPromotions.css";

import CustomModal from "../../../../components/Modal/CustomModal";
import { fetchCMSIdContent } from "../../../CMS/CMSActions";

import { getCMSBlock } from "../../../CMS/CMSReducer";

class CartPromotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      detailsIndex: null
    };
    this.showDetails = this.showDetails.bind(this);
    this.handleCMSIdContentResponse = this.handleCMSIdContentResponse.bind(this);
  }

  componentDidMount() {
    if (!window) {
      return; // do not render this part while SSR
    }
    const { cmsBlocks } = this.props;
    if (!cmsBlocks || !cmsBlocks["header-promotions"]) {
      this.props.dispatch(
        fetchCMSIdContent(
          { id: "header-promotions", country: "US", lan: "en" },
          "user",
          this.handleCMSIdContentResponse
        )
      );
    }
  }

  handleCMSIdContentResponse(success, msg) {
    console.log("handleCMSIdContentResponse", success, msg);
  }

  showDetails(index) {
    this.setState({
      showDetails: true,
      detailsIndex: index
    });
  }

  render() {
    const modalProps = {
      size: "medium",
      showModal: this.state.showDetails,
      onHide: () => {
        this.setState({ showDetails: false });
      }
    };
    const { cmsBlocks } = this.props;
    let data = [];
    if (!cmsBlocks || !cmsBlocks["header-promotions"]) return null;
    try {
      const markdown = cmsBlocks["header-promotions"].modules[0].configs.positions[1].components[0].props
        .markdowns;
      if (Array.isArray(markdown) && markdown.length > 0) {
        data = markdown.map((item) => {
          return { brief: item.basic.lg, details: item.detail.lg };
        });
      }
    } catch (err) {
      console.error("CartPromotion parsing data error");
    }
    return (
      <div className={styles.CartPromotions}>
        {data.map((ele, index) => {
          return (
            <div key={index}>
              <div
                dangerouslySetInnerHTML={{ __html: marked(ele.brief) }}
                className={styles.brief}
              />
              <button
                onClick={() => {
                  this.showDetails(index);
                }}
                className={styles.detailsBtn}
              >
                Details
              </button>
            </div>
          );
        })}
        <CustomModal {...modalProps}>
          <span
            className={styles.detailsContent}
            dangerouslySetInnerHTML={{
              __html: marked(
                this.state.showDetails ? data[this.state.detailsIndex].details : ""
              )
            }}
          />
        </CustomModal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    cmsBlocks: getCMSBlock(store)
  };
}

export default connect(mapStateToProps)(CartPromotions);
