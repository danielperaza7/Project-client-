import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group"; // ES6
import MediaQuery from "react-responsive";
import { Panel, Fade } from "react-bootstrap";
import marked from "marked";
import history from "../../../../history";
import styles from "./MarkdownVerticalCarousel.css";
import CustomModal from "../../../../components/Modal/CustomModal";

// import getters
import { getShowMobileHeaderPromotion } from "../../CMSReducer";
import { PushDL_EventData } from "../../../Analytics/components/GA";

export const MarkdownVerticalCarouselInfo = {
  id: "markdown-vertical-carousel",
  description: "Markdown Vertical Carousel",
  image: "",
  props: {
    markdowns: [
      {
        basic: {
          xl: "Free shipping on 3 or more items",
          lg: "Free shipping on 3 or more items",
          md: "Free shipping on 3 or more items",
          sm: "Free shipping on 3 or more items",
          xs: "Free shipping on 3 or more items"
        },
        detail: {
          xl:
            "Free shipping on orders of 3 or more items within the 48 contiguous states",
          lg:
            "Free shipping on orders of 3 or more items within the 48 contiguous states",
          md:
            "Free shipping on orders of 3 or more items within the 48 contiguous states",
          sm:
            "Free shipping on orders of 3 or more items within the 48 contiguous states",
          xs: "Free shipping on orders of 3 or more items within the 48 contiguous states"
        },
        link: {
          path: "",
          click: false,
          url: null
        }
      },
      {
        basic: {
          xl: "Free travel size body lotion with any purchase over $50",
          lg: "Free travel size body lotion with any purchase over $50",
          md: "Free travel size body lotion with any purchase over $50",
          sm: "Free travel size body lotion with any purchase over $50",
          xs: "Free travel size body lotion with any purchase over $50"
        },
        detail: null,
        link: {
          path: "/page/shipping",
          click: true,
          url: null
        }
      }
    ]
  }
};

