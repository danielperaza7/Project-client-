import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Table, PanelGroup, Panel, Col, DropdownButton, MenuItem
} from "react-bootstrap";
import Radiobox from "../../../../components/FieldFormControlRadiobox";

import styles from "./SizeGuide.css";

import { getSizeGuideData } from "../../CMSReducer";
import { getClientMD } from "../../../App/AppReducer";

class SizeGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: null,
      unitMode: "inch", // cm or inch
      currentCol: {
        "bralette-conversion-chart-mobile-2": 2
      }
    };
    this.handleSwitchUnit = this.handleSwitchUnit.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentWillMount() {
    const id = this.props.selectedCategory;
    this.setState({
      currentCategory: id && id !== "" ? id : "bras"
    });
  }

  onMouseEnter(curTableID, colIndex) {
    const currentCol = {
      ...this.state.currentCol
    };
    currentCol[`${curTableID}`] = colIndex;
    this.setState({ currentCol });
  }

  onMouseLeave() {
    this.setState({ currentCol: {} });
  }

  handleSwitchUnit(event) {
    this.setState({
      unitMode: event.target.value
    });
  }

  unitTransform(number, currentUnit, targetUnit, tag) {
    if (currentUnit === targetUnit) return number;
    if (currentUnit === "cm" && targetUnit === "inch") {
      let inches = (number * 0.393700787).toFixed(0);
      if (tag === "height") {
        const feet = Math.floor(inches / 12);
        inches %= 12;
        return `${feet}'${inches}''`;
      }
      return `${inches}''`;
    }
    if (currentUnit === "inch" && targetUnit === "cm") {
      return `${(number * 2.54).toFixed(0)}`;
    }
    return number + currentUnit;
  }

  renderCategoryPCMenu() {
    const { data } = this.props;
    if (!data || data.length < 1) {
      return <div>No sizeguide data</div>;
    }

    const menus = data.map((category) => {
      return (
        <li
          key={category.id}
          className={`${styles["menu-btn"]} ${
            category.id === this.state.currentCategory ? styles["menu-current"] : ""
          }`}
          onClick={() => {
            console.log("called");
            this.setState({ currentCategory: category.id });
          }}
        >
          {category.name}
        </li>
      );
    });
    return menus;
  }

  renderCategoryMobileMenu(dataIndex) {
    const { data } = this.props;
    return (
      <div className={styles.dropdown}>
        <div className={styles.mobileMenu}>{data[dataIndex].name}</div>
        <DropdownButton title="See guide for others" id="size-guide-options">
          {data.map((cat) => {
            return (
              <MenuItem
                key={cat.id}
                onClick={() => {
                  this.setState({ currentCategory: cat.id });
                }}
              >
                {cat.name}
              </MenuItem>
            );
          })}
        </DropdownButton>
      </div>
    );
  }

  renderTableHeader(table) {
    return table.data.headers.map((header, colIndex) => {
      return (
        <th
          key={header.id}
          className={`${header.unitConversion ? "" : styles.boldCell} ${
            this.state.currentCol[`${table.id}`] === colIndex ? styles.hoverCol : ""
          }`}
          style={header.style || {}}
          onMouseEnter={() => this.onMouseEnter(table.id, colIndex)}
          onMouseLeave={this.onMouseLeave}
        >
          {header.name}
        </th>
      );
    });
  }

  renderTableBody(table) {
    return table.data.rows.map((row, index) => {
      return (
        <tr key={index}>
          {table.data.headers.map((header, colIndex) => {
            return (
              <td
                key={header.id}
                className={`${header.unitConversion ? "" : styles.boldCell} ${
                  this.state.currentCol[`${table.id}`] === colIndex ? styles.hoverCol : ""
                }`}
                style={row[header.id].style || {}}
                onMouseEnter={() => this.onMouseEnter(table.id, colIndex)}
                onMouseLeave={this.onMouseLeave}
              >
                {this.renderTableItem(
                  row[header.id],
                  table.data.unit,
                  this.state.unitMode,
                  header.id
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  }

  renderSingleTable(table) {
    return (
      <div key={table.id}>
        {table.name !== undefined ? (
          table.name ? (
            <div className={styles.tableName}>{table.name}</div>
          ) : (
            <div style={{ height: "10px" }} />
          )
        ) : (
          ""
        )}
        {table.description ? (
          <div className={styles.tableDescription}>{table.description}</div>
        ) : (
          ""
        )}
        <div>
          <Table className={styles.showTable} key={table.id} responsive>
            <thead>
              <tr>{this.renderTableHeader(table)}</tr>
            </thead>
            <tbody>{this.renderTableBody(table)}</tbody>
          </Table>
        </div>
      </div>
    );
  }

  renderTables(dataIndex, maxColumnNumber) {
    const { data, clientMD } = this.props;

    if (dataIndex < 0) {
      return "No Category matched";
    }
    if (!data[dataIndex] || !data[dataIndex].tables) {
      return "No table match for dataIndex";
    }
    const tables = data[dataIndex].tables.map((table) => {
      if (!table.responsive) {
        return this.renderSingleTable(table);
      }
      return (
        <div>
          <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            {table.responsive && table.responsive.toUpperCase() === "PC"
              ? this.renderSingleTable(table)
              : ""}
          </MediaQuery>
          <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            {table.responsive && table.responsive.toUpperCase() === "PC"
              ? ""
              : this.renderSingleTable(table)}
          </MediaQuery>
        </div>
      );
    });

    return <div>{tables}</div>;
  }

  renderTableItem(item, currentUnit, targetUnit, tag) {
    let str = "";
    if (item.text) {
      str += item.text;
    }
    if (item.number) {
      str = str
        + (item.text ? " (" : "")
        + this.renderNumber(item.number, currentUnit, targetUnit, tag)
        + (item.text ? ")" : "");
    }
    return str;
  }

  renderNumber(number, currentUnit, targetUnit, tag) {
    if (!number.min && !number.max) {
      return "";
    }
    if (number.min && !number.max) {
      return this.unitTransform(number.min, currentUnit, targetUnit, tag);
    }
    if (number.min && number.max) {
      if (number.min === number.max) {
        return this.unitTransform(number.min, currentUnit, targetUnit, tag);
      }
      return (
        `${this.unitTransform(number.min, currentUnit, targetUnit, tag)
        }-${
          this.unitTransform(number.max, currentUnit, targetUnit, tag)}`
      );
    }
    if (!number.min && number.max) {
      return this.unitTransform(number.max, currentUnit, targetUnit, tag);
    }
  }

  renderChartPanel(dataIndex, flag) {
    const { data } = this.props;
    if (dataIndex > -1) {
      if (!flag) {
        return (
          <Panel className={styles.showChartPanel} eventKey="3" id="3">
            <Panel.Heading>
              <Panel.Title toggle>{data[dataIndex].title}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <div className={styles.tablePanel}>{this.renderTables(dataIndex)}</div>
            </Panel.Body>
          </Panel>
        );
      }
      return (
        <Panel className={styles.showChartPanel} eventKey="3" id="3">
          <Panel.Heading>
            <Panel.Title toggle>{data[dataIndex].title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <div className={styles.unitToggle}>
              <Radiobox
                type="radio"
                name="unit"
                id="unit-mode-inch"
                value="inch"
                checked={this.state.unitMode === "inch"}
                onChange={this.handleSwitchUnit}
                title={(
                  <label htmlFor="unit-mode-inch" className={styles.unitName}>
                    {" "}
                    Inch
                    {" "}
                  </label>
)}
              />

              <Radiobox
                type="radio"
                name="unit"
                id="unit-mode-cm"
                value="cm"
                checked={this.state.unitMode === "cm"}
                onChange={this.handleSwitchUnit}
                title={(
                  <label htmlFor="unit-mode-cm" className={styles.unitName}>
                    {" "}
                    Centimeter
                    {" "}
                  </label>
)}
              />
            </div>
            <div className={styles.tablePanel}>{this.renderTables(dataIndex)}</div>
          </Panel.Body>
        </Panel>
      );
    }
    return null;
  }

  renderGuidePanel(dataIndex) {
    const { data } = this.props;
    if (dataIndex > -1 && data[dataIndex].guide) {
      const colSetting = { lg: 3, sm: 4, xs: 12 };
      return (
        <Panel className={styles.showGuidePanel} eventKey="1" id="1">
          <Panel.Heading>
            <Panel.Title toggle>{data[dataIndex].guide.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <div className={styles.listWrapper}>
              {data[dataIndex].guide.list.map((item) => {
                return (
                  <Col key={item.id} {...colSetting}>
                    {item.image ? (
                      <div className={styles.itemImg}>
                        <img src={item.image} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>{item.name}</div>
                      <p>{item.text}</p>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Panel.Body>
        </Panel>
      );
    }
    return null;
  }

  renderTypesPanel(dataIndex) {
    const { data } = this.props;
    if (dataIndex > -1 && data[dataIndex].types) {
      const colSetting = { lg: 2, sm: 3, xs: 6 };
      return (
        <Panel className={styles.showTypesPanel} eventKey="2" id="2">
          <Panel.Heading>
            <Panel.Title toggle>{data[dataIndex].types.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <div className={styles.listWrapper}>
              {data[dataIndex].types.list.map((item) => {
                return (
                  <Col key={item.id} {...colSetting}>
                    <div className={styles.itemImg}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>{item.name}</div>
                      <p>{item.text}</p>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Panel.Body>
        </Panel>
      );
    }
    return null;
  }

  render() {
    const { data, clientMD } = this.props;
    const dataIndex = _.findIndex(data, { id: this.state.currentCategory });
    const flag = data[dataIndex].unitConversion;

    return (
      <div className={styles.allguide}>
        <div>
          <MediaQuery
            minWidth={768}
            className={styles.menusWrapper}
            values={{ width: clientMD && clientMD.fakeDeviceWidth }}
          >
            {this.renderCategoryPCMenu()}
          </MediaQuery>
          <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            {this.renderCategoryMobileMenu(dataIndex)}
          </MediaQuery>
        </div>

        <PanelGroup
          accordion
          className={styles.panels}
          id="size-panels"
          defaultActiveKey="3"
        >
          {this.renderGuidePanel(dataIndex)}
          {this.renderTypesPanel(dataIndex)}
          {this.renderChartPanel(dataIndex, flag)}
        </PanelGroup>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    data: getSizeGuideData(),
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(SizeGuide);
