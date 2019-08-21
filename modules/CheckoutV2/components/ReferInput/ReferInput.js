import React, { Component } from "react";
import { connect } from "react-redux";
// import FieldFormControl from '../../../../componentsV2/formComponents/FieldFormControl/FieldFormControl';
import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import { getReferID, getReferType } from "../../CheckoutReducer";
import { setReferData } from "../../CheckoutActions";
import styles from "./ReferInput.css";

class ReferInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      err: ""
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCollapsed() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleChange(name, value) {
    const { dispatch } = this.props;
    if (/[^0-9]/.test(value)) this.setState({ err: "Numerical characters only." });
    dispatch(
      setReferData({
        referType: name,
        referID: value.replace(/[^0-9]/g, "").substring(0, 4)
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ collapsed: true });
  }

  render() {
    const { referID, referType, hidden } = this.props;
    const { collapsed, err } = this.state;
    if (hidden) return null;
    return (
      <div className={styles.sectionWrapper}>
        <FieldFormControlCheckbox
          id="add_employee_number"
          input={{
            value: !collapsed || (referID && referID !== ""),
            onChange: this.toggleCollapsed
          }}
          title={`Add the sales associate's employee number ${
            collapsed && referID && referID !== "" ? `: ${referID}` : ""
          }`}
        />
        <div className={`${styles.innerNode} ${collapsed ? " hidden" : ""}`}>
          <form onSubmit={this.handleSubmit}>
            <input
              value={referID}
              onChange={(e) => {
                this.handleChange("shoppingGuide", e.target.value);
              }}
              placeholder="Example: 1"
            />
            {err ? <span className={styles.hint}>{err}</span> : null}
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    referID: getReferID(store),
    referType: getReferType(store)
  };
}

export default connect(mapStateToProps)(ReferInput);
