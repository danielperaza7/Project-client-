/**
 * Created by warren on 6/19/17.
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
// import action
import { CSSTransitionGroup } from "react-transition-group";
import { clearErrors } from "../../AppActions";

// import styles
import styles from "./Error.css";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      removeErrorsHandler: null,
      delay: 2500
    };
    this.popOneError = this.popOneError.bind(this);
  }

  componentWillMount() {
    const { errors } = this.props;
    this.setState({
      errors
    });
    if (errors && errors.length > 0) {
      const removeErrorsHandler = setInterval(
        () => {
          this.popOneError();
        },
        this.state.delay
      );
      this.setState({
        removeErrorsHandler
      });
    }
    this.props.dispatch(clearErrors());
  }

  componentWillReceiveProps(nextProps) {
    // once crete a interval handler, it can clear by it self
    // here we handle if no handler but this.state.errors is not empty case
    if (
      this.state.removeErrorsHandler === null
      && this.state.errors
      && this.state.errors.length > 0
    ) {
      const removeErrorsHandler = setInterval(
        () => {
          this.popOneError();
        },
        this.state.delay
      );
      this.setState({
        removeErrorsHandler
      });
    }
    if (nextProps.errors && nextProps.errors.length > 0) {
      const newErrors = this.state.errors;
      // need to avoid repeated error, update states in DidUpate will trigger DidUpate function
      // though this is a really bad idea to handle state change here but somehow this is the only way I could come up
      const errorsToBeAdded = nextProps.errors;
      for (const error of errorsToBeAdded) {
        const foundIndex = _.findIndex(newErrors, error);
        if (foundIndex < 0) {
          newErrors.push(error);
        } else {
          newErrors.splice(foundIndex, 1);
        }
      }
      this.props.dispatch(clearErrors());
      this.setState({
        errors: newErrors
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.errors && nextProps.errors.length > 0) {
      return true;
    }
    if (this.state.removeErrorsHandler !== null) {
      return true;
    }
    if (
      this.props.errors
      && nextProps.errors
      && this.props.errors.length !== nextProps.errors.length
    ) {
      return true;
    }
    return false;
  }

  popOneError() {
    const { errors } = this.state;
    if (!errors || errors.length <= 1) {
      this.setState({ errors: [] });
      clearInterval(this.state.removeErrorsHandler);
      this.setState({ removeErrorsHandler: null });
    } else {
      this.setState({ errors: errors.splice(0, 1) });
    }
  }

  render() {
    return (
      <div className={styles["error-container"]}>
        <CSSTransitionGroup
          transitionName={{
            enter: styles["example-enter"],
            enterActive: styles["example-enter-active"],
            leaveActive: styles["example-leave-active"],
            leave: styles["example-leave"]
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.state.errors.map((error) => {
            return (
              <div className={styles["error-item"]} key={error.code}>
                <div>{error.msg}</div>
              </div>
            );
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}

Error.propTypes = {
  errors: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(store) {
  return {
    errors: store.app.errors
  };
}
export default connect(mapStateToProps)(Error);
