import { connect } from "react-redux";
import React, { Component } from "react";
import MediaQuery from "react-responsive";
import SingleInsPhoto from "./SingleInsPhoto";
import styles from "./InsPhotoTemplate.css";
import { getClientMD } from "../../../App/AppReducer";

export const InsPhotoTemplateInfo = {
  id: "Ins_photo_block",
  description: "Instergram photo template",
  image: "",
  props: {
    options: {
      url: "https://storage.googleapis.com/evesetus/email/NBCAM/Instest.jpg",
      avatar: "https://storage.googleapis.com/evesetus/email/NBCAM/Instest.jpg",
      account: "@evestemptationus",
      description:
        "evestemptationusGet over the #MondayBlues, wake up every morning and envelop yourself in our Sloane robe.",
      tags: ["#evestemptation #robe", "#loungewear #lingerie"],
      product: ""
    }
  }
};

class InsPhotoTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMask: null
    };
    this.InsPhotoMouseOverHandler = this.InsPhotoMouseOverHandler.bind(this);
  }

  InsPhotoMouseOverHandler(ind) {
    this.setState({ showMask: ind });
  }

  renderPCTemplate(singlePhotoProps) {
    return this.props.options && this.props.options.photoList ? (
      <div className={styles.templateContainer}>
        <div className={styles.template_p1}>
          <div className={styles.mainPhoto}>
            {this.props.options.photoList.slice(0, 1).map((ele) => {
              return (
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              );
            })}
          </div>
          <div className={styles.template_p2}>
            <div className={styles.template_p1}>
              {this.props.options.photoList.slice(1, 3).map((ele) => {
                return (
                  <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                    <SingleInsPhoto
                      key={`singlePhtot_${ele.id}`}
                      {...singlePhotoProps}
                      photo={ele}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.template_p1}>
              {this.props.options.photoList.slice(3, 5).map((ele) => {
                return (
                  <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                    <SingleInsPhoto
                      key={`singlePhtot_${ele.id}`}
                      {...singlePhotoProps}
                      photo={ele}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(5, 9).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "25%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : null;
  }

  renderTabletTemplate(singlePhotoProps) {
    return this.props.options && this.props.options.photoList ? (
      <div className={styles.templateContainer}>
        <div className={styles.template_p1}>
          <div className={styles.mainPhoto}>
            {this.props.options.photoList.slice(0, 1).map((ele) => {
              return (
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              );
            })}
          </div>
          <div className={styles.template_p2}>
            {this.props.options.photoList.slice(1, 2).map((ele) => {
              return (
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              );
            })}
            {this.props.options.photoList.slice(2, 3).map((ele) => {
              return (
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(3, 6).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "33.33%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(6, 9).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "33.33%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : null;
  }

  renderMobileTemplate(singlePhotoProps) {
    return this.props.options && this.props.options.photoList ? (
      <div className={styles.templateContainer}>
        <div className={styles.template_p1}>
          <div className={styles.mainPhoto}>
            {this.props.options.photoList.slice(0, 1).map((ele) => {
              return (
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(1, 3).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(3, 5).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(5, 7).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.template_p1}>
          {this.props.options.photoList.slice(7, 9).map((ele) => {
            return (
              <div key={`singlePhtotoBox_${ele.id}`} style={{ width: "50%" }}>
                <SingleInsPhoto
                  key={`singlePhtot_${ele.id}`}
                  {...singlePhotoProps}
                  photo={ele}
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : null;
  }

  render() {
    const { clientMD } = this.props;
    const singlePhotoProps = {
      mouseOverEvent: this.InsPhotoMouseOverHandler,
      showMask: this.state.showMask
    };
    return (
      <div className={styles.templateBox}>
        <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          {this.renderPCTemplate(singlePhotoProps)}
        </MediaQuery>

        <MediaQuery
          minWidth={768}
          maxWidth={991}
          values={{ width: clientMD && clientMD.fakeDeviceWidth }}
        >
          {this.renderTabletTemplate(singlePhotoProps)}
        </MediaQuery>

        <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          {this.renderMobileTemplate(singlePhotoProps)}
        </MediaQuery>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(InsPhotoTemplate);
