/**
 * Created by chris on 4/19/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PrimaryAddress from "./PrimaryAddress";
import AllAddress from "./AllAddress";
import EditAddress from "./EditAddress";
import DefaultMask from "../../../../components/masks/DefaultMask";
import { fetchNewForm } from "../../CustomerActions";
import { getAddressBook } from "../../../App/AppReducer";
import styles from "./AddressBook.css";

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditOn: false,
      isNew: false,
      editChosen: {}
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onFormComplete = this.onFormComplete.bind(this);
    this.onNewformClicked = this.onNewformClicked.bind(this);
  }

  componentWillMount() {
    this.setState({
      isEditOn: false
    });
  }

  onFormComplete(msg, err) {
    // If has error, still on the edit page; otherwise, go back to address book
    this.setState({
      isEditOn: err
    });
  }

  onNewformClicked() {
    // get a null object
    const newform = {
      region_code: "",
      region: "",
      region_id: null,
      country_id: "US",
      street: [],
      telephone: "",
      postcode: "",
      city: "",
      firstname: "",
      lastname: "",
      default_shipping: false,
      default_billing: false
    };
    this.props.dispatch(fetchNewForm(newform));
    this.setState({
      isEditOn: true,
      isNew: true
    });
  }

  onEditClick(obj) {
    this.setState({
      isEditOn: true,
      isNew: false,
      editChosen: obj
    });
  }

  render() {
    console.log("change", this.props.addressBook);
    if (this.state.isEditOn) {
      return (
        <div className={styles["addressbook-overview"]}>
          <div>
            <div className={styles["addressbook-title"]}>
              <span>Address Book</span>
            </div>
            <EditAddress
              address={this.state.editChosen}
              finishEdit={this.onFormComplete}
              isNew={this.state.isNew}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={styles["addressbook-overview"]}>
        <div>
          <div className={styles["addressbook-title"]}>
            <span>Address Book</span>
            <button onClick={this.onNewformClicked} className={styles["blk-btn"]}>
              ADD ADDRESS
            </button>
          </div>
          <p>
            We respect your privacy and trust is very import to us. Check out our Privacy
            Policy tells you how we protect your privacy.
          </p>
        </div>
        {this.props.addressBook ? (
          <div>
            <PrimaryAddress
              address={this.props.addressBook}
              onEditClick={this.onEditClick}
            />
            <AllAddress address={this.props.addressBook} onEditClick={this.onEditClick} />
          </div>
        ) : (
          <div className={styles["uploading-mask"]}>
            <DefaultMask fixed />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    addressBook: getAddressBook(store)
  };
}

export default connect(mapStateToProps)(AddressBook);
