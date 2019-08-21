/*
  account page
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import styles from "./GiftCardInstruction.css";

class GiftCardInstruction extends Component {
  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={768}>
          <div className={styles.GiftCardContainer_desktop}>
            <div className={styles.title}>How to Redeem Your Gift Card</div>
            <div style={{ display: "inline-flex", marginTop: "30px" }}>
              <div className={styles.left}>
                <img
                  alt=""
                  src="https://hiddenfigure.evestemptation.com/email/eGift-Card_50_shadow.jpg"
                />
                <div className={styles.card_name}>Eve By Eve's e-Gift Card</div>
                <div className={styles.card_note}>
                  REDEEM ONLINE, OR IN STORE.
RECEIVE IMMEDIATELY
                </div>
              </div>
              <div className={styles.right}>
                <div style={{ marginBottom: "15px" }}>
                  <div className={styles.redeem_title}>Redeem Online:</div>
                  <div className={styles.redeem_situation}>Use as Account Balance</div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>1.</span>
                    {" "}
Copy the eGift Card
                    Code sent to you via email.
                    {" "}
                  </div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>2.</span>
                    {" "}
Sign in to your
                    account.
                    {" "}
                  </div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>3.</span>
                    {" "}
Click
                    {" "}
                    <span className={styles.redeem_index}>
                      {" "}
                      Account Balance/Gift Card.
                    </span>
                  </div>
                  <div
                    className={styles.redeem_details}
                    style={{ display: "inline-flex" }}
                  >
                    <span className={styles.redeem_index}>4.</span>
                    <div>
                      Enter your gift card code and click
                      {" "}
                      <span className={styles.redeem_index}>Redeem.</span>
                      {" "}
The credit will
                      be transfered to your account balance.
                      {" "}
                    </div>
                  </div>
                  <div className={styles.redeem_situation}>Use at Checkout</div>
                  <div className={styles.redeem_details}>
                    Gift card can also be applied at checkout. If the gift card balance is
                    less than the transaction total, the remaining balance can be paid for
                    with an alternate form of payment.
                    {" "}
                  </div>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <div className={styles.redeem_title} style={{ marginTop: "40px" }}>
                    Redeem in Store:
                  </div>
                  <div className={styles.redeem_details}>
                    Shop at any Eve By Eve’s or Eve’s Temptation store and show us your
                    e-Gift Card email. Want to visit us? View our
                    {" "}
                    <span className={styles.redeem_link}>store locations</span>
.
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #E0E0E0", height: "1px" }} />
            </div>
            <div style={{ borderTop: "1px solid #E0E0E0", height: "1px" }} />
            <div style={{ display: "inline-flex", marginTop: "30px" }}>
              <div className={styles.left}>
                <img src="https://hiddenfigure.evestemptation.com/email/Gift-Card_50_shadow.jpg" />
                <div className={styles.card_name}>Eve By Eve's Gift Card</div>
                <div className={styles.card_note}>REDEEM ONLINE, OR IN STORE.</div>
              </div>
              <div className={styles.right}>
                <div style={{ marginBottom: "15px" }}>
                  <div className={styles.redeem_title}>Redeem Online:</div>
                  <div className={styles.redeem_situation}>Use as Account Balance</div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>1.</span>
                    {" "}
Gently scratch label
                    off of card to reveal the gift card code.
                    {" "}
                  </div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>2.</span>
                    {" "}
Sign in to your
                    account.
                    {" "}
                  </div>
                  <div className={styles.redeem_details}>
                    <span className={styles.redeem_index}>3.</span>
                    {" "}
Click
                    {" "}
                    <span className={styles.redeem_index}>
                      {" "}
                      Account Balance/Gift Card.
                    </span>
                  </div>
                  <div
                    className={styles.redeem_details}
                    style={{ display: "inline-flex" }}
                  >
                    <span className={styles.redeem_index}>4.</span>
                    <div>
                      Enter your gift card code and click
                      {" "}
                      <span className={styles.redeem_index}>Redeem.</span>
                      {" "}
The credit will
                      be transfered to your account balance.
                      {" "}
                    </div>
                  </div>
                  <div className={styles.redeem_situation}>Use at Checkout</div>
                  <div className={styles.redeem_details}>
                    Gift card can also be applied at checkout. If the gift card balance is
                    less than the transaction total, the remaining balance can be paid for
                    with an alternate form of payment.
                    {" "}
                  </div>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <div className={styles.redeem_title} style={{ marginTop: "40px" }}>
                    Redeem in Store:
                  </div>
                  <div className={styles.redeem_details}>
                    Shop at any Eve By Eve’s or Eve’s Temptation store and show us your
                    e-Gift Card email. Want to visit us? View our
                    {" "}
                    <span className={styles.redeem_link}>store locations</span>
.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.redeem_extra}>
              This gift card can be redeemed for merchandise online at
              www.evestemptation.com or in stores at the Beverly Hills Flagship Store and
              Westfield Santa Anita Store and cannot be redeemed for cash. Please
              safeguard this gift card; lost or stolen gift cards will not be replaced. We
              reserve the right of final decision on the interpretation of these Terms and
              Conditions. For customer service, email us at helpdesk@evestemptation.com or
              call 1-855-844-0545.
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={767}>
          <div className={styles.GiftCardContainer}>
            <div className={styles.title}>How to Redeem Your Gift Card</div>
            <div className={styles.card_info}>
              <img src="https://hiddenfigure.evestemptation.com/email/eGift-Card_50_shadow.jpg" />
              <div className={styles.card_name}>Eve By Eve's e-Gift Card</div>
              <div className={styles.card_note}>
                REDEEM ONLINE, OR IN STORE.
RECEIVE IMMEDIATELY
              </div>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <div className={styles.redeem_title}>Redeem Online:</div>
              <div className={styles.redeem_situation}>Use as Account Balance</div>
              <div className={styles.redeem_details}>
                <span className={styles.redeem_index}>1.</span>
                {" "}
Copy the eGift Card Code
                sent to you via email.
                {" "}
              </div>
              <div className={styles.redeem_details}>
                <span className={styles.redeem_index}>2.</span>
                {" "}
Sign in to your account.
                {" "}
              </div>
              <div className={styles.redeem_details}>
                <span className={styles.redeem_index}>3.</span>
                {" "}
Click
                {" "}
                <span className={styles.redeem_index}> Account Balance/Gift Card.</span>
              </div>
              <div className={styles.redeem_details} style={{ display: "inline-flex" }}>
                <span className={styles.redeem_index}>4.</span>
                <div>
                  Enter your gift card code and click
                  {" "}
                  <span className={styles.redeem_index}>Redeem.</span>
                  {" "}
The credit will be
                  transfered to your account balance.
                  {" "}
                </div>
              </div>
              <div className={styles.redeem_situation}>Use at Checkout</div>
              <div className={styles.redeem_details}>
                Gift card can also be applied at checkout. If the gift card balance is
                less than the transaction total, the remaining balance can be paid for
                with an alternate form of payment.
                {" "}
              </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <div className={styles.redeem_title}>Redeem in Store:</div>
              <div className={styles.redeem_details}>
                Shop at any Eve By Eve’s or Eve’s Temptation store and show us your e-Gift
                Card email. Want to visit us? View our
                {" "}
                <span className={styles.redeem_link}>store locations</span>
.
              </div>
            </div>
            <div style={{ borderTop: "1px solid #E0E0E0", height: "1px" }} />
            <div className={styles.card_info}>
              <img src="https://hiddenfigure.evestemptation.com/email/Gift-Card_50_shadow.jpg" />
              <div className={styles.card_name}>Eve By Eve's Gift Card</div>
              <div className={styles.card_note}>REDEEM ONLINE, OR IN STORE.</div>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <div className={styles.redeem_title}>Redeem Online:</div>
              <div className={styles.redeem_situation}>Use as Account Balance</div>
              <div className={styles.redeem_details} style={{ display: "inline-flex" }}>
                <span className={styles.redeem_index}>1.</span>
                <div>Gently scratch label off of card to reveal the gift card code.</div>
              </div>
              <div className={styles.redeem_details}>
                <span className={styles.redeem_index}>2.</span>
                {" "}
Sign in to your account.
                {" "}
              </div>
              <div className={styles.redeem_details}>
                <span className={styles.redeem_index}>3.</span>
                {" "}
Click
                {" "}
                <span className={styles.redeem_index}> Account Balance/Gift Card.</span>
              </div>
              <div className={styles.redeem_details} style={{ display: "inline-flex" }}>
                <span className={styles.redeem_index}>4.</span>
                <div>
                  Enter your gift card code and click
                  {" "}
                  <span className={styles.redeem_index}>Redeem.</span>
                  {" "}
The credit will be
                  transfered to your account balance.
                  {" "}
                </div>
              </div>
              <div className={styles.redeem_situation}>Use at Checkout</div>
              <div className={styles.redeem_details}>
                Gift card can also be applied at checkout. If the gift card balance is
                less than the transaction total, the remaining balance can be paid for
                with an alternate form of payment.
                {" "}
              </div>
            </div>
            <div style={{ marginBottom: "30px" }}>
              <div className={styles.redeem_title}>Redeem in Store:</div>
              <div className={styles.redeem_details}>
                Shop at any Eve By Eve’s or Eve’s Temptation store and show us your e-Gift
                Card email. Want to visit us? View our
                {" "}
                <span className={styles.redeem_link}>store locations</span>
.
              </div>
            </div>
            <div className={styles.redeem_extra}>
              This gift card can be redeemed for merchandise online at
              www.evestemptation.com or in stores at the Beverly Hills Flagship Store and
              Westfield Santa Anita Store and cannot be redeemed for cash. Please
              safeguard this gift card; lost or stolen gift cards will not be replaced. We
              reserve the right of final decision on the interpretation of these Terms and
              Conditions. For customer service, email us at helpdesk@evestemptation.com or
              call 1-855-844-0545.
            </div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default connect()(GiftCardInstruction);
