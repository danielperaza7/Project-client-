import React, { Component } from "react";
import { Table } from "react-bootstrap";
import history from "../../../../history";

import TagSelector from "../ConfigsPanel/TagSelector";

import styles from "../../pages/admin/AdminPanelPage.css";

class CMSIDList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "",
      increase: true,
      showTagsPanel: false,
      selectedTags: []
    };

    this.showTagsPanel = this.showTagsPanel.bind(this);
    this.toggleOrderBy = this.toggleOrderBy.bind(this);
    this.handleConfigInputChange = this.handleConfigInputChange.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  getExpireTime(effective_start, effective_end) {
    const d = new Date();
    const now = new Date(
      d.getTime() - d.getTimezoneOffset() * 60000 + 3600000 * 7
    ).getTime();

    const start = new Date(effective_start).getTime();

    if (effective_end === "N/A") {
      return {
        visible: now - start >= 0 ? "visible" : "invisible",
        days_diff: "infinite"
      };
    }
    const end = new Date(effective_end).getTime();
    return {
      visible: now - start > 0 && end - now > 0 ? "visible" : "invisible",
      days_diff: `${Math.ceil((end - now) / (1000 * 3600 * 24))} days`
    };
  }

  toggleOrderBy(key) {
    if (this.state.orderBy === key) {
      this.setState({
        increase: !this.state.increase
      });
    } else {
      this.setState({
        orderBy: key,
        increase: true
      });
    }
  }

  showTagsPanel() {
    this.setState({ showTagsPanel: !this.state.showTagsPanel });
  }

  handleConfigInputChange(type, newTags) {
    this.setState({ selectedTags: newTags });
    // apply filter:
  }

  clearAll() {
    this.setState({ selectedTags: [] });
  }

  renderList(cms_list, { orderBy, increase }) {
    if (orderBy) {
      if (increase) {
        cms_list.sort((a, b) => {
          return a[orderBy] > b[orderBy] ? 1 : b[orderBy] > a[orderBy] ? -1 : 0;
        });
      } else {
        cms_list.sort((a, b) => {
          return a[orderBy] < b[orderBy] ? 1 : b[orderBy] < a[orderBy] ? -1 : 0;
        });
      }
    }

    const selectedTags = this.state.selectedTags;

    if (selectedTags.length !== 0) {
      cms_list = cms_list.filter((item) => {
        return selectedTags.every((tag) => {
          return item.tags.includes(tag);
        });
      });
    }

    return (
      <tbody>
        {cms_list.map((item, index) => {
          const effective_info = this.getExpireTime(
            item.effective_start,
            item.effective_end
          );
          return (
            <tr
              key={index}
              onClick={() => {
                history.push(`/cms/admin/liveedit?id=${item.url}`);
              }}
            >
              <td>{index + 1}</td>
              <td>{item.url}</td>
              <td>{item.title}</td>
              <td>
                {effective_info.visible}
                {" "}
                <i
                  className="ion-android-radio-button-on"
                  style={{
                    color: `${effective_info.visible === "visible" ? "green" : "red"}`
                  }}
                />
                {" "}
              </td>
              <td>{effective_info.days_diff}</td>
              <td>{item.tags.join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  render() {
    const { cms_list } = this.props;

    if (!cms_list || cms_list.length === 0) {
      return <div />;
    }

    const headers = [
      { key: "url", title: "CMS ID" },
      { key: "title", title: "Title" },
      { key: "visibility", title: "Visibility" },
      { key: "expire", title: "Expire in" }
    ];

    const TagsPanel = (
      <TagSelector
        tags={this.state.selectedTags}
        handleConfigInputChange={this.handleConfigInputChange}
      />
    );

    return (
      <div className={styles["single-list"]}>
        {this.state.selectedTags.length === 0 ? (
          ""
        ) : (
          <span className={styles.selectedTags}>
            Filtered by tags:
            <strong>
              {" "}
              {this.state.selectedTags.join(", ")}
            </strong>
            <span onClick={this.clearAll} className={styles.clearAll}>
              CLEAR ALL
            </span>
          </span>
        )}
        <p className={styles.hints}>
          Click headers to
          {" "}
          <strong>SORT</strong>
          {" "}
the list by the corresponding key; Click
          "Tags" dropdown button to
          {" "}
          <strong>FILTER</strong>
          {" "}
by tags.
        </p>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>#</th>
              {headers.map((ele) => {
                return (
                  <th
                    key={ele.key}
                    onClick={() => {
                      this.toggleOrderBy(ele.key);
                    }}
                  >
                    {ele.title}
                    {" "}
                    {this.state.orderBy === ele.key ? (
                      <i
                        className={
                          this.state.increase ? "ion-arrow-up-b" : "ion-arrow-down-b"
                        }
                      />
                    ) : (
                      ""
                    )}
                  </th>
                );
              })}
              <th className={styles.tagTh} onClick={this.showTagsPanel}>
                Tags
                {" "}
                <i
                  className={`${
                    this.state.showTagsPanel ? "ion-chevron-up" : "ion-chevron-down"
                  } ${styles.tagsDropdown}`}
                />
              </th>
            </tr>
          </thead>
          {this.renderList(cms_list, this.state)}
        </Table>
        {this.state.showTagsPanel ? (
          <span className={styles.tagsPanel}>{TagsPanel}</span>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CMSIDList;
