import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./searchBarAnimated.css";
import history from "../../../../history";

import { addRecentSearch } from "../../AppActions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      term: ""
    };
    this.onClickSearch = this.onClickSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  onClickSearch() {
    if (!this.state.isOpen && this.props.forceOpen !== true) {
      this.setState({
        isOpen: true
      });
      this.searchInput.focus();
    } else if (this.state.term && this.state.term !== "") {
      history.push(`/search?q=${this.state.term.replace("&", "%26")}`);
      this.props.dispatch(addRecentSearch(this.state.term));
      if (this.props.parentClose) this.props.parentClose();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // search this.state.term
    this.onClickSearch();
  }

  handleInputOnChange(event) {
    // update state , maybe do some debounce search-btn
    this.setState({ term: event.target.value });
  }

  clearInput() {
    this.setState({ term: "" });
    this.searchInput.focus();
  }

  render() {
    return (
      <form ref="form" onSubmit={this.handleSubmit}>
        <div className={styles["search-wrapper"]}>
          <input
            ref="input"
            className={
              `${styles["search-input"]
              } ${
                this.state.isOpen || this.props.forceOpen
                  ? styles["search-input-open"]
                  : styles["search-input-close"]
              } ${
                this.props.fullWidth ? styles.w100 : ""}`
            }
            type="text"
            placeholder="Search"
            value={this.state.term}
            onBlur={() => {
              if (this.state.isOpen) {
                setTimeout(() => {
                  this.setState({
                    isOpen: false
                  });
                }, 400);
              }
            }}
            onChange={event => this.handleInputOnChange(event)}
            ref={(input) => {
              this.searchInput = input;
            }}
          />
          {(this.state.isOpen || this.props.forceOpen) && this.state.term ? (
            <i
              className={`${styles.clearInput} ion-close-circled`}
              onClick={this.clearInput}
            />
          ) : null}
          <i
            className={`${styles["search-icon"]} ion-ios-search-strong`}
            onClick={() => this.onClickSearch()}
          />
        </div>
      </form>
    );
  }

  // <div className="search-bar">
  //   <i className="ion-ios-search-strong"></i>
  //   <input
  //     value={this.state.term}
  //     onChange={event => this.onInputChange(event.target.value)} />
  // </div>
}

export default connect()(SearchBar);
