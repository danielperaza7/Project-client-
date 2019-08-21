import React from "react";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import LinkWrapper from "../../../CMS/components/LinkWrapper/LinkWrapper";

import styles from "./NoProduct.css";

export default () => {
  const recommendProps = {
    cmsid: "cart-recommend"
  };

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.img}
        src="https://hiddenfigure.evestemptation.com/email/Page404/DriftAway2.jpg"
        alt="Eve's Temptation"
      />
      <div className={styles.oops}>Oops! We weren't quite ready for that. </div>
      <div className={styles.text}>
        Sorry, we couldn’t find what you are looking for. Head back to our Homepage for
        more beautiful finds.
        {" "}
      </div>
      <div className={styles.goBack}>
        <LinkWrapper path="/" click>
          Go to Homepage
        </LinkWrapper>
      </div>
      <div className={`${styles["picks-for-you"]} container`}>
        <h2>Picks For You</h2>
        <CMSBlock {...recommendProps} />
      </div>
    </div>
  );
};
