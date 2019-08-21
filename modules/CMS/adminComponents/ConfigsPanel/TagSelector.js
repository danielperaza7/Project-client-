import React, { Component } from "react";

import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import styles from "./ConfigsPanel.css";

class TagSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: {}
    };

    this.onCheck = this.onCheck.bind(this);
  }

  componentWillMount() {
    if (this.props.tags && this.props.tags.length) {
      this.setState({
        selectedTags: this.props.tags.reduce((res, tag) => {
          res[tag] = true;
          return res;
        }, {})
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags.length !== this.props.tags.length) {
      this.setState({
        selectedTags: nextProps.tags.reduce((res, tag) => {
          res[tag] = true;
          return res;
        }, {})
      });
    }
  }

  onCheck(value) {
    const newTags = { ...this.state.selectedTags };
    newTags[`${value}`] = !this.state.selectedTags[`${value}`];

    this.setState({
      selectedTags: newTags
    });

    return Object.keys(newTags)
      .filter((k) => {
        return newTags[k];
      })
      .map(String);
  }

  render() {
    if (!this.props.tags || !this.state.selectedTags) {
      return <div />;
    }
    const all_tags = ["channel", "header", "footer", "promotion", "special"];

    return (
      <span className={styles.tagOptions}>
        {all_tags.map((tag) => {
          return (
            <span key={tag}>
              <FieldFormControlCheckbox
                id={tag}
                title={tag}
                input={{
                  value: this.props.tags ? this.props.tags.includes(tag) : false,
                  onChange: () => {
                    this.props.handleConfigInputChange("tags", this.onCheck(tag));
                  }
                }}
              />
            </span>
          );
        })}
      </span>
    );
  }
}

export default TagSelector;
