import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import styles from "./CheckoutSuccessPage.css";
import SignupForm from "../../../Authentication/components/SignupForm/SignupForm";
import { setSignupForm } from "../../CheckoutActions.js";
import { getUserInfo } from "../../CheckoutReducer.js";
import AppStyles from "../../../App/App.css";
import history from "../../../../history";

class CheckoutSuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form_show: true
    };
  }

  componentWillMount() {
    if (this.props.userInfo) {
      if (!this.props.userInfo.email) this.setState({ form_show: false });
      this.setState({
        first_name: this.props.userInfo.first_name,
        order_number: this.props.userInfo.order_number,
        last_name: this.props.userInfo.last_name,
        email: this.props.userInfo.email
      });
      const initialData = {
        first_name: this.props.userInfo.first_name,
        last_name: this.props.userInfo.last_name,
        email: this.props.userInfo.email
      };
      this.props.dispatch(setSignupForm(initialData));
    } else {
      history.push("/");
    }
  }


  renderThankyouSection() {
    return (
      <div className={styles.orderShow}>
        <div className={styles.header1}>THANK YOU!</div>
        <h4>
          <span>{this.state.first_name}</span>
, your order has been successfully placed.
        </h4>
        <ul className={styles.liststyle}>
          <li>
            <i className="ion-checkmark" style={{ color: "#FC2674", margin: "0 12px 0 0" }} />
Your order number is
            {" "}
            <span>{this.state.order_number}</span>
.
          </li>
          <li>
            <i className="ion-checkmark" style={{ color: "#FC2674", margin: "0 12px 0 0" }} />
Your order will begin processing within 1-2 business days.
          </li>
          <li>
            <i className="ion-checkmark" style={{ color: "#FC2674", margin: "0 12px 0 0" }} />
If you have any questions regarding your order, please contact us at
            {" "}
            <span> 1-855-844-0545(toll free)</span>
.
          </li>
          <li>
            <i className="ion-checkmark" style={{ color: "#FC2674", margin: "0 12px 0 0" }} />
We’ll send you an
            {" "}
            <span>email confirmation</span>
            {" "}
to your email shortly.
            {" "}
            <span>Check your order status</span>
            {" "}
at any time by logging into your account.
          </li>
        </ul>
      </div>
    );
  }


  renderExplanation() {
    // return (
    //   <div>
    //     <div className={styles.title}> Why Create an Account? </div>
    //     <ol>
    //       <li>Create an account and <span className={styles.list}>earn 10 REWARD POINTS</span>.</li>
    //       <li>Earn REWARD POINTS every $100 you spend.
    //           With this purchase, you’ll <span className={styles.list}>earn 21 REWARD POINTS</span>. Don’t lose your points!
    //       </li>
    //       <li><span className={styles.list}>Join EVE Club Program</span> that gives you 10-30% OFF with any purchase any time.</li>
    //       <li><span className={styles.list}>Track your orders</span></li>
    //       <li><span className={styles.list}>View Order History</span></li>
    //       <li><span className={styles.list}>Make a Wish List</span></li>
    //       <li><span className={styles.list}> Quick checkout</span> with your saved shipping and billing information in the future.</li>
    //       <li><span className={styles.list}>We never sell or share</span> your information.</li>
    //     </ol>
    //
    //   </div>
    // )
  }


  render() {
    const SignupFormInfo = {
      no_checkbox: true
    };

    return (
      <div className="container">
        <Helmet
          title="Order Success"
        />
        <div style={{ margin: "10% 0 0 -10%" }}>
          { this.renderThankyouSection() }
        </div>
        <div style={{ background: "#f2f2f2", height: "80%", display: this.state.form_show ? "" : "none" }}>
          <div className={styles.form}>
            <SignupForm {...SignupFormInfo} />
          </div>
          <div className={styles.explaination}>
            { this.renderExplanation() }
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};
  const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  // Validate the inputs from 'values'
  if (!values.firstname) {
    errors.firstname = "Please enter a firstname";
  }
  if (!values.lastname) {
    errors.lastname = "Please enter a lastname";
  }
  if (!values.password) {
    errors.password = "Please enter a password";
  }
  if (!values.confirm) {
    errors.confirm = "Please confirm your password";
  }
  if (!(values.confirm === values.password)) {
    errors.password = "Please input the same password";
  }
  if (!myreg.test(values.email)) {
    if (!values.email) {
      errors.email = "Please enter an email";
    } else errors.email = "Please input a valid email address";
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(store) {
  return {
    userInfo: getUserInfo(store)
  };
}


export default connect(mapStateToProps)(CheckoutSuccessPage);
