import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";

import TagSelector from "./TagSelector";

import styles from "./ConfigsPanel.css";

export default class ConfigsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars_cnt: {
        keyword: 0,
        description: 0
      }
    };

    this.count = this.count.bind(this);
  }

  componentDidMount() {
    //  document.getElementById('select_box').addEventListener('change',function(){
    //    if(type='page') document.getElementById('page').selected= true;
    //    else document.getElementById('block').selected= true;
    //  })
  }

  getDataFromObjectArray(array, key1, value1, key2) {
    if (
      !array
      || array.length < 1
      || !key1
      || key1 === ""
      || !value1
      || value1 === ""
      || !key2
      || key2 === ""
    ) {
      return "";
    }
    const index = _.findIndex(array, (o) => {
      return o[key1] === value1;
    });
    if (index < 0) return "";
    const str = array[index][key2];
    if (str === undefined) return "";
    return str;
  }

  count(event, name) {
    const chars_cnt = {
      keyword: this.state.chars_cnt.keyword,
      description: this.state.chars_cnt.description
    };
    chars_cnt[`${name}`] = event.target.value.length;
    this.setState({
      chars_cnt
    });
  }

  render() {
    const {
      title,
      type,
      meta,
      effective_start,
      effective_end,
      comment,
      tags,
      handleConfigInputChange
    } = this.props;
    const keyword = this.getDataFromObjectArray(meta, "name", "keyword", "content");
    const description = this.getDataFromObjectArray(
      meta,
      "name",
      "description",
      "content"
    );

    return (
      <Row className={styles["box-panel"]}>
        <Col className={styles.configs} xs={12}>
          <Row>
            <Col xs={8}>
              <label>Tags: </label>
              <TagSelector
                tags={tags}
                handleConfigInputChange={handleConfigInputChange}
              />
            </Col>
            <Col xs={4}>
              <label>Usage: </label>
              <select
                id="select_box"
                value={this.props.public ? "public" : "test"}
                onChange={(event) => {
                  handleConfigInputChange("public", event.target.value === "public");
                }}
              >
                <option id="test" value="test">
                  test
                </option>
                <option id="public" value="public">
                  public
                </option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <label>title: </label>
              <input
                value={title}
                onChange={(event) => {
                  handleConfigInputChange("title", event.target.value);
                }}
                type="text"
              />
            </Col>
            <Col xs={4}>
              <label>type: </label>
              <select
                id="select_box"
                value={type}
                onChange={(event) => {
                  handleConfigInputChange("type", event.target.value);
                }}
              >
                <option id="page" value="page">
                  page
                </option>
                <option id="block" value="block">
                  block
                </option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>keyword: </label>
              <input
                value={keyword}
                onChange={(event) => {
                  handleConfigInputChange("keyword", event.target.value, "META");
                  this.count(event, "keyword");
                }}
                type="text"
              />
              <div className={styles.hint}>
                {" "}
                recommends 50~100 characters (6 ~ 16 words). Characters typed:
                {" "}
                <span className={styles.cnt}>
                  {this.state.chars_cnt.keyword || keyword.length}
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>description: </label>
              <textarea
                value={description}
                onChange={(event) => {
                  handleConfigInputChange("description", event.target.value, "META");
                  this.count(event, "description");
                }}
                type="text"
              />
              <div className={styles.hint}>
                {" "}
                recommends 100~200 characters (12 ~ 32 words). Characters typed:
                {" "}
                <span className={styles.cnt}>
                  {this.state.chars_cnt.description || description.length}
                </span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className={styles.moments} xs={12}>
          <Row>
            <Col xs={6}>
              <label>effective_start: </label>
              <input
                value={effective_start}
                onChange={(event) => {
                  handleConfigInputChange("effective_start", event.target.value);
                }}
                type="text"
              />
            </Col>
            <Col xs={6}>
              <label>effective_end: </label>
              <input
                value={effective_end}
                onChange={(event) => {
                  handleConfigInputChange("effective_end", event.target.value);
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.hint}>
                Time format : YYYY-MM-DD HH:mm
                {" "}
                <br />
                (If not sure about end date, use 2099-01-01 01:01 or leave it EMPTY)
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>comment: </label>
              <input
                value={comment}
                onChange={(event) => {
                  handleConfigInputChange("comment", event.target.value);
                }}
                type="text"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
