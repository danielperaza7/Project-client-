/**
 * Created by warrenchen on 4/25/17.
 */
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

// import DefaultMask from '../../../../components/masks/DefaultMask';

// import styles
import styles from "../totalSegments/TotalSegments.css";

class OrderSummary extends Component {
  renderOrderSummaryTitle() {
    return (
      <div className={styles["summary-title"]}>Order Summary</div>
    );
  }

  renderOrderSummary() {
    const totalSegments = this.props.totalSegments;

    if (totalSegments) {
      const subTotal = totalSegments.subtotal;


      const grandTotal = totalSegments.grand_total;

      // tax = totalSegments.tax && totalSegments.tax.tax ? totalSegments.tax.tax : 0,

      const merchandiseSubtotal = totalSegments.subtotal_after_discount;


      let extraItems;

      // initialize the extra items section
      // if(totalSegments.extras.length > 0) {
      //   extraItems = (
      //     <div className={styles["segment-wrapper"]}>
      //       { totalSegments.extras.map((segment) => {
      //         if( 'value' in segment ){
      //           merchandiseSubtotal = Math.round(merchandiseSubtotal*100 + segment.value*100)/100;
      //         }
      //         let amount;
      //         if( 'value' in segment ){
      //           amount = segment.value >= 0 ? `$${segment.value}` : `-$${-segment.value}`;
      //         }
      //           return (
      //             <Row key={segment.code} className={styles["price-detail-bar"]}>
      //               <Col xs={6}>{segment.title}</Col>
      //               <Col xs={6}
      //                    className={`text-right ${ segment.value<0 ? styles['attention'] : null }`}>{ amount }</Col>
      //             </Row>
      //           );
      //         }
      //       )
      //       }
      //     </div>
      //   );
      // } else {
      //   extraItems = null;
      // }

      return (
        <div>
          <div>
            <div className={styles["segment-wrapper"]}>
              <Row className={styles["price-detail-bar"]}>
                <Col xs={8}>Subtotal</Col>
                <Col xs={4} className="text-right">
                  { this.props.currency }
                  { subTotal }
                </Col>
              </Row>
            </div>
            {/* extraItems */}
            <div className={styles["segment-wrapper"]}>
              <Row className={styles["price-detail-bar"]}>
                <Col xs={8}>Merchandise Subtotal</Col>
                <Col xs={4} className="text-right">
                  { this.props.currency }
                  { merchandiseSubtotal }
                </Col>
              </Row>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <div>
          {this.renderOrderSummaryTitle()}
          {this.renderOrderSummary()}
        </div>
      </div>
    );
  }
}

export default OrderSummary;
