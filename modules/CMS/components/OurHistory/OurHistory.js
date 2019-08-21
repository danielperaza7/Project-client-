import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Col } from "react-bootstrap";

import styles from "./OurHistory.css";

export const OurHistoryInfo = {
  id: "our_history",
  description: "Our History List",
  props: {
    history: [
      {
        year: "2001",
        title: "",
        description: "First Eve’s Temptation store opens in Shenzhen. "
      },
      {
        year: "2002",
        title: "",
        description: "New location opens in Guangzhou."
      },
      {
        year: "2003",
        title: "",
        description:
          "Expansion continues in Shanghai, bringing the total for 12 locations. "
      },
      {
        year: "2004",
        title: "",
        description: "First manufacturing facility set up in Guangdong. "
      },
      {
        year: "2005",
        title: "",
        description:
          "Company expands to Beijing, Chengdu, and Chong Quan, with more stores and offices opening in these cities. "
      },
      {
        year: "2006",
        title: "",
        description: "Franchise division launches. "
      },
      {
        year: "2007",
        title: "",
        description:
          "Franchise locations increase to 20 stores, while company stores increase to 30, bringing the total to 50 locations. Business expands to Shenyang and Dalian. "
      },
      {
        year: "2009",
        title: "",
        description:
          "Ming Space opened in Beijing Oriental Plaza, bringing the total to 150 points of sale locations in China. Plans implemented for the second manufacturing facility in Jiangxi Province. "
      },
      {
        year: "2013",
        title: "",
        description: "Eve’s Temptation and Eve by Eve’s launch official U.S. website. "
      },
      {
        year: "2014",
        title: "",
        description:
          "Sister brand Eve by Eve’s opens its first flagship store in Beverly Hills, CA. "
      },
      {
        year: "2016",
        title: "",
        description:
          "Sister brand Eve by Eve’s grows its presence opening its first store inside Chengdu IFS in China, later expanding to high-end shopping centers such as Yanlord Land and Chengdu Yintai Centre. "
      },
      {
        year: "2017",
        title: "",
        description:
          "Expansion continues in Chengdu, Kunming, Sanya, Shanghai and Shenzhen. In addition to offering lingerie and beauty products, assortment includes home goods and décor. "
      },
      {
        year: "NOW",
        title: "Looking Ahead",
        description:
          "Eve's Temptation will open its first official U.S. retail store November of 2017, in Arcadia, CA neighboring the world-famous Santa Anita Park. Rooted from Eva's entrepreneurial spirit with a desire to elevate women's everyday lifestyle, Eve's Temptation will bring a curated collection of luxury lingerie, swim, apparel and activewear. Our collections encompass everything a woman needs to feel her most beautiful from the inside, out."
      }
    ]
  }
};

class OurHistory extends Component {
  renderTable(history) {
    return (
      <table className={styles.table}>
        <tbody>
          {history.map((his) => {
            return (
              <tr className={styles.rows} key={his.year}>
                <td className={styles.year}>
                  {" "}
                  {his.year}
                  {" "}
                </td>
                <td className={styles.content}>
                  {" "}
                  {his.title ? (
                    <span className={styles.title}>
                      {" "}
                      {his.title}
                      {" "}
                    </span>
                  ) : (
                    ""
                  )}
                  {" "}
                  {his.description}
                  {" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  renderList(history) {
    const colSetting = {
      lg: 4, md: 4, sm: 4, xs: 4
    };
    const splited_list = history.length > 12
      ? [history.slice(0, 5), history.slice(5, 9), history.slice(9, history.length - 1)]
      : "";

    return (
      <div className={styles.listHistory}>
        <Row>
          {splited_list.map((single, index) => {
            return (
              <Col {...colSetting} key={index}>
                {" "}
                {single.map((ele) => {
                  return (
                    <div className={styles.single}>
                      <span className={styles.year}>{ele.year}</span>
                      {ele.title ? <span className={styles.title}>{ele.title}</span> : ""}
                      <p>{ele.description}</p>
                    </div>
                  );
                })}
                {" "}
              </Col>
            );
          })}
        </Row>
        <div className={styles.now}>
          <span className={styles.title}>{history[history.length - 1].title}</span>
          {" "}
          {history[history.length - 1].description}
        </div>
      </div>
    );
  }

  render() {
    const { onClick, fakeDeviceWidth, inline_styles } = this.props;

    const history = this.props.history || OurHistoryInfo.props.history;

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
          {key === "xs" || key === "sm" || history.length < 12
            ? this.renderTable(history)
            : this.renderList(history)}
        </MediaQuery>
      );
    });

    return (
      <div onClick={onClick} style={inline_styles || {}}>
        {responsive_list}
      </div>
    );
  }
}

export default OurHistory;
