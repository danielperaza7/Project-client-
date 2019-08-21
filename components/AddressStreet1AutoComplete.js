import React, { Component } from "react";
import styles from "./FieldFormControl.css";
/*
const props = {
  callback: some function to deal with the address object,
  AutoCompleteType: "geocode", "address", "(regions)"...
}
*/

class AddressAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.initAutocomplete = this.initAutocomplete.bind(this);
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    if (
      window.google
      && window.google.maps
      && window.google.maps.places
      && window.google.maps.places.Autocomplete
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (this.refs.autocomplete),
        { types: [this.props.AutoCompleteType || "geocode"] }
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.

      // const address = null;

      autocomplete.addListener("place_changed", () => {
        // Get the place details from the autocomplete object.
        const place = autocomplete.getPlace();
        this.props.callback(place.address_components, this.props.AutoCompleteType);
      });

      this.geolocate(autocomplete);
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate(autocomplete) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if (window.google && window.google.maps && window.google.maps.Circle) {
          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        }
      });
    }
  }

  render() {
    const {
      placeholder, type, input, bsClass, disabled
    } = this.props;
    return (
      <div className={styles.FieldFormControl}>
        <input
          className={`form-control ${bsClass}`}
          type={type}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange}
          disabled={disabled}
          onFocus={this.initAutocomplete}
          ref="autocomplete"
        />
        {(this.props.meta.dirty || this.props.meta.touched) && this.props.meta.error && (
          <span style={{ color: "#FF0000" }}>{this.props.meta.error}</span>
        )}
      </div>
    );
  }
}

export default AddressAutoComplete;
