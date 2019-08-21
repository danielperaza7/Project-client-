/* eslint-disable react/destructuring-assignment */
/**
 * Created by dongyu on 8/24/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import { fetchCMSIdContent } from "../../../CMS/CMSActions";
import styles from "./TodaysOffers.css";
import { PushDL_EventData } from "../../../Analytics/components/GA";

const cmsid = "todays_offers";

class TodaysOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false,
      goDown: false
    };
    this.onToggle = this.onToggle.bind(this);
    this.clickTodaysOfferPromotionEvent = this.clickTodaysOfferPromotionEvent.bind(this);
  }

  componentDidMount() {
    if (!window) {
      return; // do not render this part while SSR
    }
    const params = {
      id: cmsid,
      country: "us",
      lan: "en"
    };
    this.props.dispatch(fetchCMSIdContent(params, "user"));
  }

  componentDidUpdate() {
    try {
      if (this.state.showContent) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.style.overflow = "auto";
      }
    } catch (err) {
      console.error(err);
    }
  }

  onToggle() {
    if (this.state.showContent) {
      // hide panel
      this.setState({
        goDown: true
      });
      window.setTimeout(() => {
        this.setState({
          showContent: false,
          goDown: false
        });
      }, 950);
    } else {
      // show panel
      this.setState({
        showContent: !this.state.showContent
      });
      // push click data to GA if necassary
      const Eventdata = {
        eventCategory: "Main events",
        eventAction: "Click",
        eventLabel: "Sticky Sale Button clicked"
      };
      PushDL_EventData("normalComponentClicked", Eventdata);
    }
  }

  clickTodaysOfferPromotionEvent(e) {
    if (e.target.alt) {
      this.setState({
        goDown: true
      });
      window.setTimeout(() => {
        this.setState({
          showContent: false,
          goDown: false
        });
      }, 950);
    }
  }

  render() {
    const modules = this.props.blocks && this.props.blocks.todays_offers
      ? this.props.blocks.todays_offers.modules
      : "";
    if (typeof window !== "undefined") {
      if (
        this.props.notShowPage.includes(window.location.pathname)
        || window.location.pathname.split("/")[1] === "cms"
        || !modules
        || modules.length === 0
      ) {
        return <div />;
      }
    }

    return (
      <div
        className={
          this.state.showContent
            ? this.state.goDown
              ? styles["go-down"]
              : styles["background-mask"]
            : "not-show"
        }
        style={{ zIndex: 4 }}
      >
        <div
          className={
            this.state.showContent
              ? styles["TodaysOffers-wrapper-mask"]
              : styles["not-show-mask"]
          }
          onClick={this.onToggle}
        />
        <div className={styles["TodaysOffers-wrapper"]}>
          <div className={styles["TodaysOffers-btn"]} onClick={this.onToggle}>
            <span>
              <i className="ion-pricetag" />
            </span>
            <span>SALE</span>
          </div>
          {this.state.showContent ? (
            <div
              className={styles["content-wrapper"]}
              onClick={this.clickTodaysOfferPromotionEvent}
            >
              <div className={styles["top-bar"]}> </div>
              <CMSBlock {...{ cmsid }} />
              <div className={styles["close-btn"]} onClick={this.onToggle}>
                <span>CLOSE</span>
                <i className="ion-android-close" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    blocks: state.cms.cms_block
  };
}

export default connect(mapStateToProps)(TodaysOffers);
