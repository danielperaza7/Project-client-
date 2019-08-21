import React, { Component } from "react";

import { Pagination } from "react-bootstrap";
import styles from "./PageIndicator.css";

export default class PageIndicator extends Component {
  renderItems(cur, last, len, changePage) {
    // @param cur: current page number. int
    // @param len: maximum number of blocks to show, need to be an odd number and greater than 5. int
    // @param last: total page number. int
    // @param changePage: function
    let globalKeyCount = 0;
    const items = [];
    const start = cur - (len - 5) / 2;
    const end = cur + (len - 5) / 2;
    if (last <= len) {
      for (let i = 1; i <= last; i++) {
        items.push(
          <Pagination.Item
            key={globalKeyCount++}
            onClick={() => {
              changePage(i);
            }}
            active={i === cur}
          >
            {i}
          </Pagination.Item>
        );
      }
      return items;
    }
    if (end <= len - 2) {
      for (let i = 1; i <= len - 2; i++) {
        items.push(
          <Pagination.Item
            key={globalKeyCount++}
            onClick={() => {
              changePage(i);
            }}
            active={i === cur}
          >
            {i}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key={globalKeyCount++} disabled />);
      items.push(
        <Pagination.Item
          key={globalKeyCount++}
          onClick={() => {
            changePage(last);
          }}
        >
          {last}
        </Pagination.Item>
      );
      return items;
    }
    if (start >= last - len + 3) {
      items.push(
        <Pagination.Item
          key={globalKeyCount++}
          onClick={() => {
            changePage(1);
          }}
        >
          {1}
        </Pagination.Item>
      );
      items.push(<Pagination.Ellipsis key={globalKeyCount++} disabled />);
      for (let i = last - len + 3; i <= last; i++) {
        items.push(
          <Pagination.Item
            key={globalKeyCount++}
            onClick={() => {
              changePage(i);
            }}
            active={i === cur}
          >
            {i}
          </Pagination.Item>
        );
      }
      return items;
    }
    items.push(
      <Pagination.Item
        key={globalKeyCount++}
        onClick={() => {
          changePage(1);
        }}
      >
        {1}
      </Pagination.Item>
    );
    items.push(<Pagination.Ellipsis key={globalKeyCount++} disabled />);
    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={globalKeyCount++}
          onClick={() => {
            changePage(i);
          }}
          active={i === cur}
        >
          {i}
        </Pagination.Item>
      );
    }
    items.push(<Pagination.Ellipsis key={globalKeyCount++} disabled />);
    items.push(
      <Pagination.Item
        key={globalKeyCount++}
        onClick={() => {
          changePage(last);
        }}
      >
        {last}
      </Pagination.Item>
    );
    return items;
  }

  render() {
    const { changePage, pageNum } = this.props;
    if (!pageNum || !changePage || !pageNum.current_page || !pageNum.total_page) {
      return null;
    }
    const { current_page, total_page } = pageNum;
    return (
      <Pagination bsSize="large" bsClass={styles.pagination}>
        {current_page === 1 ? (
          <li style={{ display: "none" }} />
        ) : (
          <Pagination.Prev
            onClick={() => {
              changePage(current_page - 1);
            }}
          />
        )}
        {this.renderItems(current_page, total_page, 7, changePage)}
        {current_page === total_page ? (
          <li style={{ display: "none" }} />
        ) : (
          <Pagination.Next
            onClick={() => {
              changePage(current_page + 1);
            }}
          />
        )}
      </Pagination>
    );
  }
}
