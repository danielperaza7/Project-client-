import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import _ from "lodash";
import history from "../../../../history";

// import actions
import { clearCartJustAdded } from "../../AppActions";
import { getCustomerGroupId } from "../../AppReducer";

// import components
import ItemAdded from "./ItemAdded";
import ShakeMotion from "./ShakeMotion";

// import styles
import styles from "./ShoppingCart.css";
import stylesMobile from "../Header/Header.css";

class ShoppingCart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shake: false
    };
    this.renderDropdown = this.renderDropdown.bind(this);
    this.onClearAddedDropdown = this.onClearAddedDropdown.bind(this);
    this.onScrollClear = _.debounce(this.onScrollClear, 1500);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.productNum !== nextProps.productNum) {
      this.setState({ shake: true });
    }

    if (nextProps.productAdded.length !== 0) {
      this.onScrollClear();
    }
  }

  onScrollClear() {
    window.addEventListener("scroll", this.onClearAddedDropdown);
  }

  onClearAddedDropdown() {
    this.props.dispatch(
      clearCartJustAdded(() => window.removeEventListener("scroll", this.onClearAddedDropdown))
    );
  }

  renderDropdown(items) {
    if (!items || items.length === 0) {
      return "";
    }
    return (
      <div>
        <CSSTransitionGroup
          component="div"
          className={`${styles.dropdown} ${
            items.length > 0 ? styles.notEmpty : styles.empty
          }`}
          transitionName={{
            enter: styles["example-enter"],
            enterActive: styles["example-enter-active"],
            leaveActive: styles["example-leave-active"],
            leave: styles["example-leave"]
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {items.map((item, index) => {
            return <ItemAdded key={index} item={item} />;
          })}
          <div className={styles["just-added-buttons"]}>
            <span onClick={this.onClearAddedDropdown}>Continue Shopping</span>
            <span
              onClick={() => {
                this.onClearAddedDropdown();
                if (this.props.customerGroupID > 0) history.push("/checkout");
                else history.push("/checkout/signin");
              }}
            >
              Checkout
            </span>
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }

  render() {
    const { no_animation } = this.props;
    return (
      <div className={styles["shopping-cart"]}>
        {this.props.type === "pc" ? (
          <Link to="/cart">
            <div className={styles["shopping-bag-mini"]}>
              <ShakeMotion
                triggered={this.state.shake}
                reset={() => {
                  this.setState({ shake: false });
                }}
              >
                <i className="ion-bag" />
                <span className={styles["cart-number"]}>{this.props.productNum}</span>
              </ShakeMotion>
            </div>
          </Link>
        ) : (
          <Link to="/cart">
            <li className={stylesMobile["mobile-nav-row-item"]}>
              <ShakeMotion
                triggered={this.state.shake}
                reset={() => {
                  this.setState({ shake: false });
                }}
              >
                <span>
                  <span className={stylesMobile["cart-number"]}>
                    {this.props.productNum}
                  </span>
                </span>
                <i className="ion-bag" />
              </ShakeMotion>
            </li>
          </Link>
        )}
        {/* this.props.productAdded?this.renderDropdown(this.props.productAdded):'' */}

        {!no_animation ? this.renderDropdown(this.props.productAdded) : null}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    customerGroupID: getCustomerGroupId(store)
  };
}

export default connect(mapStateToProps)(ShoppingCart);

/*

  props in :
  product = {
    image: {
      lg:"",
      md:"",
      sm:"",
      ...
    },
    name: "",
    price:"",
    qty:2,
    configs:{

    }
  }
*/
