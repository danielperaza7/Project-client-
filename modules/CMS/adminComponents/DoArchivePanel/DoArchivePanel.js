import React, { Component } from "react";

import FieldFormControlCheckbox from "../../../../components/FieldFormControlCheckbox";
import FieldFormControlSelect from "../../../../components/FieldFormControlSelect";

import styles from "./DoArchivePanel.css";

class DoArchivePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readme: false,
      CMSIDSelect: "",
      archiving: false,
      success: false
    };

    this.onToggleReadme = this.onToggleReadme.bind(this);
    this.onCMSIDSelect = this.onCMSIDSelect.bind(this);
    this.onArchive = this.onArchive.bind(this);
  }

  onToggleReadme() {
    this.setState({
      readme: !this.state.readme
    });
  }

  onCMSIDSelect(event) {
    this.setState({
      CMSIDSelect: event.target.value
    });
  }

  onArchive() {
    this.setState({ archiving: true });
    if (this.state.readme) {
      const params = {
        id: this.state.CMSIDSelect,
        country: "us",
        store: "ebe",
        lan: "en"
      };
      this.props.archiveCMSIdContent(params, () => {
        this.setState({ CMSIDSelect: "", archiving: false, success: true });
        try {
          window.setTimeout(() => {
            this.setState({ readme: false, success: false });
          }, 2000);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  renderInstruction(context) {
    return (
      <div className={styles.instruction}>
        <p>{context.description}</p>
        {context.list.map((item, index) => {
          return <p key={index}>{`${index + 1}. ${item}`}</p>;
        })}
      </div>
    );
  }

  renderDoArchive(ids) {
    return (
      <div className={styles.doArchive}>
        <p> Only CMS blocks and NOT pulic CMS contents can be archived. </p>
        {" "}
        <br />
        <span> CMS ID:</span>
        <span className={styles.selectCMSID}>
          {" "}
          <FieldFormControlSelect
            input={{ onChange: this.onCMSIDSelect, value: this.state.CMSIDSelect }}
            placeholder="select cms id you want to delete"
            options={ids.map((ele) => {
              return { id: ele.url, name: ele.url };
            })}
          />
        </span>
        <span>
          {" "}
          will be archived by:
          {" "}
          <strong>{this.props.username}</strong>
          {" "}
        </span>
        <button onClick={this.onArchive} disabled={!this.state.readme}>
          {this.state.archiving
            ? "ARCHIVING..."
            : this.state.success
              ? "SUCCESS ARCHIVED CONTENT"
              : "ARCHIVE"}
        </button>
      </div>
    );
  }

  render() {
    const warnings = {
      description: "You should be fully awared of what you are doing, please make sure:",
      list: [
        "CMS ID content you are going to delete has never been published for public",
        "If published but still want to delete it, please prepare a link for redirect if anyone visit the link"
      ]
    };

    const recovery = {
      description: "How to recover a CMS content entry if delete by mistake:",
      list: [
        "Go to the Archived List and find the one you want to recover",
        "Open another admin window click NEW",
        "Copy and paste from deleted one to new one",
        "Save and check if it works"
      ]
    };

    const read_and_check = "I have read warnings and how-to-recover guide above. I must and have to delete some CMS content.";

    return (
      <div className="container">
        <div className={styles.wrapper}>
          <h3 className={styles.title}>
            {" "}
            Dangerous Zone for Archiving CMS Content by ID
            {" "}
          </h3>
          {this.renderInstruction(warnings)}
          {this.renderInstruction(recovery)}
          <p>
            Please read the warning above and then check the checkbox below to enable
            "ARCHIVE" button.
          </p>
          <FieldFormControlCheckbox
            id="readme"
            title={read_and_check}
            input={{ value: this.state.readme, onChange: this.onToggleReadme }}
          />
          {this.renderDoArchive(this.props.cms_ids)}
        </div>
      </div>
    );
  }
}

export default DoArchivePanel;
