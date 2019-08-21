/**
 * Created by chris on 3/29/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import HeaderNavMobilePage from "./HeaderNavMobilePage";
import HeaderNavMobileButtons from "./HeaderNavMobileButtons";
import styles from "./HeaderNavIcon.css";
import { setMobileStoreName, handleNavStatus } from "../../AppActions";
import { getNavOpen } from "../../AppReducer";

class HeaderNavIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onItemSelected: "MAKEUP",
      onLangSwitched: false,
      currentStore: this.props.storeName
    };
    this.close = this.close.bind(this);
    this.onLangSwitchTrue = this.onLangSwitchTrue.bind(this);
    this.onLangSwitchFalse = this.onLangSwitchFalse.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(handleNavStatus(true));
  }

  onLangSwitchTrue() {
    this.setState({
      onLangSwitched: true
    });
  }

  onLangSwitchFalse() {
    this.setState({
      onLangSwitched: false
    });
  }

  onStoreChange(newStore) {
    if (this.state.currentStore !== newStore) {
      this.setState({ currentStore: newStore });
      this.props.dispatch(setMobileStoreName(newStore));
    }
  }

  close() {
    this.props.dispatch(handleNavStatus(false));
    window.setTimeout(() => {
      this.props.callbackParent(false);
    }, 950);
  }

  // style={{display:"flex", justifyContent:"center", alignItems:"center"}}
  render() {
    return (
      <div>
        <Modal
          className={styles["div-modals"]}
          show={this.props.navOpen}
          onHide={() => {
            this.close();
          }}
        >
          <Modal.Header
            bsClass=""
            closeButton
            className={styles["mobile-nav-modal-header"]}
          >
            <Button
              bsClass="link"
              onClick={() => this.onStoreChange("et")}
              className={this.state.currentStore == "et" ? styles.curStore : ""}
              style={{ padding: "6px 20px", background: "#EFEFEF" }}
            >
              EVE
              {"'"}
S TEMPTATION
            </Button>
            <Button
              bsClass="link"
              onClick={() => this.onStoreChange("ebe")}
              className={this.state.currentStore == "ebe" ? styles.curStore : ""}
              style={{ padding: "6px 20px", background: "#EFEFEF" }}
            >
              EVE BY EVE
              {"'"}
S
            </Button>
          </Modal.Header>
          <Modal.Body bsClass="" className={styles["mobile-nav-modal-body"]}>
            <HeaderNavMobilePage
              header={this.props.header}
              storeName={this.state.currentStore}
              onLangSwitched={this.state.onLangSwitched}
              parentCallbackFalse={this.onLangSwitchFalse}
              parentCallbackTrue={this.onLangSwitchTrue}
              close={this.close}
            />
          </Modal.Body>
          <Modal.Footer bsClass="" className={styles["mobile-nav-modal-footer"]}>
            <HeaderNavMobileButtons
              onLangSwitched={this.state.onLangSwitched}
              authenticated={this.props.authenticated}
              productNum={this.props.productNum}
              userData={this.props.userData}
              close={this.close}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    navOpen: getNavOpen(store)
  };
}

export default connect(mapStateToProps)(HeaderNavIcon);
