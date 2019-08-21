import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import MediaQuery from "react-responsive";
import styles from "./SingleInsPhoto.css";
import { getClientMD } from "../../../App/AppReducer";
import history from "../../../../history";

class SingleInsPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMask: false,
      showDetail: false
    };
    this.closeWindowHandler = this.closeWindowHandler.bind(this);
  }

  closeWindowHandler(e) {
    this.setState({ showDetail: false });
    e.stopPropagation();
  }

  renderCloseWindowCross() {
    return (
      <div className={styles.windowClose}>
        <div
          onClick={this.closeWindowHandler}
          style={{
            width: 20, marginRight: 0, marginLeft: "auto", marginTop: 4
          }}
        >
          &#x2715;
        </div>
      </div>
    );
  }

  renderUserInfor() {
    return (
      <div className={styles.userInfo}>
        <div className={styles.avatarBox}>
          <img src={this.props.photo.avatar} className={styles.avatar} alt="Ins pic" />
        </div>
        <div>{this.props.photo.account}</div>
      </div>
    );
  }

  render() {
    const { clientMD } = this.props;
    const productUrl = this.props.photo && this.props.photo.product !== ""
      ? this.props.photo.product
      : "https://www.evestemptation.com/nbcam";
    return this.props.photo ? (
      <div
        className={styles.photoContainer}
        onMouseOver={() => {
          this.props.mouseOverEvent(this.props.photo.id);
        }}
        onMouseLeave={() => {
          this.props.mouseOverEvent(null);
        }}
      >
        <div
          onClick={() => {
            this.setState({ showDetail: true });
          }}
        >
          <div>
            <img src={this.props.photo.url} className={styles.InsPhoto} alt="Ins pic" />
          </div>
          <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            {this.props.photo && this.props.showMask === this.props.photo.id ? (
              <div className={styles.photoMask}>
                <div className={styles.maskText}>View Detail</div>
              </div>
            ) : null}
          </MediaQuery>
        </div>
        <Modal
          show={this.state.showDetail}
          onHide={() => {
            this.setState({ showDetail: false });
          }}
          dialogClassName={styles.popupWindow}
        >
          <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.detailPhotoBoxHeader}>
              {this.renderUserInfor()}
              {this.renderCloseWindowCross()}
            </div>
          </MediaQuery>
          <div className={styles.detailPhotoBox}>
            <img
              src={this.props.photo && this.props.photo.url ? this.props.photo.url : null}
              className={styles.InsPhoto}
              alt="Ins pic"
            />
          </div>
          <div className={styles.detailTextBox}>
            <div className={styles.detailTextContainer}>
              <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
                {this.renderCloseWindowCross()}
                {this.renderUserInfor()}
              </MediaQuery>
              <div className={styles.tagsAndDescriptionBox}>
                <div className={styles.InsPhotoDescription}>
                  {this.props.photo && this.props.photo.description
                    ? this.props.photo.description
                    : null}
                </div>
                <div className={styles.tagBox}>
                  {this.props.photo
                    ? this.props.photo.tags.map((tg, ind) => {
                      return (
                        <div key={`tag_${ind}`} className={styles.singleTag}>
                          {tg}
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
            </div>
            <div
              className={styles.goToProduct}
              onClick={() => {
                history.push(productUrl);
              }}
            >
              View the product
            </div>
          </div>
        </Modal>
      </div>
    ) : null;
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(SingleInsPhoto);
