import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";
import styles from "./RewardShop.css";
import { getRewardPoints } from "../../../App/AppReducer";
import { getAuthStatus } from "../../../Authentication/AuthReducer";
import { getRedeemableProductList } from "../../CheckoutActions";
import { getRedeemableProductInfo } from "../../CheckoutReducer";
import { fetchProductsWithRewardPoints } from "../../../Category/CategoryActions";

class RewardShop extends Component {
  constructor(props) {
    super(props);
    this.state = { redeemableProducts: null };
    this.handleGetRemeemableProductListResponse = this.handleGetRemeemableProductListResponse.bind(
      this
    );
    this.handleProductDataResponse = this.handleProductDataResponse.bind(this);
  }

  componentDidMount() {
    const local_params = {
      id: "rprp-test",
      country: "us",
      lan: "en"
    };
    this.props.dispatch(
      getRedeemableProductList(
        local_params,
        "user",
        this.handleGetRemeemableProductListResponse
      )
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (
      nextProps.redeemableProductInfo
      && nextProps.redeemableProductInfo !== this.props.redeemableProductInfo
    ) {
      this.props.dispatch(
        fetchProductsWithRewardPoints(
          nextProps.redeemableProductInfo,
          this.handleProductDataResponse
        )
      );
    }
  }

  handleGetRemeemableProductListResponse(err, data) {
    console.log("handleGetRemeemableProductListResponse called");
    if (err) {
      console.log(data);
    }
  }

  handleProductDataResponse(data) {
    console.log("handleProductDataResponse called.", data);
    this.setState({
      redeemableProducts: data.products
    });
  }

  renderItemList() {
    if (!this.state.redeemableProducts) return "Loading";
    return this.state.redeemableProducts.map((item) => {
      console.log("item", item);
      if (!item) {
        return null;
      }
      const mainImage = item.images.main && item.images.main.images && item.images.main.images.md
        ? item.images.main.images.md.url
        : null;
      let cap = null;
      if (item.name) {
        cap = (
          <CarouselCaption>
            <p>{item.name}</p>
          </CarouselCaption>
        );
      }
      return (
        <CarouselItem key={item.link}>
          <Link to={item.link}>
            <img alt="" src={mainImage} />
          </Link>
          {cap}
        </CarouselItem>
      );
    });
  }

  render() {
    console.log("Rewardshop called", this.props);
    const { redeemableProductInfo } = this.props;
    let currentLocation = "";
    try {
      currentLocation = window.location.pathname ? window.location.pathname : "";
    } catch (err) {
      currentLocation = "";
    }
    if (this.props.isAuthenticated) {
      if (redeemableProductInfo) {
        return (
          <div>
            <div className={styles.rewardsShopTitle}>Rewards Shop</div>
            <div>Your Points: </div>
            <div>{this.props.rewardPoints}</div>
            {/* <Carousel>{this.renderItemList()}</Carousel> */}
            <Carousel>{this.renderItemList()}</Carousel>
          </div>
        );
      }
      return null;
    }
    return (
      <div>
        <div className={styles.myRewardsText}>My Rewards</div>
        <div className={styles.signinContainer}>
          <Link
            to={{
              pathname: "/signin",
              state: { wherefrom: currentLocation }
            }}
            className={styles.signin}
          >
            Sign in
          </Link>
          <span className={styles.signinText}>
            &nbsp;to check your reward point balance and start redeeming your points for
            products.
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: getAuthStatus(state),
    rewardPoints: getRewardPoints(state),
    redeemableProductInfo: getRedeemableProductInfo(state)
  };
}

export default connect(mapStateToProps)(RewardShop);
