import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import styles from "./MembershipRule.css";

class MembershipRule extends Component {
  render() {
    return (
      <div className={styles.membershipRuleContainer}>
        <div className={styles.textBox}>
          <h3>Join now & save more!</h3>
          <br />
          <p>
            <strong>
              It’s simple: join today to start earning stars and enjoy more benefits!
              <br />
              You’ll earn stars for every Eve’s Temptation purchase made online or in
              stores.
              <br />
              Every $1 spent on Eve’s Temptation products = 10 stars.
            </strong>
          </p>
          <br />
          <p>
            Gift cards, gift boxes, home decor and Eve by Eve’s products are not eligible
            for stars and membership discounts.
          </p>
          <br />
          <p>
            There are three membership levels that can be achieved: Silver, Gold and
            Platinum. Here are our stars and benefits at every level:
          </p>
          <div>
            <div className={styles.singleMembership}>
              <div className={styles.membershipName}>Silver: </div>
              <div className={styles.membershipDetail}>
                <div className={styles.starRange}>0 - 1999 stars</div>
                <div>(Extra 10% off first order on Eve’s Temptation products)</div>
              </div>
            </div>
            <div className={styles.singleMembership}>
              <div className={styles.membershipName}>Gold: </div>
              <div className={styles.membershipDetail}>
                <div className={styles.starRange}>2000 - 9999 stars</div>
                <div>
                  (Extra 5% off every order on Eve’s Temptation full-price products)
                </div>
              </div>
            </div>
            <div className={styles.singleMembership}>
              <div className={styles.membershipName}>Platinum: </div>
              <div className={styles.membershipDetail}>
                <div className={styles.starRange}>10,000+ stars</div>
                <div>
                  (Extra 12% off every order on Eve’s Temptation full-price products)
                </div>
              </div>
            </div>
          </div>
          <br />
          <p>
            *Products with special deal tags are star accumulative but are not eligible
            for membership discount.
            <br />
            *Only Eve’s Temptation full-price product are eligible for Gold & Platinum
            membership discount. Member discounts will be applied after all other
            deductions have been applied to the purchase. Membership will be a lifelong
            benefits.
          </p>
        </div>
        <div className={styles.benefitBox}>
          <Table>
            <thead>
              <tr>
                <th scope="col" className={styles.membershipName_table} />
                <th scope="col" className={styles.membershipName_table}>
                  Guest
                </th>
                <th scope="col" className={styles.membershipName_table}>
                  Silver
                </th>
                <th scope="col" className={styles.membershipName_table}>
                  Gold
                </th>
                <th scope="col" className={styles.membershipName_table}>
                  Platinum
                </th>
              </tr>
              <tr>
                <th className={styles.membershipMedal_table} scope="col" />
                <th className={styles.membershipMedal_table} scope="col" />
                <th className={styles.membershipMedal_table} scope="col">
                  <img
                    src="https://storage.googleapis.com/evesetus/email/MyAccount/medal-silver.svg"
                    alt="membershipMedal"
                  />
                </th>
                <th className={styles.membershipMedal_table} scope="col">
                  <img
                    src="https://storage.googleapis.com/evesetus/email/MyAccount/medal-gold.svg"
                    alt="membershipMedal"
                  />
                </th>
                <th className={styles.membershipMedal_table} scope="col">
                  <img
                    src="https://storage.googleapis.com/evesetus/email/MyAccount/medal-platinum.svg"
                    alt="membershipMedal"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.rowHead}>Current website promotion</td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
              </tr>
              <tr>
                <td className={styles.rowHead}>
                  <strong>Extra 10% off</strong>
                  {" "}
first order on Eve’s Temptation products
                </td>
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
              </tr>
              <tr>
                <td className={styles.rowHead}>
                  <strong>Extra 5% off every order</strong>
                  {" "}
on Eve’s Temptation full-price
                  products
                </td>
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
                <td className={styles.singleTableBodyCell} />
              </tr>
              <tr>
                <td className={styles.rowHead}>
                  <strong>Extra 12% off every order</strong>
                  {" "}
on Eve’s Temptation
                  full-price products
                </td>
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell} />
                <td className={styles.singleTableBodyCell}>
                  <i className={`ion-ios-checkmark ${styles["success-icon"]}`} />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={styles.textBox}>
          <br />
          <p>
            As soon as you sign up for an account on our website, you will automatically
            be enrolled under our Silver membership. To achieve Gold membership status,
            you will need to reach 2,000 stars within the year from your membership start
            date. To upgrade to our exclusive Platinum membership, shop to 10,000 stars
            and start enjoying its perks.
            {" "}
          </p>
          <br />
          <p>
            Stars accumulated within the year will automatically apply to your next
            qualifying membership. Your membership status will last until you’ve reached
            enough stars for the next level. Membership will be a lifelong benefits.
          </p>
          <br />
          <p>
            If you’d like to return a product(s), the membership stars you earned for the
            item(s) will be deducted. Your membership status will be adjusted reflecting
            your current star balance.
          </p>
          <br />
          <p>
            *All stars are subject to change without notice per our terms and conditions.
            Eve’s Temptation members will earn stars through purchase of qualifying
            products at store locations and online if they are redeemable towards the
            purchase of certain products.
          </p>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MembershipRule);
