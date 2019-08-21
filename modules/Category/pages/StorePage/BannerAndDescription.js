// global impoty
import React, { Component } from "react";
import MediaQuery from "react-responsive";

import styles from "./StorePage.css";

class BannerAndDescription extends Component {
  renderBackgroundImage() {
    return (
      <div>
        <MediaQuery minWidth={768}>
          <img
            src="https://storage.googleapis.com/evesetus/img01%201397x610.jpg"
            alt="arcadia Store"
            width="100%"
            className={styles.backGroundImageContainer}
          />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <img
            src="https://storage.googleapis.com/evesetus/img02%203x2.jpg"
            alt="arcadia Store"
            width="100%"
            className={styles.backGroundImageContainer}
          />
        </MediaQuery>
      </div>
    );
  }

  // renderBannerWithResponsive() {
  //   return (
  //       // layer2: EveGoesPink title, anchor, and pink backgound
  //     <div>
  //       <div style={{ float: 'right' }}>
  //         <div className={styles.titleBlock}>
  //           <span className={styles.poundSign}>#</span><div className={styles.title}>Arcadia  California</div>
  //           <div className={styles.subTitile}>FIND CONFIDENCE IN THE PERFECT FIT</div>
  //         </div>
  //         <div className={styles.bannerBlockWithCursor}>
  //           <div className={styles.singleLink}>
  //             <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
  //             <span>Westfield Santa Anita Store</span>
  //           </div>
  //           <div className={styles.singleLink}>
  //             <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
  //             <span>400 S Baldwin Ave J7</span>
  //           </div>
  //           <div className={styles.singleLink}>
  //             <i className="ion-play" style={{ fontSize: 16, marginRight: 10 }} />
  //             <span>Arcadia, CA 91007</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className={styles.bannerContainer}>
        {this.renderBackgroundImage()}
        {/* {this.renderBannerWithResponsive()} */}
      </div>
    );
  }
}

export default BannerAndDescription;
