import React, { Component } from "react";
import MediaQuery from "react-responsive";
import Scroll, { scroller, Element } from "react-scroll";
import history from "../../../../history";

import ClearanceTypePC from "./ClearanceTypePC";
import ClearanceTypeMobile from "./ClearanceTypeMobile";

export const ClearanceInfo = {
  id: "clearance",
  description: "super special CMS component used only for clearance landing page",
  props: {
    ClearanceType: {
      1: {
        typeName: "文胸",
        sizeSelectionTitle: "您日常文胸的尺码是？",
        sizeComponent: [
          {
            componentName: "下胸围",
            componentContent: [32, 34, 36, 38, 40]
          },
          {
            componentName: "罩杯",
            componentContent: ["A", "B", "C", "D", "DD", "DDD"]
          }
        ],
        bottom_button_text: "查看文胸清仓货品",
        sizeMap: {
          "32A": ["S", "M"],
          "32B": ["S", "M"],
          "32C": ["S", "M"],
          "32D": ["M"],
          "32DD": ["M"],
          "32DDD": ["M"],
          "34A": ["S", "M"],
          "34B": ["S", "M"],
          "34C": ["M"],
          "34D": ["M"],
          "34DD": ["M"],
          "34DDD": ["M"],
          "36A": ["M", "L"],
          "36B": ["M", "L"],
          "36C": ["L"],
          "36D": ["L"],
          "36DD": ["L"],
          "36DDD": ["L"],
          "38A": ["L"],
          "38B": ["L"],
          "38C": ["XL"],
          "38D": ["XL"],
          "38DD": ["XL"],
          "38DDD": ["XL"],
          "40A": ["XL"],
          "40B": ["XL"],
          "40C": ["XXL"],
          "40D": ["XXL"],
          "40DD": ["XXL"],
          "40DDD": ["XXL"],
          "42A": ["XXL"],
          "42B": ["XXL"],
          "42C": ["XXXL"],
          "42D": ["XXXL"],
          "42DD": ["XXXL"],
          "42DDD": ["XXXL"]
        }
      },
      2: {
        typeName: "内裤",
        sizeSelectionTitle: "您日常内裤的尺码是?",
        sizeComponent: [
          {
            componentName: "",
            componentContent: ["S", "M", "L", "XL", "XXL", "XXXL"]
          }
        ],
        bottom_button_text: "查看内裤清仓货品",
        sizeMap: {}
      },
      3: {
        typeName: "睡衣，居家服",
        sizeSelectionTitle: "您日常睡衣的尺码是?",
        sizeComponent: [
          {
            componentName: "",
            componentContent: ["S", "M", "L", "XL", "XXL", "XXXL"]
          }
        ],
        bottom_button_text: "查看睡衣、居家服清仓货品",
        sizeMap: {}
      }
    }
  },
  responsive: {
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true
  }
};

class Clearance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      querySelection: {
        type: "",
        normalSize: "",
        cupSize: "",
        lowerBreast: ""
      },
      product_type: "0" // 0~3
    };
    this.selectProductType = this.selectProductType.bind(this);
    this.selectProductSize = this.selectProductSize.bind(this);
    this.goToCategory = this.goToCategory.bind(this);
  }

  selectProductType(ClearanceType, key) {
    // here is to select type of clearance product type
    this.setState({ product_type: key });
    const status = JSON.parse(JSON.stringify(this.state.querySelection));
    if (ClearanceType[key].typeName === "文胸" || ClearanceType[key].typeName === "Bra") {
      status.type = "bras-clearance";
    } else if (
      ClearanceType[key].typeName === "内裤"
      || ClearanceType[key].typeName === "Panties"
    ) {
      status.type = "panties-clearance";
    } else {
      status.type = "others-clearance";
    }
    this.setState({ querySelection: status }, () => {
      if (this.props.fakeDeviceWidth <= 767) {
        scroller.scrollTo("sizeList", {
          duration: 200,
          delay: 50,
          smooth: true,
          offset: -60
        });
      } else {
        Scroll.animateScroll.scrollTo(200, {
          duration: 200,
          delay: 50
        });
      }
    });
  }

  selectProductSize(size, size_type) {
    const cur = JSON.parse(JSON.stringify(this.state.querySelection));
    cur[size_type] = size;
    this.setState({ querySelection: cur });
  }

  // getParams(){
  //   return {
  //     storeName:this.props.storeName,
  //     path:this.props.location.pathname,
  //     query:this.props.location.query,
  //     category:this.props.match.params.splat,
  //   }
  // }

  goToCategory() {
    const { querySelection, product_type } = this.state;
    const { ClearanceType } = this.props;
    let size = product_type == "1"
      ? querySelection.lowerBreast + querySelection.cupSize
      : querySelection.normalSize;
    let size_extra = "";
    if (ClearanceType[product_type].sizeMap) {
      const map = ClearanceType[product_type].sizeMap;
      for (let i = 0; i < map[size].length; i++) {
        size_extra += `,${map[size][i]}`;
      }
      size += size_extra;
    }
    const search = `/et/category/sale/${querySelection.type}?size=${size}`;
    console.log("this is search", search);
    history.push(search);
  }

  render() {
    const { ClearanceType, fakeDeviceWidth, language } = this.props;

    if (!ClearanceType) {
      return null;
    }

    const responsive_list = [
      <MediaQuery maxWidth={767} values={{ width: fakeDeviceWidth }} key="xs">
        <Element name="sizeList" />
        <ClearanceTypeMobile
          ClearanceType={ClearanceType}
          language={language}
          goToCategory={this.goToCategory}
          selectProductType={this.selectProductType}
          selectProductSize={this.selectProductSize}
          fakeDeviceWidth={fakeDeviceWidth}
          {...this.state}
        />
      </MediaQuery>,
      <MediaQuery minWidth={768} values={{ width: fakeDeviceWidth }} key="sm">
        <ClearanceTypePC
          ClearanceType={ClearanceType}
          language={language}
          goToCategory={this.goToCategory}
          selectProductType={this.selectProductType}
          selectProductSize={this.selectProductSize}
          fakeDeviceWidth={fakeDeviceWidth}
          {...this.state}
        />
      </MediaQuery>
    ];

    return (
      <div>
        {" "}
        {responsive_list}
        {" "}
      </div>
    );
  }
}

export default Clearance;
