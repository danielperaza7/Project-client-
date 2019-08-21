import React from "react";
import { connect } from "react-redux";
import history from "../../../../history";

import { clearRecentSearch } from "../../AppActions";

import styles from "./RecommendSearch.css";

// props.recommendData:
// {
//   title: "Recently searched",
//   terms: [
//     "bra",
//     "red",
//     "unlined bra",
//     "aaaaa"
//   ]
// }

export default connect()(({
  recommendData,
  parentClose,
  dispatch
}) => {
  if (recommendData && recommendData.terms && recommendData.terms.length) {
    const lastIndex = recommendData.terms.length - 1;
    return (
      <div className={styles.wrapper}>
        <span
          className={styles.clear}
          onClick={() => {
            dispatch(clearRecentSearch());
          }}
        >
          Clear
        </span>
        {recommendData.title ? (
          <h3 className={styles.title}>{recommendData.title}</h3>
        ) : null}
        {recommendData.terms.map((term, i) => {
          return (
            <li
              key={lastIndex - i}
              onClick={() => {
                history.push(`/search?q=${term.replace("&", "%26")}`);
                parentClose();
              }}
            >
              {recommendData.terms[lastIndex - i]}
            </li>
          );
        })}
      </div>
    );
  }
  return null;
});
