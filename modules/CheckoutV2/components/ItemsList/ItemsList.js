import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import { connect } from "react-redux";
import ItemDetail from "../ItemDetail/ItemDetail";

import styles from "./ItemsList.css";
import history from "../../../../history";
import { getAuthStatus } from "../../../Authentication/AuthReducer";

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local_list: [],
      giftCardRM: [],
      showDialogue: false,
      dialogueText: null
    };
    this.clearGiftCardId = this.clearGiftCardId.bind(this);
    this.forceDeleteProduct = this.forceDeleteProduct.bind(this);
    this.renderDialogue = this.renderDialogue.bind(this);
  }

  componentDidMount() {
    this.setState({
      local_list: this.props.productList || []
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.atCheckoutPage
      && nextProps.productList
      && nextProps.productList.length !== 0
    ) {
      const hasRegularProduct = nextProps.productList.some(
        element => !element.redeem_points
      );
      if (!hasRegularProduct) {
        this.setState({
          showDialogue: true,
          dialogueText:
            "Merchandise must be included in your order to check out. Please add one or more non-redeem product to your shopping bag."
        });
      }
      const hasExpiredRedeemedProduct = nextProps.productList.some((element) => {
        if (element.redeem_expire_date) {
          const expDate = new Date(element.redeem_expire_date.split(" ")[0]); // special case for iOS Safari browser
          if (expDate.getTime() - new Date().getTime() < 0) {
            return true;
          }
          return false;
        }
        return false;
      });
      if (hasExpiredRedeemedProduct) {
        this.setState({
          showDialogue: true,
          dialogueText: (
            <span
              dangerouslySetInnerHTML={{
                __html:
                  "You have 1 or more <b>expired</b> redemption item(s) in your cart. Please remove the item(s) before continue."
              }}
            />
          )
        });
      }
    }
    const newList = nextProps.productList;
    let newLocalList = [];
    if (!newList) return;
    if (this.props.mode === "YOUR ORDER ITEMS") {
      newLocalList = this.state.local_list.filter((ele) => {
        return (
          ele.name
            .replace(/\s+/g, "")
            .toLowerCase()
            .indexOf("e-giftcard") === -1
        );
      });
    }

    if (newLocalList.length > 0) {
      newLocalList = newLocalList.map((ele) => {
        const eGiftCard = ele.name
          .replace(/\s+/g, "")
          .toLowerCase()
          .indexOf("e-giftcard") !== -1;
        // intersection compares the list from response (after removed item from cart) with local list, return a list of unremoved items
        const intersection = newList.find((ele2) => {
          const eGiftCard2 = ele2.name
            .replace(/\s+/g, "")
            .toLowerCase()
            .indexOf("e-giftcard") !== -1;
          if (eGiftCard2 || eGiftCard) return false;
          return (
            // regular item and redeemed item can have the same sku, avoid returning same product multiple times
            ele2.sku === ele.sku && ele2.redeem_points === ele.redeem_points
          );
        });
        if (!intersection) {
          ele.deleted = true;
        } else {
          ele = intersection;
          ele.deleted = false;
          intersection.exist = true;
        }
        console.log("----000----", ele);
        return ele;
      });
    }
    console.log("------", this.state.local_list, newList);

    newLocalList = newLocalList.concat(
      newList.filter((ele) => {
        return (
          !ele.exist
          || (this.props.mode === "YOUR ORDER ITEMS"
            && ele.name
              .replace(/\s+/g, "")
              .toLowerCase()
              .indexOf("e-giftcard") !== -1)
        );
      })
    );
    this.setState({ local_list: newLocalList });
  }

  forceDeleteProduct(sku, mode, _id) {
    console.log("_id", _id);
    this.setState({
      local_list: this.state.local_list.filter((ele) => {
        return ele.sku !== sku;
      })
    });
  }

  clearGiftCardId(_id) {
    console.log("_id", _id);
  }

  renderDialogue(value) {
    return (
      <div className={styles.modalContainer}>
        <Modal
          show={this.state.showDialogue}
          onHide={() => {
            this.setState({ showDialogue: false });
          }}
          dialogClassName={styles.dialog}
        >
          <div className={styles.contentBox}>
            <div className={styles.cross}>
              <span
                onClick={() => {
                  this.setState({ showDialogue: false });
                }}
              >
                &times;
              </span>
            </div>
            <div className={styles.textBox}>
              <p className={styles.textDescription}>{value}</p>
            </div>
            <hr className={styles.hrInModal} />
            <div
              className={styles.buttonBox}
              onClick={() => {
                this.setState({ showDialogue: false });
              }}
            >
              OK, I got it!
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  render() {
    const {
      productList, noButtons, mode, productNum, authStatus
    } = this.props;
    let descriptionStyles = styles.description;
    if (!productList || !this.state.local_list) {
      return <div> no product </div>;
    }

    const isWishlist = mode === "wishlist";
    let listClassName = isWishlist
      ? styles.descriptionWishlist
      : styles.descriptionOrderList;

    let emptyListContent = null;
    // When the array is empty and this is wishlist
    if (Array.isArray(this.state.local_list) && this.state.local_list.length === 0) {
      if (isWishlist) {
        if (authStatus) {
          emptyListContent = [
            <div className={styles.toUseWishlist}>Your wishlist is empty</div>
          ];
        } else {
          emptyListContent = [
            <div
              className={styles.signInText}
              onClick={() => history.push("/signin")}
            >
              SIGN IN
              {" "}
            </div>,
            <div className={styles.toUseWishlist}>to use wishlist</div>
          ];
        }
      } else {
        // when this is order item list
        emptyListContent = [
          <div className={styles.yourBagIsEmpty}>Your Bag is empty</div>,
          <div className={styles.shopNowButton} onClick={() => history.push("/")}>
            Shop Now
          </div>
        ];
      }
    } else {
      // the list is not empty, no need to show description
      descriptionStyles = styles.descriptionNone;
      listClassName = "";
    }

    return (
      <div className={styles.listWrapper} style={{ marginTop: isWishlist ? "20px" : "" }}>
        <div className={styles.subTitle}>
          {isWishlist ? "YOUR WISHLIST" : "YOUR ORDER ITEMS"}
(
          {!isWishlist ? productNum : productList.length}
)
        </div>
        <div className={[descriptionStyles, listClassName].join(" ")}>
          {emptyListContent}
        </div>
        {this.state.local_list
          ? this.state.local_list.map((ele, index) => {
            const key = ele.redeem_points ? `redeem_${ele.sku}` : ele.sku;
            return (
              <ItemDetail
                key={key}
                pos={index + 1}
                productData={ele}
                deleted={ele.deleted}
                forceDeleteProduct={this.forceDeleteProduct}
                noButtons={noButtons}
                mode={mode}
                id={ele.display_id}
                clearGiftCardId={this.clearGiftCardId}
              />
            );
          })
          : null // should never reach here
        }
        {this.renderDialogue(this.state.dialogueText)}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    authStatus: getAuthStatus(store)
  };
}

export default connect(mapStateToProps)(ItemsList);
