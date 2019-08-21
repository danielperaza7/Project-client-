// import dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import RewardPointProduct from "./RewardPointProduct";
import RedeemablePoints from "./RedeemablePoints";
import styles from "./RPRP.css";

import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { getUserData, getRedeemSchema, getRewardPoints } from "../../../App/AppReducer";
import { getRedeemedPointsInCart } from "../../../CheckoutV2/CheckoutReducer";
import { fetchRedeemedList } from "../../../CheckoutV2/CheckoutActions";

export const RPRPListInfo = {
  id: "RPRP_List"
};

class RPRPList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsWithRewardPoint: null,
      redeemedPointsInCart: 0
    };
    this.renderProductWithRewardPoint = this.renderProductWithRewardPoint.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchRedeemedList());
  }

  handleRewardsInCartDataResponse(data) {
    console.log("handleRewardsInCartDataResponse called", data.products);
    this.setState({
      redeemedInCart: data.products
    });
    console.log("this.state.redeemedInCart", this.state.redeemedInCart);
  }

  renderProductWithRewardPoint(productsWithRewardPoint) {
    // console.log('renderProductWithRewardPoint called!', productsWithRewardPoint);
    return productsWithRewardPoint.map((product, index) => {
      // console.log('map called!', product);
      return (
        <Col
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={6}
          key={`redeem_${index}`}
          style={{ display: "flex" }}
        >
          <RewardPointProduct
            product={product}
            redeemablePoints={this.props.rewardPoints - this.props.redeemedPointsInCart}
            redeemedPointsInCart={this.props.redeemedPointsInCart}
          />
        </Col>
      );
    });
  }

  render() {
    // console.log(this.state.productsWithRewardPoint);
    console.log("props in RPRPList", this.props);
    const { listTitle, listFooterNotice, products } = this.props;

    return (
      <div>
        <Grid>
          <MediaQuery minWidth={1440} values={{ width: "1440px" }}>
            <Row className={styles.RPRPBanner}>
              <div className={styles.maximizeYourRewardPointsValue}>
                Maximize Your Reward Points Value
              </div>
            </Row>
            <Row>
              <RedeemablePoints
                isAuthenticated={this.props.isAuthenticated}
                rewardPoints={this.props.rewardPoints}
                redeemedPointsInCart={this.props.redeemedPointsInCart}
              />
            </Row>
          </MediaQuery>
          <MediaQuery minWidth={1024} maxWidth={1439} values={{ width: "1440px" }}>
            <Row className={styles.RPRPBanner}>
              <div className={styles.maximizeYourRewardPointsValue}>
                Maximize Your Reward Points Value
              </div>
            </Row>
            <Row>
              <RedeemablePoints
                isAuthenticated={this.props.isAuthenticated}
                rewardPoints={this.props.rewardPoints}
                redeemedPointsInCart={this.props.redeemedPointsInCart}
              />
            </Row>
          </MediaQuery>
          <MediaQuery minWidth={768} maxWidth={1023} values={{ width: "1440px" }}>
            <Row className={styles.RPRPBanner}>
              <div className={styles.maximizeYourRewardPointsValue}>
                Maximize Your
                {" "}
                <br />
                Reward Points Value
              </div>
            </Row>
            <Row>
              <RedeemablePoints
                isAuthenticated={this.props.isAuthenticated}
                rewardPoints={this.props.rewardPoints}
                redeemedPointsInCart={this.props.redeemedPointsInCart}
              />
            </Row>
          </MediaQuery>
          <MediaQuery maxWidth={767} values={{ width: "1440px" }}>
            <Row className={styles.RPRPBanner}>
              <div className={styles.maximizeYourRewardPointsValue}>
                Maximize Your
                {" "}
                <br />
                Reward Points Value
              </div>
            </Row>
            <Row>
              <RedeemablePoints
                isAuthenticated={this.props.isAuthenticated}
                rewardPoints={this.props.rewardPoints}
                redeemedPointsInCart={this.props.redeemedPointsInCart}
              />
            </Row>
          </MediaQuery>
          <Row className={styles.listHeaderContainer}>
            <div className={styles.listHeader}>{listTitle}</div>
          </Row>
          <Row>
            <Col xl={2} lg={2} md={0} sm={0} xs={0} />
            <Col
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={12}
              className={styles.productWithRPList}
            >
              {products && products.length > 0
                ? this.renderProductWithRewardPoint(products)
                : null}
            </Col>
            <Col xl={2} lg={2} md={0} sm={0} xs={0} />
          </Row>
          <Row className={styles.listFooter}>
            <Col xl={2} lg={2} md={0} sm={0} xs={0} />
            <Col xl={8} lg={8} md={12} sm={12} xs={12}>
              {listFooterNotice}
            </Col>
            <Col xl={2} lg={2} md={0} sm={0} xs={0} />
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: getUserData(state),
    redeemSchema: getRedeemSchema(state),
    redeemedPointsInCart: getRedeemedPointsInCart(state),
    isAuthenticated: getAuthStatus(state),
    rewardPoints: getRewardPoints(state)
  };
}

export default connect(mapStateToProps)(RPRPList);
