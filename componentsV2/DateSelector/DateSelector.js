import React from "react";
import DatePicker from "react-datepicker";
import styles from "./DateSelector.css";

export default class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.changeCallback && this.state.startDate) {
      const formatDate = {
        year: this.state.startDate.format("YYYY"),
        month: this.state.startDate.format("MM"),
        day: this.state.startDate.format("DD")
      };
      this.props.changeCallback(formatDate);
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    if (this.props.changeCallback) {
      const formatDate = {
        year: date.format("YYYY"),
        month: date.format("MM"),
        day: date.format("DD")
      };
      this.props.changeCallback(formatDate);
    }
  }

  render() {
    return (
      <div className={styles["ebe-datepicker"]}>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          placeholderText={this.props.placeholder}
        />
      </div>
    );
  }
}
