import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";

// Import Style
import styles from "../../components/PostListItem/PostListItem.css";

// Import Actions
import { fetchPost } from "../../PostActions";

// Import Selectors
import { getPost } from "../../PostReducer";

export class PostDetailPage extends React.Component {
  componentWillMount() {
    fetchPost(this.props.cuid)(this.props.dispatch);
  }
  render() {
    const { props } = this;
    return (
      <div>
        <Helmet title={props.post.title} />
        <div className={`${styles["single-post"]} ${styles["post-detail"]}`}>
          <h3 className={styles["post-title"]}>{props.post.title}</h3>
          <p className={styles["author-name"]}>
            <FormattedMessage id="by" />
            {" "}
            {props.post.name}
          </p>
          <p className={styles["post-desc"]}>{props.post.content}</p>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    cuid: props.params.cuid,
    post: getPost(state, props.params.cuid)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(PostDetailPage);
