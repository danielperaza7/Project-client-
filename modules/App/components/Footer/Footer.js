import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { injectIntl, FormattedMessage } from "react-intl";
import MediaQuery from "react-responsive";
import { postNewsLetter } from "../../../Customer/CustomerActions.js";
import LinkWrapper from "../../../CMS/components/LinkWrapper/LinkWrapper";
import LiveChatTrigger from "../../../../components/LiveChatTrigger";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import styles from "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newsvalue: "",
      showModal: false,
      showModal_wechat: false,
      modal_msg: "",
      email_err: false
    };
    this.onsubmit = this.onsubmit.bind(this);
    this.onclick_wechat = this.onclick_wechat.bind(this);
    this.close = this.close.bind(this);
    this.close_wechat = this.close_wechat.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.onchange = this.onchange.bind(this);
  }

  onclick_wechat() {
    this.setState({
      showModal_wechat: true
    });
  }

  onsubmit(event) {
    console.log("newsvalue", this.state.newsvalue);
    console.log("handleModal", this.handleModal);
    event.preventDefault();
    this.setState({ newsvalue: "" });
    this.props.dispatch(postNewsLetter(this.state.newsvalue, this.handleModal));
  }

  onchange(input) {
    const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if (input && !myreg.test(input)) this.setState({ newsvalue: input, email_err: true });
    else {
      this.setState({ newsvalue: input, email_err: false });
    }
    console.log("newsletter", this.state.newsvalue);
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  handleModal(err, msg) {
    console.log("something will happen");
    if (err) {
      this.setState({
        modal_msg: msg,
        showModal: true
      });
    } else {
      this.setState({
        modal_msg: "Thank you for your subscription.",
        showModal: true
      });
    }
  }

  close_wechat() {
    this.setState({
      showModal_wechat: false
    });
  }

  renderContactUs() {
    if (!this.props.footer) {
      return "loading";
    }
    return this.props.footer.contactUs.map((item) => {
      let content = null;
      if (item.title === "visit") {
        content = item.content.map((obj) => {
          return <div key={obj}>{obj}</div>;
        });
      }
      return (
        <div
          className={`${styles["footer-item"]} col-md-3 col-sm-6 col-xs-12`}
          key={item.title} /* style={{marginTop:"10px"}} */
        >
          <span className={`icon ${item.icon}`} />
          <div className={styles.title}>{item.title}</div>
          <div className={styles.content}>{!content ? item.content : content}</div>
          <div className={styles.link}>
            {item.title === "live chat" ? (
              <div>
                <LiveChatTrigger>{item.link}</LiveChatTrigger>
              </div>
            ) : (
              <LinkWrapper {...item.link_options}>{item.link}</LinkWrapper>
            )}
          </div>
        </div>
      );
    });
  }

  renderUsefulInfo() {
    if (!this.props.footer) {
      return "loading";
    }

    return this.props.footer.usefulInfo.map((item) => {
      return (
        <LinkWrapper {...item.link_options} key={item.title}>
          {item.title.toUpperCase()}
        </LinkWrapper>
      );
    });
  }

  renderThreeColumns() {
    return (
      <div className={styles.infoPanel}>
        <div className={styles.infoPanelCol}>
          <LinkWrapper {...{ path: "/account/dashboard/", click: true }}>
            YOUR ACCOUNT
          </LinkWrapper>
          <LinkWrapper {...{ path: "/membershipRule", click: true }}>
            EVE'S MEMBERSHIP
          </LinkWrapper>
        </div>
        <div className={styles.infoPanelCol}>
          <LinkWrapper {...{ path: "/page/shipping", click: true }}>
            SHIPPING POLICY
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/return", click: true }}>
            RETURN & EXCHANGE POLICY
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/giftcard", click: true }}>
            GIFTCARD POLICY
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/faqs", click: true }}>FAQS</LinkWrapper>
        </div>
        <div className={styles.infoPanelCol}>
          <LinkWrapper {...{ path: "/page/about-us", click: true }}>ABOUT US</LinkWrapper>
          <div>
            <a className={styles.linkWrapper} href="http://blog.evestemptation.com/">
              BLOG
            </a>
          </div>
          <LinkWrapper {...{ path: "/page/career", click: true }}>CAREERS</LinkWrapper>
          <LinkWrapper {...{ path: "/page/store-location", click: true }}>
            STORE LOCATIONS
          </LinkWrapper>
        </div>
      </div>
    );
  }

  renderTwoColumns() {
    return (
      <div className={styles.infoPanel}>
        <div className={styles.infoPanelCol}>
          <LinkWrapper {...{ path: "/account/dashboard/", click: true }}>
            YOUR ACCOUNT
          </LinkWrapper>
          <LinkWrapper {...{ path: "/membershipRule", click: true }}>
            EVE'S MEMBERSHIP
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/shipping", click: true }}>
            SHIPPING POLICY
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/return", click: true }}>
            RETURN & EXCHANGE POLICY
          </LinkWrapper>
          <LinkWrapper {...{ path: "/page/giftcard", click: true }}>
            GIFTCARD POLICY
          </LinkWrapper>
          {/* <LinkWrapper {...{ path: '/account/dashboard/', click: true }}>SIZE GUIDE</LinkWrapper> */}
          <LinkWrapper {...{ path: "/page/faqs/", click: true }}>FAQS</LinkWrapper>
        </div>
        <div className={styles.infoPanelCol}>
          <LinkWrapper {...{ path: "/page/about-us", click: true }}>ABOUT US</LinkWrapper>
          <div>
            <a className={styles.linkWrapper} href="http://blog.evestemptation.com/">
              BLOG
            </a>
          </div>
          <LinkWrapper {...{ path: "/page/career", click: true }}>CAREERS</LinkWrapper>
          <LinkWrapper {...{ path: "/page/store-location", click: true }}>
            STORE LOCATIONS
          </LinkWrapper>
        </div>
      </div>
    );
  }

  render() {
    // this.manualSetCustomerServiceNotice();
    return (
      <div className={styles.footer}>
        <div className={styles.backToTopButtonWrapper}>
          <div className={styles.backToTopButton}>
            <button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Back to top
              <div className={styles.backToTopButtonIcon}>
                <img
                  src="https://storage.googleapis.com/evesetus/email/footer/Expand-Less.svg"
                  alt="backToTopButton"
                  className={styles.backIcon}
                />
              </div>
            </button>
          </div>
        </div>
        <div className={styles.signUpNewsletterWrapper}>
          <div className={styles.signUpNewsletter}>
            <div className={styles.signUpNewsletterWording}>
              Get newsletters, special offers & more!
            </div>
            <div className={styles.signUpForm}>
              <form className={styles.signUpNewsletterForm} onSubmit={this.onsubmit}>
                <input
                  className={styles.signUpInput}
                  type="email"
                  placeholder="Enter your email"
                  value={this.state.newsvalue}
                  onChange={event => this.onchange(event.target.value)}
                />
                <button
                  className={styles.signUpButton}
                  type="submit"
                  style={{ backgroundImage: "none", borderRadius: "0 2px 2px 0" }}
                >
                  Sign Up
                </button>
              </form>
              <div
                style={{ display: !this.state.email_err ? "none" : "" }}
                className={styles.emailErr}
              >
                Please input a valid email
              </div>
            </div>
          </div>
        </div>
        <div className={styles.usefulInfo}>
          <div className={styles.socialMediaPanel}>
            <div className={styles.socialMediaIcon}>
              <LinkWrapper
                {...{ url: "https://www.facebook.com/evebyeves/", click: true }}
              >
                <img
                  title="Facebook"
                  src="https://storage.googleapis.com/evesetus/email/footer/SocialMedia_FB.svg"
                  alt="SocialMediaFB"
                />
              </LinkWrapper>
              <LinkWrapper {...{ url: "http://instagram.com/evebyeves", click: true }}>
                <img
                  title="Instagram"
                  src="https://storage.googleapis.com/evesetus/email/footer/SocialMedia_IG.svg"
                  alt="SocialMediaInstagram"
                />
              </LinkWrapper>
              <LinkWrapper
                {...{
                  url: "https://www.youtube.com/channel/UCXQTY1RHiu4_f8Vj9qrmSsQ",
                  click: true
                }}
              >
                <img
                  title="YouTube"
                  src="https://storage.googleapis.com/evesetus/email/footer/SocialMedia_YouTube.svg"
                  alt="SocialMediaYoutube"
                />
              </LinkWrapper>
              <LinkWrapper {...{ url: "https://www.weibo.com/EvebyEves", click: true }}>
                <img
                  title="Weibo"
                  src="https://storage.googleapis.com/evesetus/email/footer/SocialMedia_Weibo.svg"
                  alt="SocialMediaWeibo"
                />
              </LinkWrapper>
            </div>
            <div className={styles.wechatBarcode}>
              <MediaQuery query="(min-width: 1024px)">
                <img
                  src="https://storage.googleapis.com/evesetus/email/footer/WeChat-QR-Code_Desktop.png"
                  alt="wechatBarcodeDesktop"
                />
              </MediaQuery>
              <MediaQuery query="(max-width: 1023px)">
                <img
                  src="https://storage.googleapis.com/evesetus/email/footer/WeChat-QR-Code_Mobile.png"
                  alt="wechatBarcodeMobile"
                />
              </MediaQuery>
              <div className={styles.wechatWording}>
                <div>WeChat ID: </div>
                <div style={{ fontFamily: "GothamMedium" }}>EVEBYEVES</div>
              </div>
            </div>
          </div>
          <MediaQuery query="(min-width: 1280px)">{this.renderThreeColumns()}</MediaQuery>
          <MediaQuery query="(min-width: 1024px) and (max-width: 1279px)">
            {this.renderTwoColumns()}
          </MediaQuery>
          <MediaQuery query="(min-width: 768px) and (max-width: 1023px)">
            {this.renderThreeColumns()}
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">{this.renderTwoColumns()}</MediaQuery>
          <div className={styles.contactUsPanel}>
            <div className={styles.contactUsHeader}>Have a Question?</div>
            <div className={styles.contactUsMethods}>
              <img
                src="https://storage.googleapis.com/evesetus/email/footer/Chat.svg"
                alt="chat"
              />
              <LiveChatTrigger>Live Chat</LiveChatTrigger>
            </div>
            <div
              className={styles.contactUsMethodsUnclickable}
              style={{ textDecoration: "none", hover: { color: "rgba(0,0,0,0.87)" } }}
            >
              <img
                src="https://storage.googleapis.com/evesetus/email/footer/Call.svg"
                alt="call"
              />
              +1 855-844-0545
            </div>
            <div className={styles.contactUsMethods}>
              <img
                src="https://storage.googleapis.com/evesetus/email/footer/Email.svg"
                alt="email"
              />
              <a href="mailto:helpdesk@evestemptation.com" className={styles.linkWrapper}>
                helpdesk@evestemptation.com
              </a>
            </div>
            <CMSBlock {...{ cmsid: "footer-notice" }} />
            <div style={{ color: "rgba(0,0,0,0.54)", fontSize: "12px" }}>
              <span style={{ fontFamily: "GothamMedium" }}>Monday - Friday</span>
              {" "}
9am to
              6pm PST
            </div>
          </div>
        </div>
        <div className={styles.footerBottomWrapper}>
          <MediaQuery query="(max-width: 1023px)">
            <div className={styles.footerBottom}>
              <div className={styles.footerBottomCopyRights}>
                <div>
                  <FormattedMessage id="copyRight" />
                </div>
                <div className={styles.footerBottomTerms}>
                  <LinkWrapper {...{ path: "/page/terms-and-conditions", click: true }}>
                    <FormattedMessage id="term" />
                  </LinkWrapper>
                  <LinkWrapper {...{ path: "/page/privacy-policy", click: true }}>
                    <FormattedMessage id="privacy" />
                  </LinkWrapper>
                </div>
              </div>
              <div className={styles.footerBottomSecurityCheck}>
                <img
                  src="https://storage.googleapis.com/evesetus/email/footer/Security-White.svg"
                  alt="Security"
                />
                SECURE CHECKOUT
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query="(min-width: 1024px)">
            <div className={styles.footerBottom}>
              <div className={styles.footerBottomCopyRights}>
                <FormattedMessage id="copyRight" />
              </div>
              <div className={styles.footerBottomTerms}>
                <LinkWrapper {...{ path: "/page/terms-and-conditions", click: true }}>
                  <FormattedMessage id="term" />
                </LinkWrapper>
                <LinkWrapper {...{ path: "/page/privacy-policy", click: true }}>
                  <FormattedMessage id="privacy" />
                </LinkWrapper>
              </div>
              <div className={styles.footerBottomSecurityCheck}>
                <img
                  src="https://storage.googleapis.com/evesetus/email/footer/Security-White.svg"
                  alt="Security"
                />
                SECURE CHECKOUT
              </div>
            </div>
          </MediaQuery>
        </div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header className={styles.modalHeader} closeButton />
          <Modal.Body className={styles.modalBody}>{this.state.modal_msg}</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(connect()(Footer));
