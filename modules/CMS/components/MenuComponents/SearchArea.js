import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { connect } from "react-redux";
import history from "../../../../history";
import { elasticSearch } from "../../../App/AppActions";
import { getHistorySearch } from "../../../App/AppReducer";
import { getSearchProductNum } from "../../../Category/CategoryReducer";
import styles from "./HeaderMenuDesktop.css";

class SearchArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      input: "",
      rencent_search: [],
      submit_already: false,
      show: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeRecentItem = this.removeRecentItem.bind(this);
    this.removeAllInput = this.removeAllInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onSubmit() {
    this.setState({
      submit_already: true
    });
    const cookie = new Cookies();
    if (cookie.get("search") === undefined) {
      cookie.set("time", []);
    } else {
      const cur = cookie.get("search");
      if (!cur.includes(this.state.input.toLowerCase())) {
        cur.push(this.state.input.toLowerCase());
      }
    }
    if (this.state.input && this.state.input !== "") {
      this.props.closeSearchArea();
      history.push(`/search?q=${this.state.input.replace("&", "%26")}`);
    }
  }

  setRecentItem(item) {
    this.setState({
      focus: true,
      input: item,
      submit_already: false
    });
    this.props.dispatch(elasticSearch(item));
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.onSubmit();
    }
  }

  removeRecentItem(item) {
    const history = this.state.rencent_search;
    for (let i = 0; i < history.length; i++) {
      if (history[i] === item) {
        history.splice(i, 1);
        break;
      }
    }
    this.setState({
      rencent_search: history
    });
    const cookie = new Cookies();
    cookie.set("time", history);
  }

  handleInputChange(event) {
    this.setState({
      focus: true,
      input: event.target.value,
      submit_already: false
    });

    this.props.dispatch(elasticSearch(event.target.value));
  }

  removeAllInput() {
    this.setState({
      input: "",
      submit_already: false
    });
    this.props.dispatch(elasticSearch(""));
  }

  renderSearchInputArea() {
    return (
      <div className={styles.search_input}>
        <input
          type="text"
          className={styles.input}
          value={this.state.input}
          placeholder="I am looking for"
          onChange={this.handleInputChange}
          onFocus={() => {
            this.setState({ focus: true });
          }}
          autoFocus={this.props.autoFocus}
          onKeyPress={this.handleKeyPress}
        />
        <i
          style={{ display: this.state.input ? "" : "none" }}
          className={`ion-close-circled ${styles["ion-close-circled"]}`}
          onClick={this.removeAllInput}
        />
        <button type="submit" className={styles.btn} onClick={this.onSubmit}>
          Search
        </button>
      </div>
    );
  }

  renderElasticSearchPart() {
    const { searchHistory } = this.props;
    let suggests_list = null;
    if (searchHistory && searchHistory.suggests) {
      suggests_list = searchHistory.suggests.map(item => (
        <div className={styles.suggestsItem} onClick={() => this.setRecentItem(item)}>
          {item}
        </div>
      ));
    }
    return (
      <div>
        {!this.state.submit_already
          ? suggests_list
          : this.props.productNum === 0
            ? `${this.state.input} didn’t match any products.`
            : null}
      </div>
    );
  }

  renderRecentSearchPart(left_content_title, product_info) {
    const elasticSearch_style = this.state.input
      && this.props.searchHistory
      && this.props.searchHistory.suggests
      && this.props.searchHistory.suggests.length > 0;
    if (!this.state.rencent_search.length && !elasticSearch_style) {
      return <div>{this.renderRecommendationPart(left_content_title, product_info)}</div>;
    }

    const recent_list = this.state.rencent_search.map(item => (
      <div className={styles.recentCard} key={item}>
        <span onClick={() => this.setRecentItem(item)}>{item}</span>
        <span className={styles.clearBtn} onClick={() => this.removeRecentItem(item)}>
          clear
        </span>
      </div>
    ));

    return (
      <div
        className={
          elasticSearch_style ? styles.elasticSearchPart : styles.recentSearchPart
        }
      >
        {!elasticSearch_style ? (
          <div>
            <div className={styles.title}>Recent Search</div>
            <div className={styles.recentCard_list}>{recent_list}</div>
          </div>
        ) : (
          this.renderElasticSearchPart()
        )}
      </div>
    );
  }

  renderRecommendationPart(title, products) {
    const product_list = products.map((item, index) => (
      <div className={styles.productCard} key={index}>
        <Link to={item.link ? item.link.path : null}>
          <img
            src={item.image_url ? item.image_url.md : null}
            alt={item.title}
            title={item.title}
            width={111}
            height={111}
          />
        </Link>
        <div className={styles.productCard_title}>{item.product_name}</div>
      </div>
    ));
    return (
      <div>
        {this.state.submit_already && this.props.searchProductNum === 0 ? (
          <div style={{ width: "394px" }}>
            {`"${
              this.state.input
            }" didn’t match any products`}
          </div>
        ) : (
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.list}>{product_list}</div>
          </div>
        )}
      </div>
    );
  }

  renderTopSearch(TopSearch) {
    const color_arr = ["#F24141", "#F28A63", "#F2C063", "#E0E0E0"];
    const elasticSearch_style = this.state.input
      && this.props.searchHistory
      && this.props.searchHistory.suggests
      && this.props.searchHistory.suggests.length > 0;
    const top_list = TopSearch.map((item, index) => (
      <div
        className={styles.topCard}
        key={index}
        onClick={() => {
          history.push(`/search?q=${item.replace("&", "%26")}`);
          if (this.props.closeMenu) this.props.closeMenu();
        }}
      >
        <span
          className={styles.topNum}
          style={{ background: index < 3 ? color_arr[index] : color_arr[3] }}
        >
          {index + 1}
        </span>
        {item}
      </div>
    ));
    return (
      <div
        className={styles.topSearch_container}
        style={{ marginLeft: elasticSearch_style ? "0px" : "" }}
      >
        <div className={styles.title_top}>Trending Searches</div>
        <div
          className={styles.list_top}
          style={{ borderLeft: elasticSearch_style ? "none" : "" }}
        >
          {top_list}
        </div>
      </div>
    );
  }

  renderSearchInputBelowContent(prop) {
    const { left_content_title, TopSearch, product_info } = prop;
    return (
      <div className={styles.bottom_container}>
        {!this.state.focus
          ? this.renderRecommendationPart(left_content_title, product_info)
          : this.renderRecentSearchPart(left_content_title, product_info)}
        {this.renderTopSearch(TopSearch)}
      </div>
    );
  }

  render() {
    const cookie = new Cookies();
    if (cookie.get("search")) {
      this.setState({ rencent_search: cookie.get("search") });
    }
    const { prop, searchProductNum } = this.props;
    if (!prop) return null;
    if (searchProductNum > 0 && this.state.submit_already) return null;

    return (
      <div className={styles.search_container}>
        {this.renderSearchInputArea()}
        {this.renderSearchInputBelowContent(prop)}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    searchHistory: getHistorySearch(store),
    searchProductNum: getSearchProductNum(store)
  };
}

export default connect(mapStateToProps)(SearchArea);
