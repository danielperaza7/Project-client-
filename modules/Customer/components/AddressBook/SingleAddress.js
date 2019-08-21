/**
 * Created by chris on 4/25/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { DropdownButton, MenuItem } from "react-bootstrap";
import _ from "lodash";

// import actions
import {
  fetchEditForm,
  fetchUpdatedForm,
  fetchDeleteAddress
} from "../../CustomerActions";
import { COUNTRY_TO_STATES, COUNTRIES } from "../../../../config/config";

// ipmort styles
import styles from "./AddressBook.css";

class SingleAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
      delete_State: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.close = this.close.bind(this);
    this.deleteaddr = this.deleteaddr.bind(this);
    this.handleDeleteAddressResponse = this.handleDeleteAddressResponse.bind(this);
  }

  handleEditClick(id) {
    this.props.onEditClick();
    this.props.dispatch(fetchEditForm(id));
  }

  close() {
    this.setState({
      close: !this.state.close
    });
  }

  deleteaddr(id) {
    this.props.dispatch(fetchDeleteAddress(id, this.handleDeleteAddressResponse));
  }

  handleDeleteAddressResponse(response) {
    if (response) {
      this.setState({
        delete_State: true
      });
    }
  }

  render() {
    const tail_style = {
      float: "right"
    };
    const addr = this.props.address;
    const other = this.props.otheraddr;
    let title;
    let tail;
    if (this.props.type === 0) {
      if (other.length === 0) {
        tail = "";
      } else {
        tail = (
          <DropdownButton
            title="Change default shipping address"
            style={{ float: "right" }}
            id="dropdown"
          >
            {other.map((singleaddr, index) => {
              return (
                <MenuItem
                  eventKey={singleaddr._id}
                  key={index}
                  onClick={() => {
                    singleaddr.default_shipping = true;
                    return this.props.dispatch(fetchUpdatedForm(singleaddr));
                  }}
                >
                  {`${singleaddr.firstname} ${singleaddr.lastname} ${
                    singleaddr.street[0]
                  }`}
                </MenuItem>
              );
            })}
          </DropdownButton>
        );
      }
    } else if (this.props.type === 1) {
      if (other.length === 0) {
        tail = "";
      } else {
        tail = (
          <DropdownButton
            title="Change default billing address"
            style={tail_style}
            id="dropdown"
          >
            {other.map((singleaddr, index) => {
              return (
                <MenuItem
                  eventKey={singleaddr._id}
                  key={index}
                  onClick={() => {
                    singleaddr.default_billing = true;
                    return this.props.dispatch(fetchUpdatedForm(singleaddr));
                  }}
                >
                  {`${singleaddr.firstname} ${singleaddr.lastname} ${
                    singleaddr.street[0]
                  }`}
                </MenuItem>
              );
            })}
          </DropdownButton>
        );
      }
    } else if (this.props.type === 2) {
      if (addr.default_shipping === true && addr.default_billing === true) {
        title = (
          <div>
            <p>DEFAULT_SHIPPING</p>
            <p>DEFAULT_BILLING</p>
          </div>
        );
      } else if (addr.default_shipping === true) {
        title = (
          <div>
            <p>DEFAULT_SHIPPING</p>
          </div>
        );
      } else if (addr.default_billing === true) {
        title = (
          <div>
            <p>DEFAULT_BILLING</p>
          </div>
        );
      } else {
        title = "";
      }
      if (addr.default_shipping !== true || addr.default_billing !== true) {
        tail = (
          <DropdownButton title="Set as" style={tail_style} id="dropdown">
            {addr.default_shipping ? (
              ""
            ) : (
              <MenuItem
                eventKey="1"
                key="1"
                onClick={() => {
                  addr.default_shipping = true;
                  return this.props.dispatch(fetchUpdatedForm(addr));
                }}
              >
                Default Shipping
              </MenuItem>
            )}
            {addr.default_billing ? (
              ""
            ) : (
              <MenuItem
                eventKey="2"
                key="2"
                onClick={() => {
                  addr.default_billing = true;
                  return this.props.dispatch(fetchUpdatedForm(addr));
                }}
              >
                Default Billing
              </MenuItem>
            )}
          </DropdownButton>
        );
      } else {
        tail = "";
      }
    }
    if (!this.state.delete_State) {
      let region = null;
      if (addr.region_id && addr.region_id !== "0") {
        const regionIndex = _.findIndex(COUNTRY_TO_STATES.US, { id: addr.region_id });
        region = regionIndex >= 0 ? COUNTRY_TO_STATES.US[regionIndex].name : null;
      }
      region = region || addr.region;
      const countryIndex = _.findIndex(COUNTRIES, { code: addr.country_id });
      const countryName = countryIndex >= 0 ? COUNTRIES[countryIndex].name : null;
      return (
        <div className={styles["single-address"]}>
          {title}
          <p style={{ paddingTop: "10px" }}>
            {`${addr.firstname} ${addr.lastname}`}
            {this.props.type === 2 ? (
              <a
                style={{ float: "right" }}
                className={styles["addressbook-overview-closebtn"]}
                onClick={this.close}
              >
                <i className="ion-close" />
              </a>
            ) : (
              ""
            )}
          </p>
          <p>{addr.street.map(str => `${str}\t`)}</p>
          <p>{`${addr.city},\t${region},\t${addr.postcode}`}</p>
          <p>{countryName || addr.country_id}</p>
          <p>{addr.telephone}</p>
          <div className={styles["addressbook-overview-bottombtn"]}>
            {tail}
            <a href="#" onClick={() => this.handleEditClick(addr._id)}>
              <i className="ion-compose" />
              Edit
            </a>
          </div>
          {this.state.close === true ? (
            <div className={styles["addressbook-overview-hiddenbtn-wrapper"]}>
              <div className={styles["addressbook-overview-hiddenbtn"]}>
                <button onClick={() => this.deleteaddr(addr._id)}>Delete</button>
                <button onClick={() => this.setState({ close: false })}>Cancel</button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
    return null;
  }
}

export default connect()(SingleAddress);
