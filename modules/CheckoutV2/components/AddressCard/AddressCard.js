import React from "react";
import _ from "lodash";
import styles from "./AddressCard.css";
import { COUNTRIES } from "../../../../config/config";

export default ({ address, selectAction, selected }) => {
  const {
    street, city, region_code, postcode, country_id
  } = address;
  // if (!selected_id && (default_shipping || default_billing)) {
  //   if (formName == "shipping_Address"&&default_shipping) selectAction(address._id);
  //   if (formName == "billing_Address"&&default_billing) selectAction(address);
  // }
  const countryIndex = _.findIndex(COUNTRIES, { code: country_id });
  const countryName = countryIndex >= 0 ? COUNTRIES[countryIndex].name : null;
  return (
    <div
      className={styles.cardWrapper + (selected ? ` ${styles.selected}` : "")}
      onClick={selectAction}
    >
      <div style={{ fontFamily: "GothamMedium" }}>
        {`${address.firstname} ${address.lastname}`}
        {" "}
      </div>
      <div>{street[0]}</div>
      <div>{`${city}, ${region_code} ${postcode}, ${countryName || country_id}`}</div>
    </div>
  );
};
