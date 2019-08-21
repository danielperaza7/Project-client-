import React, { Component } from "react";

import CMSIDList from "./CMSIDList";

class ListWrapper extends Component {
  render() {
    if (!this.props.cms_list) {
      return <div />;
    }
    const grouped_list = this.props.cms_list.reduce(
      (res, ele) => {
        if (ele.public === true && ele.type === "page") {
          res.public.page.push(ele);
        } else if (ele.public === true && ele.type === "block") {
          res.public.block.push(ele);
        } else if (ele.public === false && ele.type === "page") {
          res.test.page.push(ele);
        } else if (ele.public === false && ele.type === "block") {
          res.test.block.push(ele);
        } else if (ele.type === "page") {
          res.others.page.push(ele);
        } else if (ele.type === "block") {
          res.others.block.push(ele);
        }
        return res;
      },
      {
        public: {
          page: [],
          block: []
        },
        test: {
          page: [],
          block: []
        },
        others: {
          page: [],
          block: []
        }
      }
    );

    const types = [["public", "test", "others"], ["page", "block"]];
    const colors = [["#6bbaa7", "#fa7c92", "#ada082"], ["#6ec4db", "#fff7c0"]];
    const headerStyle = {
      textTransform: "capitalize",
      padding: "5px 15px 5px 15px",
      display: "inline-block",
      fontSize: "20px"
    };

    return (
      <div>
        {types[0].map((lvl0, i0) => {
          return types[1].map((lvl1, i1) => {
            return grouped_list[`${lvl0}`][`${lvl1}`]
              && grouped_list[`${lvl0}`][`${lvl1}`].length !== 0 ? (
                <div
                  style={{
                    width: "100%",
                    marginBottom: `${i1 === 1 ? "30px" : "0"}`,
                    position: "relative"
                  }}
                >
                  {i1 === 0 ? (
                    <span style={{ ...headerStyle, backgroundColor: colors[0][i0] }}>
                      {lvl0}
                    </span>
                  ) : (
                    ""
                  )}
                  <span
                    style={{
                      ...headerStyle,
                      backgroundColor: colors[1][i1],
                      flexAlign: "right",
                      position: "absolute",
                      right: "0",
                      top: `${i1 === 0 ? "38px" : "0"}`
                    }}
                  >
                    {lvl1}
                  </span>
                  <div
                    style={{
                      borderLeft: `10px solid ${colors[0][i0]}`,
                      borderRight: `10px solid ${colors[1][i1]}`,
                      padding: "30px 10px"
                    }}
                  >
                    <CMSIDList cms_list={grouped_list[`${lvl0}`][`${lvl1}`]} />
                  </div>
                </div>
              ) : (
                ""
              );
          });
        })}
      </div>
    );
  }
}

export default ListWrapper;