class MarkdownVerticalCarousel extends Component {
  intervalID = null;

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      currentIndex: 0,
      totalIndices: 1,
      showModal: false,
      modalIndex: 0,
      intervalHandler: null
    };
    this.showNext = this.showNext.bind(this);
    this.handleClickContent = this.handleClickContent.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
    this.intervalID = setInterval(this.showNext, 5500);

    if (this.props.markdowns.length !== this.state.totalIndices) {
      this.setState({
        totalIndices: this.props.markdowns.length
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markdowns.length !== this.state.totalIndices) {
      this.setState({
        totalIndices: nextProps.markdowns.length
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  showNext() {
    const { currentIndex, totalIndices, expanded } = this.state;
    if (!expanded) {
      this.setState({
        currentIndex: (currentIndex + 1) % totalIndices
      });
    }
  }

  handleClickContent(event, index) {
    const Eventdata = {
      eventCategory: "Main events",
      eventAction: "Click",
      eventLabel: "Sticky Sitewide Promotion clicked"
    };
    PushDL_EventData("normalComponentClicked", Eventdata);
    event.stopPropagation();
    const { markdowns } = this.props;
    if (markdowns && markdowns[index]) {
      const { link, detail } = markdowns[index];
      if (link && link.click && (link.path || link.url)) {
        if (link.path) {
          this.setState({ expanded: false });
          history.push(link.path[0] === "/" ? link.path : `/${link.path}`);
        } else if (link.url) {
          this.setState({ expanded: false });
          history.push(link.url);
        }
      } else if (detail) {
        this.setState({ showModal: true, modalIndex: index });
      }
    }
  }

  renderMarkdown(markdown, index) {
    const { fakeDeviceWidth } = this.props;
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    const hoverStyle = (markdown.link && markdown.link.clicable) || markdown.detail
      ? styles.clickable
      : "";
    const oneMarkdown = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          <div
            className={`${styles.markdownWrapper} ${hoverStyle}`}
            dangerouslySetInnerHTML={{ __html: marked(markdown.basic[key]) }}
            onClick={event => this.handleClickContent(event, index)}
          />
        </MediaQuery>
      );
    });
    return <div key={markdown.basic.xs}>{oneMarkdown}</div>;
  }

  renderMarkdownInModal() {
    const { markdowns } = this.props;
    const { modalIndex } = this.state;
    if (
      !markdowns
      || !markdowns[modalIndex]
      || !markdowns[modalIndex]
      || markdowns[modalIndex].detail === ""
    ) {
      return null;
    }
    const { fakeDeviceWidth } = this.props;
    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };
    const oneMarkdown = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      if (!markdowns[modalIndex].detail || !markdowns[modalIndex].detail[key]) {
        return null;
      }
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          <div
            className={styles.markdownWrapper}
            dangerouslySetInnerHTML={{
              __html: marked(markdowns[modalIndex].detail[key])
            }}
          />
        </MediaQuery>
      );
    });
    return <div>{oneMarkdown}</div>;
  }

  render() {
    const { markdowns, fakeDeviceWidth, showMobileHeaderPromotion } = this.props;
    const { currentIndex, expanded, showModal } = this.state;
    const modalProps = {
      size: "medium",
      showModal,
      onHide: () => {
        this.setState({ showModal: false });
      }
    };
    const items = markdowns.map((markdown, index) => {
      return (
        <div key={index} className={styles.rowWrapper}>
          <div className={styles.content}>{this.renderMarkdown(markdown, index)}</div>
        </div>
      );
    });
    const header = (
      <div className={styles.header}>
        <span className={styles.leftblock}>
          <Fade in={!expanded}>
            <span className={styles["total-indicator"]}>
              {markdowns.length > 1 ? `${currentIndex + 1}/${markdowns.length}` : ""}
            </span>
          </Fade>
        </span>
        <div className={styles.content}>
          <CSSTransitionGroup
            transitionName={{
              enter: styles["fadeMD-enter"],
              enterActive: styles["fadeMD-enter-active"],
              leaveActive: styles["fadeMD-leave-active"],
              leave: styles["fadeMD-leave"]
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.renderMarkdown(markdowns[currentIndex], currentIndex)}
          </CSSTransitionGroup>
        </div>
        <span className={styles.rightblock}>
          {markdowns.length > 1 ? (
            <span
              className={this.state.expanded ? "ion-chevron-up" : "ion-chevron-down"}
            />
          ) : null}
        </span>
      </div>
    );
    return (
      <div>
        <MediaQuery minWidth={992} values={{ width: fakeDeviceWidth }}>
          <CSSTransitionGroup
            transitionName={{
              enter: styles["fadeMD-enter"],
              enterActive: styles["fadeMD-enter-active"],
              leaveActive: styles["fadeMD-leave-active"],
              leave: styles["fadeMD-leave"]
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.renderMarkdown(markdowns[currentIndex], currentIndex)}
          </CSSTransitionGroup>
        </MediaQuery>
        {showMobileHeaderPromotion ? (
          <MediaQuery maxWidth={991} values={{ width: fakeDeviceWidth }}>
            <Panel
              bsClass={styles.panel}
              expanded={expanded}
              onToggle={() => {
                this.setState({ expanded: !expanded });
              }}
            >
              <Panel.Title toggle>{header}</Panel.Title>
              <Panel.Collapse>
                <Panel.Body>
                  {items.map((item, index) => {
                    if (index === currentIndex) {
                      return null;
                    }
                    return item;
                  })}
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </MediaQuery>
        ) : null}
        <CustomModal {...modalProps}>
          <div className={styles.modalContent}>{this.renderMarkdownInModal()}</div>
        </CustomModal>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    showMobileHeaderPromotion: getShowMobileHeaderPromotion(store)
  };
}

export default connect(mapStateToProps)(MarkdownVerticalCarousel);
