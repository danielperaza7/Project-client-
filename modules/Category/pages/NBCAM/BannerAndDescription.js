import React, { Component } from "react";
import MediaQuery from "react-responsive";
import NbButton from "./NbcamButton";
import PopUpVideo from "./NBPopUpVideo";
import styles from "./NBCAM.css";

class BannerAndDescription extends Component {
  constructor() {
    super();
    this.state = {
      showModal1: false,
      showModal2: false
    };
    this.openModal1 = this.openModal1.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
  }

  openModal1() {
    this.setState({
      showModal1: true
    });
  }

  closeModal1() {
    this.setState({
      showModal1: false
    });
  }

  openModal2() {
    this.setState({
      showModal2: true
    });
  }

  closeModal2() {
    this.setState({
      showModal2: false
    });
  }

  renderBackgroundVideo() {
    return (
      // layer1: background video
      <figure>
        <MediaQuery minWidth={768}>
          <video
            playsInline
            autoPlay
            loop
            muted
            className={styles.backGroundVideoContainer}
          >
            <source
              src="https://hiddenfigure.evestemptation.com/15s-without-blackline_1.webm"
              type="video/webm"
            />
            <source
              src="https://hiddenfigure.evestemptation.com/15s-without-blackline.mp4"
              type="video/mp4"
            />
          </video>
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <img
            src="https://hiddenfigure.evestemptation.com/768x400_2.jpg"
            alt="background video alter"
            className={styles.backGroundImageContainer}
          />
        </MediaQuery>
      </figure>
    );
  }

  renderBannerWithResponsive() {
    return (
      // layer2: EveGoesPink title, anchor, and pink backgound
      <div>
        <div style={{ float: "right" }}>
          <div className={styles.titleBlock}>
            <span className={styles.poundSign}>#</span>
            <div className={styles.title}>EVESGOESPINK</div>
            <div className={styles.subTitile}>FIND CONFIDENCE IN THE PERFECT FIT</div>
          </div>
          <div className={styles.bannerBlockWithCursor}>
            <div className={styles.singleLink}>
              <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
              <a href="#section0">Event Gallery</a>
            </div>
            <div className={styles.singleLink}>
              <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
              <a href="#section1">Our curated list for you</a>
            </div>
            <div className={styles.singleLink}>
              <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
              <a href="#section2">Earn extra reward points</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.bannerContainer}>
        {this.renderBackgroundVideo()}
        {this.renderBannerWithResponsive()}
        {/* watch the event Video button */}
        <PopUpVideo showModal={this.state.showModal1} onHide={this.closeModal1}>
          <video
            controls="true"
            preload="yes"
            className={styles.popUpVideo}
            poster="https://hiddenfigure.evestemptation.com/1920x1080.jpg"
          >
            <source
              src="https://hiddenfigure.evestemptation.com/WeChatSight.webm"
              type="video/webm"
            />
            <source
              src="https://hiddenfigure.evestemptation.com/WeChatSight241_2_1.mp4"
              type="video/mp4"
            />
          </video>
        </PopUpVideo>
        <PopUpVideo showModal={this.state.showModal2} onHide={this.closeModal2}>
          <video
            controls="true"
            preload="yes"
            className={styles.popUpVideo}
            poster="https://hiddenfigure.evestemptation.com/0930_1920x1080.jpg"
          >
            <source
              src="https://hiddenfigure.evestemptation.com/0930_2.mp4"
              type="video/mp4"
            />
          </video>
        </PopUpVideo>
        <div className={styles.buttonGroups}>
          <NbButton
            buttonStyle={styles.nbButton}
            textStyle={styles.nbButtonText1}
            onClick={this.openModal1}
            iconStyle={styles.nbButtonIconImage}
            iconName="ion-social-youtube"
            text="Store Event"
            iconImage="https://hiddenfigure.evestemptation.com/SocialMedia_YouTube.svg"
            isIcon={false}
          />
          <NbButton
            buttonStyle={styles.nbButton}
            textStyle={styles.nbButtonText2}
            onClick={this.openModal2}
            iconStyle={styles.nbButtonIconImage}
            iconName="ion-social-youtube"
            text="5k Walk Event"
            iconImage="https://hiddenfigure.evestemptation.com/SocialMedia_YouTube.svg"
            isIcon={false}
          />
        </div>
      </div>
    );
  }
}

export default BannerAndDescription;
