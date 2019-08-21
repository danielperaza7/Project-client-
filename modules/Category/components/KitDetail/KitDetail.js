// import independent component
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import 3rd party component
import { getClientMD } from "../../../App/AppReducer";
import ImagePicker from "./KitImagePicker";

// import CSS
import styles from "./KitDetail.css";

class KitDetail extends Component {
  renderDescription(description) {
    return (
      <div className={styles.descriptionContainer}>
        <h4 className={styles.descriptionTitle}>{description.title}</h4>
        <p className={styles.descriptionBody}>{description.description}</p>
      </div>
    );
  }

  renderKitDetailComponents(kitDetail, kitProducts) {
    return kitDetail.map((obj) => {
      if (obj.type === "details") {
        return <ImagePicker detail={obj} detailProducts={kitProducts} />;
      } if (obj.type === "description") {
        return this.renderDescription(obj);
      }
      return null;
    });
  }

  render() {
    const { kitDetail, kitProducts } = this.props;
    return <div>{this.renderKitDetailComponents(kitDetail, kitProducts)}</div>;
  }
}

KitDetail.propTypes = {
  kitDetail: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  kitProducts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  clientMD: PropTypes.object
};

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(KitDetail);
