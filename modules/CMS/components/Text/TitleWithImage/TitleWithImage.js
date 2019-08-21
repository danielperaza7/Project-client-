import React, { Component } from "react";
import MediaQuery from "react-responsive";
import LinkWrapper from "../../LinkWrapper/LinkWrapper";
import StyledComponent from "../../Helpers/StyledComponent";
import CollapsedWrapper from "../../CollapsedWrapper/CollapsedWrapper.js";

import styles from "./TitleWithImage.css";

// import styles from './Image1.css';

export const TitleWithImageInfo = {
  id: "TitleWithImage",
  description: "Text with styling and background image",
  props: {
    bg_image: {
      images: {
        xl: "", // w 2560px , for 1440+ screen width
        lg: "", // w 1440px , for 768+ screen width
        md: "", // w 750px  , for 0~767 screen width
        sm: "", // w 750px  , for 0~767 screen width
        xs: ""
      },
      pure_colored_background_style: {
        // if use pure-colored background, add this key, otherwise remove this key
        backgroundColor: "blue", // background color
        width: "50%",
        marginLeft: "25%", // left blank
        marginRight: "25%" // right blank
      },
      height: {
        xl: "",
        lg: "",
        md: "",
        sm: "",
        xs: ""
      },
      alt: "",
      title: "",
      responsive: "auto" // "auto" for "100%" image width; "fixed" for "inherit" width
    },
    title: {
      text: {
        xl: "Some Text xl",
        lg: "Some Text lg",
        md: "Some Text md",
        sm: "Some Text sm",
        xs: "Some Text xs"
      },
      style: {
        color: "black", // text color
        left: "50%", // text position: distance to left boundary
        top: "50%", // text position: distance to top boundary
        fontSize: {
          xl: 14,
          lg: 14,
          md: 14,
          sm: 14,
          xs: 14
        }
      },
      html_tag: "h1", // styled component research
      link: {
        path: "/et",
        click: true,
        url: null
      }
    },
    texts: [
      {
        text: {
          xl: "Some Text xl",
          lg: "Some Text lg",
          md: "Some Text md",
          sm: "Some Text sm",
          xs: "Some Text xs"
        },
        style: {
          color: "black", // text color
          left: "50%", // text position: distance to left boundary
          top: "50%", // text position: distance to top boundary
          fontSize: {
            xl: 14,
            lg: 14,
            md: 14,
            sm: 14,
            xs: 14
          }
        },
        html_tag: "h1", // styled component research
        link: {
          path: "/et",
          click: true,
          url: null
        }
      },
      {
        text: {
          xl: "Some Text xl",
          lg: "Some Text lg",
          md: "Some Text md",
          sm: "Some Text sm",
          xs: "Some Text xs"
        },
        style: {
          color: "black", // text color
          left: "50%", // text position: distance to left boundary
          top: "50%", // text position: distance to top boundary
          fontSize: {
            xl: 14,
            lg: 14,
            md: 14,
            sm: 14,
            xs: 14
          }
        },
        html_tag: "h1", // styled component research
        link: {
          path: "/et",
          click: true,
          url: null
        }
      }
    ],
    collapsed: {
      isCollapsed: false,
      maxHeight: "50px",
      borderColor: "black",
      collapsedInfo: "Continue Reading",
      expandedInfo: "Finish Reading",
      collapsedBoxHeight: "24px"
    }
  }
};

class TitleWithImage extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const {
      title,
      bg_image,
      collapsed,
      texts,
      image_style,
      onLoad,
      onClick,
      fakeDeviceWidth
    } = this.props;
    console.log("TitleWithImages");
    console.log(this.props.collapsed);

    if (!(title || texts) || (title && !title.text) || (texts && texts.length === 0)) {
      return null;
    }

    const img_style = {
      ...image_style,
      width: bg_image.responsive === "fixed" ? "inherit" : "100%",
      position: "relative"
    };

    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    const responsive_list = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          {bg_image.pure_colored_background_style ? (
            <div
              style={{
                ...bg_image.pure_colored_background_style,
                position: "relative",
                height: bg_image.height[key]
              }}
            />
          ) : (
            <img
              onLoad={onLoad}
              alt={bg_image.alt}
              title={bg_image.title}
              src={bg_image.images[key]}
              style={{
                ...img_style,
                height: bg_image.height ? bg_image.height[key] || "auto" : "auto"
              }}
              onClick={onClick}
            />
          )}
          {texts ? (
            texts.map((text, index) => {
              return (
                <LinkWrapper {...text.link} key={index}>
                  <div
                    className={styles.h1_style}
                    style={text.style ? { ...text.style } : {}}
                  >
                    <StyledComponent
                      as={text.html_tag}
                      size={text.style.fontSize[key]}
                      color={text.style.color}
                    >
                      {text.text[key]}
                    </StyledComponent>
                  </div>
                </LinkWrapper>
              );
            })
          ) : (
            <LinkWrapper {...title.link}>
              <div
                className={styles.h1_style}
                style={title.style ? { ...title.style } : {}}
              >
                <StyledComponent
                  as={title.html_tag}
                  size={title.style.fontSize[key]}
                  color={title.style.color}
                >
                  {title.text[key]}
                </StyledComponent>
              </div>
            </LinkWrapper>
          )}
        </MediaQuery>
      );
    });

    if (collapsed && collapsed.isCollapsed) {
      const Collapse_props = {
        maxHeight: collapsed.maxHeight,
        borderColor: collapsed.borderColor,
        collapsedInfo: collapsed.collapsedInfo,
        expandedInfo: collapsed.expandedInfo,
        collapsedBoxHeight: collapsed.collapsedBoxHeight,
        expandedCollapse: collapsed.expandedCollapse
      };
      return (
        <CollapsedWrapper {...Collapse_props}>
          <div>{responsive_list}</div>
        </CollapsedWrapper>
      );
    }

    return <div>{responsive_list}</div>;
  }
}

export default TitleWithImage;
