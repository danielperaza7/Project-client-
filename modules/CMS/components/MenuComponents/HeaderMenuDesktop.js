import { Link } from "react-router-dom";
import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import _ from "lodash";
import { connect } from "react-redux";
import styles from "./HeaderMenuDesktop.css";
import NormalMenuPanel from "./NormalMenuPanel";
import NewArrivalsPanel from "./NewArrivalsPanel";
import SpecialOffer from "./SpecialOffer";
import TopBar from "./TopBar";
import Blog from "./Blog";
import SearchArea from "./SearchArea";
import { getSearchProductNum } from "../../../Category/CategoryReducer";
import { getHeader, getStoreName, getCollapseHeaderMenu } from "../../../App/AppReducer";
import { collapseHeaderMenu } from "../../../App/AppActions";
import { setProductType } from "../../CMSActions";

export const HeaderMenuDesktopInfo = {
  id: "HeaderMenuDesktopInfo",
  description: "super special CMS component used only for desktop menus",
  props: {
    Search: {
      TopSearch: ["Push-Up", "Sales", "Panties", "Clearances", "New products"],
      left_content_title: "You May Be Interested in",
      product_info: [
        {
          image_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          product_name: "Florentine Sunset Eyeshadow Palette"
        },
        {
          image_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          product_name: "Florentine Sunset Eyeshadow Palette"
        },
        {
          image_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          product_name: "Florentine Sunset Eyeshadow Palette"
        }
      ]
    },
    NEWARRIVALS_eve: {
      button_text: "SEE ALL NEW",
      right_text: "Sales information for new! Sales information for new!"
    },
    NEWARRIVALS_et: {
      button_text: "SEE ALL NEW",
      right_text: "Sales information for new! Sales information for new!"
    },
    Normal: {
      BRAS: {
        hot_rows: ["Push-Up", "Unlined"], // selected item content
        new_rows: ["Unlined"], // selected item content
        media: "video", // "video" or "image"
        col_break: 8,
        highlight_col: -1,
        cols_theme: "center", // "center","right",
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      PANTIES: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      "SLEEP & LOUNGE": {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      ACTIVEWEAR: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      SWIMWEAR: {
        highlight_col: -1,
        media: "image", // "video" or "image"
        cols_theme: "right", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      CLOTHING_eve: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      MAKEUP: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      "SKIN CARE": {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      CLOTHING_et: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      LIFESTYLE: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        TopBar: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            product_name: "Florentine Sunset Eyeshadow Palette",
            rate: 4,
            review_num: 12,
            price: 39
          }
        ]
      },
      SALE_eve: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        specialOffer: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 1"
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 2"
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 3"
          }
        ],
        hot_rows: [(0, 0)], // index of the row // index of the row
        new_rows: [(2, 3)] // index of the row // index of the row
      },
      SALE_et: {
        highlight_col: -1,
        cols_two_theme: "none", // "center","right"
        specialOffer: [
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 1"
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 2"
          },
          {
            image_url: {
              xl:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
              lg:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
              md:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              sm:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
              xs:
                "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
            },
            link: {
              path: "product/h123456",
              click: true,
              url: null
            },
            description: "Eve by Eve's Skincare",
            title: "Eve by Eve's Skincare",
            text_over_image: "special offer 3"
          }
        ],
        hot_rows: [], // index of the row // index of the row
        new_rows: [] // index of the row // index of the row
      }
    },
    BLOG: {
      left_text: "Any related information can be put here",
      right_btn_text: "Visit The Blog",
      Blog_contents: {
        1: {
          image_bg_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          text_over_image: "Beauty",
          content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
          content_time: "AUGUST 30, 2017",
          content_details:
            "Fall is just around the corner and that means one thing:  and rich jewel tones.and that means one thing:  and rich jewel tones.",
          content_btn_text: "More Beauty Blog"
        },
        2: {
          image_bg_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          text_over_image: "Beauty",
          content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
          content_time: "AUGUST 30, 2017",
          content_details:
            "Fall is just around the corner and that means one thing: time to transition from bright, bold colors, to warm, crisp neutrals and rich jewel tones.",
          content_btn_text: "More Beauty Blog"
        },
        3: {
          image_bg_url: {
            xl:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1_2.1493661284.jpg", // w 2560px , for 1440+ screen width
            lg:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-t_2.1493661286.jpg", // w 1440px , for 768+ screen width
            md:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            sm:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg", // w 750px  , for 0~767 screen width
            xs:
              "https://keycdn.evestemptation.com/media/wysiwyg/US/HOMEPAGE/MAY17/1-1-m_2.1493661285.jpg" // w 750px  , for 0~767 screen width
          },
          link: {
            path: "product/h123456",
            click: true,
            url: null
          },
          description: "Eve by Eve's Skincare",
          title: "Eve by Eve's Skincare",
          text_over_image: "Beauty",
          content_title: "5 FALL NAIL TRENDS WE’RE EXCITED TO TRY",
          content_time: "AUGUST 30, 2017",
          content_details:
            "Fall is just around the corner and that means one thing: time to transition from bright, bold colors, to warm, crisp neutrals and rich jewel tones.",
          content_btn_text: "More Beauty Blog"
        }
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

class HeaderMenuDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedIndex: null,
      prevIndex: null,
      overMenuBar: false,
      overMenuPanel: false,
      overSearch: false,
      openedByTouch: false,
      cur_props: null,
      search_panel_clicked: false,
      search_panel_focus: false
    };
    this.resetOverStatus = this.resetOverStatus.bind(this);
    this.handleTouchMenuBar = this.handleTouchMenuBar.bind(this);
    this.handleClickKeyLink = this.handleClickKeyLink.bind(this);
    this.selectComponents = this.selectComponents.bind(this);
    this.getMenuIndex = this.getMenuIndex.bind(this);
    this.getMenuProps = this.getMenuProps.bind(this);
    this.handleSearchPanel = this.handleSearchPanel.bind(this);
    this.closeSearchArea = this.closeSearchArea.bind(this);
    // this.handleShowBoxShadow = this.handleShowBoxShadow.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      openedIndex,
      overSearch,
      overMenuPanel,
      overMenuBar,
      search_panel_clicked,
      search_panel_focus
    } = this.state;
    if (
      !prevProps.collapseHeaderMenu
      && this.props.collapseHeaderMenu
      && !search_panel_clicked
      && !search_panel_focus
    ) {
      this.closeSearchArea();
    }
    if (
      !overMenuPanel
      && !search_panel_focus
      && !search_panel_clicked
      && !overSearch
      && !overMenuBar
      && !prevProps.collapseHeaderMenu
    ) {
      this.props.dispatch(collapseHeaderMenu(true));
    }
    if (
      ((overMenuPanel && openedIndex) || search_panel_clicked || search_panel_focus)
      && prevProps.collapseHeaderMenu
    ) {
      this.props.dispatch(collapseHeaderMenu(false));
    }
  }

  getMenuProps(label, component) {
    const { Normal } = this.props;
    component = component && component.replace(/\s+/g, "");
    let res = null;
    if (component === "Normal") {
      res = Normal[label];
    } else if (
      (component && component.indexOf("CLOTHING") !== -1)
      || component.indexOf("SALE") !== -1
    ) res = Normal[component];
    else if (
      (component && component.indexOf("NEWARRIVALS") !== -1)
      || component.indexOf("BLOG") !== -1
    ) {
      return this.props[component];
    } else res = component;
    return res;
  }

  // handleShowBoxShadow(bool) {
  //   this.setState({ showBoxShadow: bool });
  // }

  getMenuIndex(key, label) {
    const menu_list = [
      "BRAS",
      "PANTIES",
      "SLEEP & LOUNGE",
      "ACTIVEWEAR",
      "SWIMWEAR",
      "MAKEUP",
      "SKIN CARE",
      "LIFESTYLE",
      "BLOG",
      "SHOES"
    ];
    const menu_list_common = ["SALE", "NEW ARRIVALS", "CLOTHING"];
    let component = null;
    if (menu_list_common.includes(label)) {
      if ((key && key.indexOf("et/") !== -1) || key.indexOf("et-") !== -1) {
        if (label === "NEW ARRIVALS") component = "NEWARRIVALS_et";
        else component = `${label}_et`;
      } else {
        if (label === "NEW ARRIVALS") component = "NEWARRIVALS_eve";
        component = `${label}_eve`;
      }
    } else if (menu_list.includes(label)) {
      if (label !== "BLOG") component = "Normal";
      else if (this.props.storeName === "et") {
        component = "BLOG_et";
      } else {
        component = "BLOG_ebe";
      }
    }

    return component;
  }

  handleSearchPanel() {
    const cur = this.state.search_panel_clicked;
    this.setState({
      search_panel_focus: false,
      search_panel_clicked: !cur,
      openedIndex: null,
      overMenuBar: false,
      overMenuPanel: false
    });
    if (!cur) this.props.dispatch(collapseHeaderMenu(false));
    if (cur) this.props.dispatch(collapseHeaderMenu(true));
  }

  resetOverStatus() {
    this.setState({
      openedIndex: null,
      overMenuBar: false,
      overMenuPanel: false,
      overSearch: false,
      openedByTouch: false,
      cur_props: null,
      search_panel_focus: false
    });
    this.props.dispatch(collapseHeaderMenu(true));
  }

  closeSearchArea() {
    this.setState({
      search_panel_focus: false,
      search_panel_clicked: false,
      openedIndex: null,
      overMenuBar: false,
      overMenuPanel: false,
      overSearch: false
    });
  }

  selectComponents(component, label, item, prop) {
    if (component && component.indexOf("BLOG") > -1 && label === "BLOG") {
      return <Blog prop={prop} tab={item} />;
    }
    if (
      component
      && (component.indexOf("NEW ARRIVALS") !== -1
        || component.indexOf("NEWARRIVALS") !== -1)
      && label === "NEW ARRIVALS"
    ) {
      return <NewArrivalsPanel prop={prop} tab={item} component={component} />;
    }
    if (
      (item.sub && component === "Normal")
      || (component && component.indexOf("CLOTHING") !== -1)
      || (component && component.indexOf("SALE") !== -1)
    ) {
      return <NormalMenuPanel prop={prop} tab={item} />;
    }

    return null;
  }

  handleClickKeyLink(event, index) {
    if (this.state.openedByTouch) {
      if (!this.state.overMenuBar || this.state.prevIndex !== index) {
        event.preventDefault();
        this.setState({
          overMenuBar: true,
          prevIndex: index,
          openedIndex: index,
          search_panel_focus: false
        });
      }
    }
  }

  handleTouchMenuBar() {
    this.setState({
      openedByTouch: true
    });
  }

  renderMenuBar() {
    const { search_panel_clicked } = this.state;
    const menu = this.props.header
      && this.props.header.menus
      && this.props.header.menus[this.props.storeName];
    const inMenu = (this.state.overMenuPanel || this.state.overMenuBar) && !this.state.overSearch;
    const menuBar = menu.map((tab, index) => {
      let tabItem;
      if (!tab.label) return null;
      const red = tab.label.toUpperCase() === "SALE";
      const itemInner = (
        <h2
          className={
            styles["menu-btn"]
            + (tab.click ? "" : ` ${styles["no-link"]}`)
            + (index === this.state.openedIndex && inMenu
              ? ` ${styles["current-menu-btn"]}`
              : "")
          }
          key={index}
          onMouseEnter={() => {
            this.setState({
              openedIndex: index,
              search_panel_focus: false,
              overMenuBar: true
            });
            this.props.dispatch(setProductType(`${tab.label}_${this.props.storeName}`));
            this.props.dispatch(collapseHeaderMenu(false));
          }}
          onMouseLeave={() => {
            if (!inMenu) this.props.dispatch(collapseHeaderMenu(true));
            this.setState({ overMenuBar: false, prevIndex: this.state.openedIndex });
          }}
          onTouchStart={this.handleTouchMenuBar}
          style={{
            color: red ? "#fd4f57" : "",
            fontFamily: red ? "GothamMedium !important" : ""
          }}
          onClick={this.resetOverStatus}
        >
          <span style={{ opacity: search_panel_clicked ? ".2" : "1" }}>{tab.label}</span>
        </h2>
      );
      if (tab.click) {
        if (tab.key) {
          tabItem = (
            <Link
              to={tab.key[0] === "/" ? tab.key : `/${tab.key}`}
              key={index}
              onClick={e => this.handleClickKeyLink(e, index)}
            >
              {itemInner}
            </Link>
          );
        } else if (tab.url) {
          tabItem = (
            <a href={tab.url} target="_blank" key={index}>
              {itemInner}
            </a>
          );
        } else {
          tabItem = itemInner;
        }
      } else {
        tabItem = itemInner;
      }
      return tabItem;
    });
    return (
      <div className={styles["menu-bar"]}>
        {menuBar}
        <li
          className={`${styles["menu-btn"]} ${styles["search-btn"]}`}
          onClick={this.handleSearchPanel}
          onTouchStart={this.handleTouchMenuBar}
          onMouseEnter={() => {
            this.setState({
              openedIndex: null,
              search_panel_focus: true,
              overSearch: true,
              overMenuPanel: true
            });
            this.props.dispatch(collapseHeaderMenu(false));
          }}
          onMouseLeave={() => {
            this.setState({ overSearch: false, overMenuPanel: false });
            if (!inMenu) this.props.dispatch(collapseHeaderMenu(true));
          }}
        >
          <i className={`${styles["search-icon"]} ion-ios-search-strong`} />
        </li>
      </div>
    );
  }

  renderMenuPanel(prop, component) {
    const menu = this.props.header.menus[this.props.storeName];
    if (!prop || !component) return null;
    return menu.map((tab, index) => {
      let submenus = null;
      const { label } = tab;

      if (tab.sub || tab.label === "BLOG") {
        submenus = this.selectComponents(component, label, tab, prop);
      }

      return (
        <div
          className={
            styles["submenu-wrapper"]
            + (this.state.openedIndex === index ? "" : " hidden")
          }
          key={tab.label}
        >
          <div className={styles["submenu-list"]}>{submenus}</div>
        </div>
      );
    });
  }

  renderPanalClose() {
    if (this.state.openedByTouch) {
      return (
        <div>
          <span className={styles.closePanelBtn} onClick={this.resetOverStatus}>
            <i className="ion-ios-close-empty" />
          </span>
        </div>
      );
    }
    return null;
  }

  render() {
    if (!this.props.storeName) return null;
    const menu = this.props.header.menus[this.props.storeName];

    let prop = null;
    let component = null;
    if (this.state.openedIndex !== null && menu[this.state.openedIndex]) {
      const { key, label } = menu[this.state.openedIndex];
      component = this.getMenuIndex(key, label);
      if (component) prop = this.getMenuProps(label, component);
    }
    if (!menu) {
      return null;
    }
    const topBar = (this.state.overMenuPanel || this.state.overMenuBar)
      && !this.state.overSearch
      && this.state.openedIndex !== null
      && menu[this.state.openedIndex]
      && menu[this.state.openedIndex].sub
      && prop
      && prop.TopBar;

    return (
      <div style={{ marginTop: "15px" }}>
        <div className="text-center">
          <ButtonGroup
            onMouseEnter={() => {
              this.setState({ overMenuBar: true });
            }}
            onMouseLeave={() => {
              this.setState({ overMenuBar: false, search_panel_focus: false });
            }}
          >
            {this.renderMenuBar()}
          </ButtonGroup>
        </div>
        {this.state.search_panel_focus
        || this.state.search_panel_clicked
        || (this.state.overMenuPanel && this.state.openedIndex === null) ? (
          <div
            onMouseEnter={() => {
              this.setState({ overMenuPanel: true });
              this.props.dispatch(collapseHeaderMenu(false));
            }}
            onMouseLeave={() => {
              this.setState({
                overMenuPanel: false,
                search_panel_focus: false
              });
            }}
          >
            <SearchArea
              prop={this.props.Search}
              closeMenu={() => {
                this.setState({ search_panel_clicked: false });
              }}
              autoFocus={this.state.search_panel_clicked}
              closeSearchArea={this.closeSearchArea}
            />
          </div>
          ) : null}
        <div
          onMouseEnter={() => {
            this.setState({ overMenuPanel: true });
            this.props.dispatch(collapseHeaderMenu(false));
          }}
          onMouseLeave={() => {
            this.setState({ overMenuPanel: false, openedIndex: null });
            if (!this.state.overMenuBar) this.props.dispatch(collapseHeaderMenu(true));
          }}
        >
          <div
            style={{
              display:
                (this.state.overMenuPanel || this.state.overMenuBar)
                && !this.state.search_panel_clicked
                && !this.state.overSearch
                && this.state.openedIndex !== null
                && menu[this.state.openedIndex]
                && menu[this.state.openedIndex].sub
                && prop
                && prop.specialOffer
                  ? ""
                  : "none"
            }}
          >
            <SpecialOffer prop={prop} />
          </div>
          <div
            className={
              `${((this.state.overMenuPanel || this.state.overMenuBar)
              && !this.state.search_panel_clicked
              && !this.state.search_panel_focus
              && this.state.openedIndex !== null
              && menu[this.state.openedIndex]
                ? "show "
                : "hidden ")
              + styles["menu-panel"]
              } text-center container `
            }
          >
            {this.renderPanalClose()}
            {this.renderMenuPanel(prop, component)}
          </div>
          <TopBar isOpened={topBar && !this.state.search_panel_clicked} />
          {/* <TopBar openedIndex={this.state.openedIndex} prevIndex={this.state.prevIndex} isOpened={this.state.openedIndex} /> */}
          {/* {topBar && !this.state.search_panel_clicked ? (<TopBar />) : null} */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    searchProductNum: getSearchProductNum(store),
    header: getHeader(store),
    storeName: getStoreName(store),
    collapseHeaderMenu: getCollapseHeaderMenu(store)
  };
}

export default connect(mapStateToProps)(HeaderMenuDesktop);
