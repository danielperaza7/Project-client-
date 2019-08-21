// global import
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { Grid, Modal } from "react-bootstrap";
import axios from "axios/index";
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";
import history from "../../../../history";

// local import
import styles from "./NBCAM.css";
import { getClientMD } from "../../../App/AppReducer";
import { fetchCategory } from "../CategoryContainer/CategoryContainer";
import {
  NBCAM_ALBUM_1,
  NBCAM_ALBUM_2,
  TURN_MODEL_OVER
} from "../../../../config/Customer/NBCAMConfig";
import CMSBlock from "../../../CMS/pages/CMS/CMSBlock";
import { HIDDEN_FIGURE_URL } from "../../../../config/config";
import BannerAndDescription from "./BannerAndDescription";
import NBCarousel from "./NBCAMCarousel";

class NBCAM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRewordPointRule: false,
      showProductMask: null,
      products: null,
      album1: 0,
      album2: 0
    };
    this.handleClickProduct = this.handleClickProduct.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${HIDDEN_FIGURE_URL}/v1/events/nbcam?p=1&customer_group_id=0&psize=40&store=et&category=category/sale/nbcam&country=us`,
      headers: {}
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("error");
        } else if (
          response.data.code === "0000"
            && response.data.data
            && response.data.data.products
        ) {
          this.setState({ products: response.data.data.products });
        } else {
          console.log("fetch NBCAM products error");
        }
      })
      .catch((err) => {
        console.error("fetch NBCAM products error caught", err);
      });
  }

  handleClickProduct(ele) {
    const productColor = ele && ele.all_images && ele.all_images[0].config
      ? `color=${ele.all_images[0].config.color}&simple_color=${
        ele.all_images[0].config.simple_color
      }`
      : "color=&simple_color=";
    const productUrl = `/product/${ele.display_id}?${productColor}`;
    history.push(productUrl);
  }

  renderBanner(clientMD) {
    return (
      <div>
        <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div className={styles.bannerContainer}>
            <img
              className={styles.bannerPic}
              src="https://hiddenfigure.evestemptation.com/email/NBCAM/NBCAMBanner.jpg"
              alt="banner"
            />
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
          <div className={styles.bannerContainer}>
            <img
              className={styles.bannerPic}
              src="https://hiddenfigure.evestemptation.com/email/NBCAM/NBCAMBanner_mobile.jpg"
              alt="banner"
            />
          </div>
        </MediaQuery>
        <div className={styles.textBlock}>
          <div className={styles.titleBlock}>
            <span className={styles.poundSign}>#</span>
            <div className={styles.title}>EVESGOESPINK</div>
            <div className={styles.subTitile}>FIND CONFIDENCE IN THE PERFECT FIT</div>
          </div>

          <div className={styles.linkBlock}>
            <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.singleLink}>
                <a href="#section1">Our curated list for you</a>
                <i className="ion-play" style={{ fontSize: 16, marginLeft: 10 }} />
              </div>
              <div className={styles.singleLink}>
                <a href="#section2">Earn extra reward points</a>
                <i className="ion-play" style={{ fontSize: 16, marginLeft: 10 }} />
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.singleLink}>
                <a href="#section1">Our curated list for you</a>
              </div>
              <div className={styles.singleLink}>
                <a href="#section2">Earn extra reward points</a>
              </div>
            </MediaQuery>
          </div>
        </div>
      </div>
    );
  }

  renderTopWording(clientMD) {
    return (
      <div className={styles.wordingBox}>
        <div className={styles.wordingContainner}>
          <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.topWording}>
              {this.renderBCAMBackground()}
              {this.renderDonate()}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.topWording}>{this.renderBCAMBackground()}</div>
          </MediaQuery>
        </div>
      </div>
    );
  }

  renderBottomWording(clientMD) {
    return (
      <div className={styles.wordingBox}>
        <div className={styles.wordingContainner}>
          <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <div className={styles.topWording}>{this.renderDonate()}</div>
          </MediaQuery>
        </div>
      </div>
    );
  }

  renderBCAMBackground() {
    return (
      <div className={styles.wordingBlock}>
        <strong>Breast Cancer Awareness Month (BCAM)</strong>
        {" "}
is an annual international
        health campaign organized by major breast cancer charities every October to
        increase awareness of breast cancer.
      </div>
    );
  }

  renderDonate() {
    return (
      <div className={styles.wordingBlock}>
        To further our efforts and raise awareness on breast health, we will be donating
        <strong> $1 of every bra purchase</strong>
        {" "}
during the month of October to a breast
        cancer related charity to support early breast cancer detection and prevention.
      </div>
    );
  }

  renderReviewStar(ele) {
    const starsNum = ele.review_data && ele.review_data.average_rate
      ? parseInt(ele.review_data.average_rate, 10)
      : 0;
    const starOutlineNum = ele.review_data && ele.review_data.average_rate
      ? 5 - parseInt(ele.review_data.average_rate, 10)
      : 5;
    const stars = Array(...Array(starsNum)).map(() => 1);
    const starOutline = Array(...Array(starOutlineNum)).map(() => 1);
    return (
      <div className={styles.starBox}>
        {ele.review_data ? (
          <div className={styles.stars}>
            {stars.map((e, i) => {
              return (
                <div key={`star_${i}_box`}>
                  <i key={`star_${e}`} className="ion-android-star" />
                </div>
              );
            })}
            {starOutline.map((e, i) => {
              return (
                <div key={`star_${i}_boxOutline`}>
                  <i key={`star_${e}`} className="ion-android-star-outline" />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  renderSingleProduct(ele, index, clientMD, productClass) {
    return ele
      && ele.original_price_range
      && ele.original_price_range[0]
      && ele.tier_prices
      && ele.tier_prices[0]
      && ele.tier_prices[0][0]
      && ele.images
      && ele.images.hover
      && ele.images.hover.images
      && ele.images.hover.images.xl
      && ele.images.hover.images.xl.url
      && ele.name
      && ele.display_id
      && ele.list_id
      && ele.images.main
      && ele.images.main.images
      && ele.images.main.images.xl ? (
        <div
          key={`${index}productCard`}
          className={productClass}
          onClick={() => {
            this.handleClickProduct(ele);
          }}
        >
          <div
            key={`${index}productPicture`}
            className={styles.productPicture}
            onMouseOver={() => {
              this.setState({ showProductMask: ele.images.hover.images.xl.url });
            }}
            onMouseLeave={() => {
              this.setState({ showProductMask: null });
            }}
          >
            <img
              key={`${index}picture`}
              style={{ width: "100%", position: "relative" }}
              src={
              TURN_MODEL_OVER.indexOf(ele.display_id) === -1
                ? ele.images.hover.images.xl.url
                : ele.images.main.images.xl.url
            }
              alt="produc"
            />
            <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              {this.state.showProductMask === ele.images.hover.images.xl.url ? (
                <div className={styles.productMask}>
                  <div className={styles.price}>{`$${ele.tier_prices[0][0]}`}</div>
                  {ele.original_price_range[0] === ele.tier_prices[0][0] ? null : (
                    <div className={styles.oringinalPrice}>
                      {`$${ele.original_price_range[0]}`}
                    </div>
                  )}
                  {this.renderReviewStar(ele)}
                  <div className={styles.productStyle}>
                    {ele.name.toLowerCase().indexOf("lined") === -1
                      ? "Wireless"
                      : "Unlined"}
                  </div>
                </div>
              ) : null}
            </MediaQuery>
            <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <div className={styles.productMask}>
                <div className={styles.price}>{`$${ele.tier_prices[0][0]}`}</div>
                {ele.original_price_range[0] === ele.tier_prices[0][0] ? null : (
                  <div className={styles.oringinalPrice}>
                    {`$${ele.original_price_range[0]}`}
                  </div>
                )}
                <div className={styles.styleBox}>
                  {this.renderReviewStar(ele)}
                  <div className={styles.productStyle}>
                    {ele.name.toLowerCase().indexOf("lined") === -1
                      ? "Wireless"
                      : "Unlined"}
                  </div>
                </div>
              </div>
            </MediaQuery>
          </div>
          <div key={`${index}productName`} className={styles.productName}>
            {ele.name}
          </div>
        </div>
      ) : null;
  }

  renderProductListTemplate(clientMD) {
    return (
      <div className={styles.productListTemplate}>
        <div className={styles.productBlock}>
          {this.state.products.slice(0, 8).map((ele, index) => {
            return this.renderSingleProduct(ele, index, clientMD, styles.productCard);
          })}
        </div>
        <div className={styles.productAndAlbumBlock}>
          <div className={styles.productBlockSmallBlock} style={{ width: "49.4%" }}>
            {this.state.products.slice(8, 12).map((ele, index) => {
              return this.renderSingleProduct(
                ele,
                index,
                clientMD,
                styles.smallBlockProductCard
              );
            })}
          </div>
          <div className={styles.albumContainer} style={{ marginLeft: "1.4%" }}>
            {this.renderAlbum("wireless")}
          </div>
        </div>
        <div className={styles.productBlock}>
          {this.state.products.slice(12, 20).map((ele, index) => {
            return this.renderSingleProduct(ele, index, clientMD, styles.productCard);
          })}
        </div>
        <div className={styles.productAndAlbumBlock}>
          <div className={styles.albumContainer} style={{ marginRight: "1.4%" }}>
            {this.renderAlbum("unlined")}
          </div>
          <div className={styles.productBlockSmallBlock} style={{ width: "49.4%" }}>
            {this.state.products.slice(20, 24).map((ele, index) => {
              return this.renderSingleProduct(
                ele,
                index,
                clientMD,
                styles.smallBlockProductCard
              );
            })}
          </div>
        </div>
        <div className={styles.productBlock}>
          {this.state.products.slice(24, 32).map((ele, index) => {
            return this.renderSingleProduct(ele, index, clientMD, styles.productCard);
          })}
        </div>
      </div>
    );
  }

  renderProductListTemplateMobile(clientMD) {
    return (
      <div className={styles.productListTemplate}>
        <div className={styles.productBlock}>
          {this.state.products.slice(0, 10).map((ele, index) => {
            return this.renderSingleProduct(
              ele,
              index,
              clientMD,
              styles.smallBlockProductCard
            );
          })}
        </div>
        <div className={styles.albumContainerMobile}>{this.renderAlbum("wireless")}</div>
        <div className={styles.productBlock}>
          {this.state.products.slice(10, 20).map((ele, index) => {
            return this.renderSingleProduct(
              ele,
              index,
              clientMD,
              styles.smallBlockProductCard
            );
          })}
        </div>
        <div className={styles.albumContainerMobile}>{this.renderAlbum("unlined")}</div>
        <div className={styles.productBlock}>
          {this.state.products.slice(20, 32).map((ele, index) => {
            return this.renderSingleProduct(
              ele,
              index,
              clientMD,
              styles.smallBlockProductCard
            );
          })}
        </div>
      </div>
    );
  }

  renderNBCAMProductBlock(clientMD) {
    return (
      <div>
        <ScrollableAnchor id="section1">
          <div />
        </ScrollableAnchor>
        <div className={styles.productListTitle}>
          <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <img
              src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart.svg"
              className={styles.pinkHeart}
              alt="pink heart"
            />
            <span style={{ margin: "0px 30px" }}>
              The comfort and support you want...
            </span>
            <img
              src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart_reverse.svg"
              className={styles.pinkHeart}
              alt="reverse pink heart"
            />
          </MediaQuery>
          <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
            <span>The comfort and support you want...</span>
          </MediaQuery>
        </div>
        {this.state.products ? (
          <div className={styles.productListTemplateBox}>
            <MediaQuery minWidth={768} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              {this.renderProductListTemplate(clientMD)}
            </MediaQuery>
            <MediaQuery maxWidth={767} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              {this.renderProductListTemplateMobile(clientMD)}
            </MediaQuery>
          </div>
        ) : null}
      </div>
    );
  }

  renderRewardPointsBlock(clientMD) {
    return (
      <div className={styles.rewardPointsBox}>
        <div className={styles.socialMediaContainer}>
          <div className={styles.rewardPointsTitle}>
            <ScrollableAnchor id="section2">
              <div />
            </ScrollableAnchor>
            <MediaQuery minWidth={992} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <img
                src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart.svg"
                className={styles.pinkHeart}
                alt="pink heart"
              />
              <span style={{ margin: "0px 30px" }}>
                Earn extra reward points when you...
              </span>
              <img
                src="https://storage.googleapis.com/evesetus/email/NBCAM/pinkheart_reverse.svg"
                className={styles.pinkHeart}
                alt="reverse pink heart"
              />
            </MediaQuery>
            <MediaQuery maxWidth={991} values={{ width: clientMD && clientMD.fakeDeviceWidth }}>
              <span>Earn extra reward points when you...</span>
            </MediaQuery>
          </div>
          <div className={styles.rewardPointsBar}>
            <div className={styles.socialMediaBlock}>
              <p style={{ fontSize: 16 }}>
                <i
                  className="icon ion-social-instagram-outline"
                  style={{ marginRight: 15, fontSize: 24 }}
                />
                <strong>Follow us on Instagram</strong>
              </p>
              <p> @evestemptationus</p>
              <p>Share your style using #EvesGoesPink</p>
            </div>
            <div className={styles.socialMediaBlock}>
              <p style={{ fontSize: 16 }}>
                <i
                  className="icon fa fa-weixin"
                  style={{ marginRight: 15, fontSize: 20 }}
                />
                <strong>Follow us on WeChat</strong>
              </p>
              <p>ID: EvebyEves</p>
              <p>Forward any article posted by us in October to your Moments</p>
            </div>
          </div>
          <div className={styles.noticeBar}>
            Send a screenshot of your post and include your email associated with your
            Eve’s account to helpdesk@evestemptation.com to earn 500 - 3000 reward points!
            <img
              src="https://storage.googleapis.com/evesetus/email/NBCAM/InfoOutlined.svg"
              alt="information ouline"
              className={styles.infoOutline}
              onClick={() => {
                this.setState({ showRewordPointRule: true });
              }}
            />
          </div>
        </div>
        <Modal
          show={this.state.showRewordPointRule}
          onHide={() => {
            this.setState({ showRewordPointRule: false });
          }}
          dialogClassName={styles.popupWindow}
        >
          <div className={styles.RPTextBlock}>
            <div>
              <p>
                <strong style={{ color: "black", fontSize: 20 }}>
                  About Reward Points
                </strong>
                <br />
                <br />
                HOW TO EARN POINTS
                <br />
                Points will be added to your reward balance after you take certain
                activities. For example, every time you make a purchase you will earn
                points based on the price of products purchased. Each $ 1.00 spent for
                your order will earn 1 Point.
                <br />
                <br />
                HOW TO SPEND POINTS
                <br />
                In order to redeem your points you will need to log into your account.
                Once logged in, you will be able to see your total reward points under
                your name. Next to this select the “Redeem” option and you will be
                redirected to all the items which qualify for the month’s special. Please
                note, that the item(s) you want to redeem will ship along with your
                purchase order.
              </p>
            </div>
            <div
              className={styles.windowClose}
              onClick={() => {
                this.setState({ showRewordPointRule: false });
              }}
            >
              &#x2715;
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  renderAlbum(type) {
    const album = type === "wireless" ? NBCAM_ALBUM_1 : NBCAM_ALBUM_2;
    const className = type === "wireless" ? styles.albumFrameWireless : styles.albumFrameUnlined;
    const albumPageEditor = type === "wireless" ? "album1" : "album2";
    const totalPicTure = 3;
    return (
      <div className={className}>
        <div className={styles.albumBox}>
          <div className={styles.descriptionBox}>
            <div className={styles.descriptionNum}>{this.state[albumPageEditor] + 1}</div>
            <div className={styles.description}>
              {album[this.state[albumPageEditor]].description}
            </div>
          </div>
          <div className={styles.albumBlock}>
            <div
              className={styles.pageChange}
              onClick={() => {
                this.setState({
                  [albumPageEditor]:
                    this.state[albumPageEditor] - 1 < 0
                      ? this.state[albumPageEditor] - 1 + totalPicTure
                      : this.state[albumPageEditor] - 1
                });
              }}
            >
              <div style={{ height: 27 }}>
                <i className="ion-chevron-left" />
              </div>
            </div>
            <div className={styles.albumPictures}>
              <img
                src={album[this.state[albumPageEditor]].url}
                className={styles.productAlbumPicture}
                alt="product"
              />
            </div>
            <div
              className={styles.pageChange}
              onClick={() => {
                this.setState({
                  [albumPageEditor]: (this.state[albumPageEditor] + 1) % totalPicTure
                });
              }}
            >
              <div style={{ height: 27 }}>
                <i className="ion-chevron-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPhtotoClipboard() {
    return (
      <div className={styles.clipboardContainer}>
        <div className={styles.clipboardTitle}>Share your style</div>
        <div className={styles.clipboardSubtitle}>
          <div>
            <i
              className="icon ion-social-instagram-outline"
              style={{ marginRight: 10, fontSize: 40, color: "#ff6f9b" }}
            />
          </div>
          <div style={{ marginBottom: 6 }}>@evestemptationus</div>
        </div>
        <CMSBlock {...{ cmsid: "Ins_photo_block" }} />
      </div>
    );
  }

  render() {
    const { clientMD } = this.props;
    configureAnchors({ offset: -160 });
    return (
      <div className={styles.NBCAMContainer}>
        <BannerAndDescription />
        {this.renderTopWording(clientMD)}
        <NBCarousel />
        <Grid>{this.renderNBCAMProductBlock(clientMD)}</Grid>
        {this.renderBottomWording(clientMD)}
        {this.renderRewardPointsBlock(clientMD)}
        <Grid>{this.renderPhtotoClipboard()}</Grid>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    clientMD: getClientMD(store)
  };
}

export default connect(mapStateToProps)(NBCAM);
