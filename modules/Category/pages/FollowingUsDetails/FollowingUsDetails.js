import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./FollowingUsDetails.css";
// import FollowUs, { FollowUsInfo } from '../../../CMS/Components/FollowUs/FollowUs'; // TODO

class FollowingUsDetails extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.bigTitle}>Follow Us For a $5 Gift Code</div>
        <div className={styles.followDetailsContainer}>
          <div className={styles.wechatProcessContainer}>
            <div className={styles.icon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/WeChat-Icon-Big%402x.png"
                className={styles.iconStyles}
                alt="wechatImg"
              />
            </div>
            <div className={styles.processContainer}>
              <div className={styles.title}>Follow our official WeChat account:</div>
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>1.</strong>&nbsp;
                  </div>
                  <div>Open the WeChat App</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>2.</strong>&nbsp;
                  </div>
                  <div>
                    <strong>Scan the QR code</strong>
                    {" "}
or enter our official account ID
                    {" "}
                    <strong>@EVEBYEVES</strong>
                    {" "}
in the search bar
                  </div>
                </div>
              </div>
              <img
                className={styles.qrcode}
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/QR-Code%402x.png"
                alt="qrcode"
              />
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>3.</strong>&nbsp;
                  </div>
                  <div>
                    Follow our official account and reply
                    {" "}
                    <strong>"EBE"</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>4.</strong>&nbsp;
                  </div>
                  <div> An exclusive gift code will automatically be given when done</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>5.</strong>&nbsp;
                  </div>
                  <div>Enter the code at our checkout page to get $5 off</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.instagramProcessContainer}>
            <div className={styles.icon}>
              <img
                src="https://storage.googleapis.com/evesetus/email/wechatNewsletter/IG-Icon-Big%402x.png"
                className={styles.iconStyles}
                alt="instagramImg"
              />
            </div>
            <div className={styles.processContainer}>
              <div className={styles.title}>Follow our Instagram:</div>
              <div className={styles.stepsText}>
                <div className={styles.orderList}>
                  <div>
                    <strong>1.</strong>&nbsp;&nbsp;
                  </div>
                  <div>
                    Follow us on Instagram
                    {" "}
                    <strong>@evestemptationus</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>2.</strong>&nbsp;
                  </div>
                  <div>
                    In the
                    {" "}
                    <strong>MESSAGE</strong>
                    {" "}
box, direct message us by replying
                    {" "}
                    <strong>"ET"</strong>
                  </div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>3.</strong>&nbsp;
                  </div>
                  <div>An exclusive gift code will be given when done</div>
                </div>
                <div className={styles.orderList}>
                  <div>
                    <strong>4.</strong>&nbsp;
                  </div>
                  <div>Enter the code at our checkout page to get $5 off</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(FollowingUsDetails);
