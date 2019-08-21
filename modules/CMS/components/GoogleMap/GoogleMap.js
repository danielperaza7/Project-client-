import React, { Component } from "react";
import styles from "./GoogleMap.css";

export const GoogleMapInfo = {
  id: "google-map",
  description: "google map",
  props: {
    address: "Eve by Eve's, 350 N Camden Drive,Beverly Hills"
  }
};

const API_KEY = "AIzaSyASIsvHdh8LL9m0NAN1ewDHFE1WoyZwlu4";

class GoogleMap extends Component {
  render() {
    let { address } = this.props;

    if (!address) {
      address = "Eve by Eve's, 350 N Camden Drive,Beverly Hills";
    }

    try {
      return (
        <div>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${address}`}
            ref="google_map"
            className={styles["google-map"]}
          />
        </div>
      );
    } catch (err) {
      return (
        <img src="https://hiddenfigure.evestemptation.com/FrontEndDependency/images/googleMap-xs.jpg" />
      );
    }
  }
}

export default GoogleMap;
