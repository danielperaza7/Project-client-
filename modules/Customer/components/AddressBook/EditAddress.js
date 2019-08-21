import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import _ from "lodash";
import AddressForm from "../../../../components/AddressForm";
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import DefaultMask from "../../../../components/masks/DefaultMask";
import { fetchUpdatedForm, fetchAddNew } from "../../CustomerActions";
import { COUNTRY_TO_STATES } from "../../../../config/config";
import styles from "./AddressBook.css";

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    };

    this.parseFormToSend = this.parseFormToSend.bind(this);
    this.continueDo = this.continueDo.bind(this);
    this.finishEditAndCloseUploading = this.finishEditAndCloseUploading.bind(this);
  }

  finishEditAndCloseUploading(msg, err) {
    this.setState({ uploading: false });
    this.props.finishEdit(msg, err);
  }

  continueDo(local_address) {
    if (this.props.isNew) {
      this.props.dispatch(
        fetchAddNew(this.parseFormToSend(local_address), this.finishEditAndCloseUploading)
      );
    } else {
      this.props.dispatch(
        fetchUpdatedForm(
          this.parseFormToSend(local_address),
          this.finishEditAndCloseUploading
        )
      );
    }
    this.setState({ uploading: true });
  }

  parseFormToSend(formProps) {
    const CurrentCountry = formProps.country_id;
    const CurrentRegion = _.find(COUNTRY_TO_STATES[CurrentCountry], {
      code: formProps.region_code
    });
    return {
      _id: this.props.addressToEdit._id,
      firstname: formProps.firstname,
      lastname: formProps.lastname,
      street: [formProps.street1, formProps.street2 || ""],
      country_id: formProps.country_id,
      postcode: formProps.postcode,
      region_code: CurrentRegion ? CurrentRegion.code : formProps.region_code,
      region_id: CurrentRegion ? CurrentRegion.id : 0,
      region: CurrentRegion ? CurrentRegion.name : formProps.region_code,
      city: formProps.city,
      telephone: formProps.telephone,
      default_shipping: formProps.default_shipping,
      default_billing: formProps.default_billing
    };
  }

  render() {
    const { addressToEdit } = this.props;
    const initialValues = {
      firstname: addressToEdit.firstname,
      lastname: addressToEdit.lastname,
      street1: addressToEdit.street[0],
      street2: addressToEdit.street[1],
      country_id: addressToEdit.country_id,
      postcode: addressToEdit.postcode,
      region_code:
        addressToEdit.region && addressToEdit.region.region_code
          ? addressToEdit.region.region_code
          : addressToEdit.region_code,
      city: addressToEdit.city,
      telephone: addressToEdit.telephone
    };

    const extraFields = [
      addressToEdit.default_shipping !== null && addressToEdit.default_shipping ? (
        ""
      ) : (
        <Field
          name="default_shipping"
          key={0}
          type="checkbox"
          component={FieldFormControlCheckbox}
          label="default_shipping"
          title="Set as default shipping address"
        />
      ),
      addressToEdit.default_billing !== null && addressToEdit.default_billing ? (
        ""
      ) : (
        <Field
          name="default_billing"
          key={1}
          type="checkbox"
          component={FieldFormControlCheckbox}
          label="default_billing"
          title="Set as default billing address"
        />
      )
    ];

    const extras = {
      extraFields,
      cancelButton: (
        <button onClick={this.props.finishEdit} className={styles["blk-btn"]}>
          {" "}
          Cancel
          {" "}
        </button>
      )
    };

    return (
      <div>
        <h4>{this.props.isNew ? "Add Address" : "Edit Address"}</h4>
        {this.state.uploading ? (
          <div className={styles["uploading-mask"]}>
            <DefaultMask />
          </div>
        ) : (
          ""
        )}
        <AddressForm
          isNew={this.props.isNew}
          initialValues={this.props.isNew ? undefined : initialValues}
          continueDo={this.continueDo}
          {...extras}
        />
      </div>
    );
  }
}

EditAddress = connect(store => ({
  addressToEdit: store.customer.editAddress
}))(EditAddress);

export default EditAddress;
