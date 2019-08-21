import {
  SET_CMS_BLOCK,
  SET_CMS_ADMIN_AUTH,
  SET_CMS_LIST,
  SET_CMS_PAGE,
  SET_CMS_ADMIN_USER,
  SET_SHOW_MOBILE_HEADER_PROMOTION,
  SET_PRODUCT_TYPE,
} from "./CMSActions";

const initialState = {
  authenticated: false,
  auth_user: "",
  fetchingCMSPage: true,
  cms_page: null,
  cms_block: {},
  showMobileHeaderPromotion: false,
};

const CMSReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CMS_BLOCK:
      const newBlocks = { ...state.cms_block };
      newBlocks[`${action.payload.id}`] = action.payload.data;
      return {
        ...state,
        cms_block: newBlocks,
      };
    case SET_CMS_PAGE:
      console.log("SET_CMS_PAGE called");
      return {
        ...state,
        fetchingCMSPage: false,
        cms_page: action.payload,
      };
    case SET_CMS_LIST:
      console.log("will SET_CMS_LIST");
      return action.payload.archived
        ? {
          ...state,
          cms_archived_list: action.payload.data,
        }
        : {
          ...state,
          cms_list: action.payload.data,
        };
    case SET_CMS_ADMIN_AUTH:
      console.log("will SET_CMS_ADMIN_AUTH", action.payload);
      return {
        ...state,
        authenticated: action.payload,
      };
    case SET_CMS_ADMIN_USER:
      return {
        ...state,
        auth_user: action.payload,
      };
    case SET_SHOW_MOBILE_HEADER_PROMOTION:
      return {
        ...state,
        showMobileHeaderPromotion: action.payload,
      };
    case SET_PRODUCT_TYPE:
      return {
        ...state,
        productType: action.payload,
      };
    default:
      return state;
  }
};

export const getCMSBlock = state => state.cms.cms_block;

export const getCMSAuth = state => state.cms.authenticated;

export const getCMSUser = state => state.cms.auth_user;

export const getCMSArchivedList = state => state.cms.cms_archived_list;

export const getCMSList = state => state.cms.cms_list;

export const getCMSPage = state => state.cms.cms_page;

export const getFetchingCMSPage = state => state.cms.fetchingCMSPage;

export const getShowMobileHeaderPromotion = state => state.cms.showMobileHeaderPromotion;

export const getProductType = state => state.cms.productType;

const sizeGuideData = [
  {
    id: "bras",
    name: "bras",
    title: "Bras Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "bra-size-chart",
        name: null,
        data: {
          headers: [
            {
              id: "us/uk",
              name: "US/UK",
              unitConversion: false,
            },
            {
              id: "europe",
              name: "Europe",
              unitConversion: false,
            },
            {
              id: "bandsize",
              name: "band size",
              unitConversion: true,
            },
            {
              id: "cupsize",
              name: "cup size (Bust minius band)",
              unitConversion: true,
            },
          ],
          rows: [
            {
              "us/uk": {
                text: "32A",
              },
              europe: {
                text: "A70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "32B",
              },
              europe: {
                text: "B70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "32C",
              },
              europe: {
                text: "C70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "32D",
              },
              europe: {
                text: "D70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "32DD",
              },
              europe: {
                text: "E70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "32DDD",
              },
              europe: {
                text: "F70",
              },
              bandsize: {
                number: {
                  min: "71",
                  max: "76",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "34A",
              },
              europe: {
                text: "A75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "34B",
              },
              europe: {
                text: "B75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "34C",
              },
              europe: {
                text: "C75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "34D",
              },
              europe: {
                text: "D75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "34DD",
              },
              europe: {
                text: "E75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "34DDD",
              },
              europe: {
                text: "F75",
              },
              bandsize: {
                number: {
                  min: "79",
                  max: "84",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "36A",
              },
              europe: {
                text: "A80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "36B",
              },
              europe: {
                text: "B80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "36C",
              },
              europe: {
                text: "C80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "36D",
              },
              europe: {
                text: "D80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "36DD",
              },
              europe: {
                text: "E80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "36DDD",
              },
              europe: {
                text: "F80",
              },
              bandsize: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "38A",
              },
              europe: {
                text: "A85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "38B",
              },
              europe: {
                text: "B85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "38C",
              },
              europe: {
                text: "C85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "38D",
              },
              europe: {
                text: "D85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "38DD",
              },
              europe: {
                text: "E85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "38DDD",
              },
              europe: {
                text: "F85",
              },
              bandsize: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "40A",
              },
              europe: {
                text: "A90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "40B",
              },
              europe: {
                text: "B90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "40C",
              },
              europe: {
                text: "C90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "40D",
              },
              europe: {
                text: "D90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "40DD",
              },
              europe: {
                text: "E90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "40DDD",
              },
              europe: {
                text: "F90",
              },
              bandsize: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "42A",
              },
              europe: {
                text: "A95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "42B",
              },
              europe: {
                text: "B95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "42C",
              },
              europe: {
                text: "C95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "42D",
              },
              europe: {
                text: "D95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "42DD",
              },
              europe: {
                text: "E95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "42DDD",
              },
              europe: {
                text: "E95",
              },
              bandsize: {
                number: {
                  min: "102",
                  max: "104",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
            {
              "us/uk": {
                text: "44A",
              },
              europe: {
                text: "A95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "A",
                number: {
                  min: "3",
                  max: "5",
                },
              },
            },
            {
              "us/uk": {
                text: "44B",
              },
              europe: {
                text: "B95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "B",
                number: {
                  min: "5",
                  max: "8",
                },
              },
            },
            {
              "us/uk": {
                text: "44C",
              },
              europe: {
                text: "C95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "C",
                number: {
                  min: "8",
                  max: "10",
                },
              },
            },
            {
              "us/uk": {
                text: "44D",
              },
              europe: {
                text: "D95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "D",
                number: {
                  min: "10",
                  max: "13",
                },
              },
            },
            {
              "us/uk": {
                text: "44DD",
              },
              europe: {
                text: "E95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "DD",
                number: {
                  min: "13",
                  max: "16",
                },
              },
            },
            {
              "us/uk": {
                text: "44DDD",
              },
              europe: {
                text: "F95",
              },
              bandsize: {
                number: {
                  min: "107",
                  max: "109",
                },
              },
              cupsize: {
                text: "DDD",
                number: {
                  min: "16",
                  max: "19",
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: {
      id: "bra-size-guide",
      name: "How to Use Our Size Guide",
      list: [
        {
          id: "step1",
          name: "step 1",
          image: "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/bust_size.svg",
          text:
            "Measure your bust size at the fullest part. Make note of this measurement on a separate sheet of paper.",
        },
        {
          id: "step2",
          name: "step 2",
          image: "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/band_size.svg",
          text:
            "Measure your band size as shown, taking note of this measurement as well.",
        },
        {
          id: "step3",
          name: "step 3",
          image: null,
          text:
            "Calculate your bra size by subtracting your band measurement from your bust size. Locate your band size range on the chart, then find your measurement calculation on the far right column, to get your ideal bra size.",
        },
      ],
    },
    types: {
      id: "bra-types",
      name: "Bra Types",
      list: [
        {
          id: "push-up",
          name: "push-up",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Push-Up.png",
          text: "Creates lift, enhances cleavage",
        },
        {
          id: "demi",
          name: "demi",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Demi.png",
          text: "Mid-range coverage",
        },
        {
          id: "full-coverage",
          name: "full-coverage",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Full-Coverage.png",
          text: "Highest level of coverage",
        },
        {
          id: "unlined",
          name: "unlined",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Unlined.png",
          text: "No padding, creates natural shape",
        },
        {
          id: "bralette",
          name: "bralette",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Bralette.png",
          text: "Light support",
        },
        {
          id: "racerback",
          name: "racerback",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Racerback.png",
          text: "Best for shoulder baring / halter style garments",
        },
        {
          id: "wireless",
          name: "wireless",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Wireless.png",
          text: "No underwire",
        },
        {
          id: "bandeau",
          name: "bandeau",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Bandeau.png",
          text: "Strapless, moderate, coverage, light support",
        },
        {
          id: "sport-bras",
          name: "sport bras",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Sport%20Bras.png",
          text: "Firm support for fitness activities",
        },
        {
          id: "removable-padding",
          name: "removable padding",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Removable%20Padding.png",
          text: "Option to wear with or without extra padding",
        },
      ],
    },
  },
  {
    id: "bralettes",
    name: "Bralettes",
    title: "Bralettes Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "bralette-conversion-chart",
        name: "Bra Size Conversion",
        description:
          "Choose your ideal bralette based on your current bra size. Find your cup, then brand measurement and this will tell you your ideal bralette size. For European sizes, please refer to the CM band measurement.",
        responsive: "PC",
        data: {
          headers: [
            {
              id: "size",
              name: "Bra Size (US/EUR)",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "32/70",
              name: "32/70",
              unitConversion: false,
            },
            {
              id: "34/75",
              name: "34/75",
              unitConversion: false,
            },
            {
              id: "36/80",
              name: "36/80",
              unitConversion: false,
            },
            {
              id: "38/85",
              name: "38/85",
              unitConversion: false,
            },
            {
              id: "40/90",
              name: "40/90",
              unitConversion: false,
            },
            {
              id: "42/95",
              name: "42/95",
              unitConversion: false,
            },
          ],
          rows: [
            {
              size: {
                text: "A",
              },
              "32/70": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "M/L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "B",
              },
              "32/70": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "M/L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "C",
              },
              "32/70": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "D",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DD",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DDD",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
          ],
        },
      },
      {
        id: "bralette-conversion-chart-mobile-1",
        name: "Bra Size Conversion",
        description:
          "Choose your ideal bralette based on your current bra size. Find your cup, then brand measurement and this will tell you your ideal bralette size. For European sizes, please refre to the CM band measurement.",
        responsive: "MOBILE",
        data: {
          headers: [
            {
              id: "size",
              name: "Bra Size (US/EUR)",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "32/70",
              name: "32/70",
              unitConversion: false,
            },
            {
              id: "34/75",
              name: "34/75",
              unitConversion: false,
            },
            {
              id: "36/80",
              name: "36/80",
              unitConversion: false,
            },
          ],
          rows: [
            {
              size: {
                text: "A",
              },
              "32/70": {
                text: "S",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "M/L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "B",
              },
              "32/70": {
                text: "S",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "S/M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "M/L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "C",
              },
              "32/70": {
                text: "S",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "D",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DD",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DDD",
              },
              "32/70": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "34/75": {
                text: "M",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "36/80": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
          ],
        },
      },
      {
        id: "bralette-conversion-chart-mobile-2",
        responsive: "MOBILE",
        data: {
          headers: [
            {
              id: "size",
              name: "Bra Size (US/EUR)",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "38/85",
              name: "38/85",
              unitConversion: false,
            },
            {
              id: "40/90",
              name: "40/90",
              unitConversion: false,
            },
            {
              id: "42/95",
              name: "42/95",
              unitConversion: false,
            },
          ],
          rows: [
            {
              size: {
                text: "A",
              },
              "38/85": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "B",
              },
              "38/85": {
                text: "L",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "C",
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "D",
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DD",
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
            {
              size: {
                text: "DDD",
              },
              "38/85": {
                text: "XL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "40/90": {
                text: "XXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
              "42/95": {
                text: "XXXL",
                style: {
                  fontFamily: "GothamBook",
                  fontWeight: "normal",
                },
              },
            },
          ],
        },
      },
      {
        id: "bralette-size-chart",
        name: "Bralette Measurement Guide",
        description:
          "Obtain your band size by measuring around the ribcage, underneath the bust. For your bust measurement, wrap the tape measure at the apex, the hightest point of the bust. Use the measurement range for the band size and bust size to choose your bralette size.",
        data: {
          headers: [
            {
              id: "size",
              name: "size",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "bandsize",
              name: "band size",
              unitConversion: true,
            },
            {
              id: "bustsize",
              name: "bust size",
              unitConversion: true,
            },
          ],
          rows: [
            {
              size: {
                text: "s",
              },
              bandsize: {
                number: {
                  min: "63",
                  max: "67",
                },
              },
              bustsize: {
                number: {
                  min: "80",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "m",
              },
              bandsize: {
                number: {
                  min: "68",
                  max: "72",
                },
              },
              bustsize: {
                number: {
                  min: "85",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "l",
              },
              bandsize: {
                number: {
                  min: "73",
                  max: "77",
                },
              },
              bustsize: {
                number: {
                  min: "90",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              bandsize: {
                number: {
                  min: "78",
                  max: "82",
                },
              },
              bustsize: {
                number: {
                  min: "95",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xxl",
              },
              bandsize: {
                number: {
                  min: "83",
                  max: "92",
                },
              },
              bustsize: {
                number: {
                  min: "100",
                  max: null,
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: null,
  },
  {
    id: "panties",
    name: "Panties",
    title: "Panties Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "women-panties-size-chart",
        description:
          "Our measurements are based upon European sizes. Please match your measurements to the guidelines to help you when selecting your size.",
        data: {
          headers: [
            {
              id: "size",
              name: "our size",
              unitConversion: false
            },
            {
              id: "us",
              name: "US",
              unitConversion: false,
            },
            {
              id: "waist",
              name: "waist",
              unitConversion: true,
            },
            {
              id: "hip",
              name: "hip",
              unitConversion: true,
            },
          ],
          rows: [
            {
              size: {
                text: "s",
              },
              us: {
                text: "xs",
              },
              waist: {
                number: {
                  min: "61",
                  max: "64",
                },
              },
              hip: {
                number: {
                  min: "81",
                  max: "84",
                },
              },
            },
            {
              size: {
                text: "m",
              },
              us: {
                text: "s",
              },
              waist: {
                number: {
                  min: "66",
                  max: "69",
                },
              },
              hip: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
            },
            {
              size: {
                text: "l",
              },
              us: {
                text: "m/l",
              },
              waist: {
                number: {
                  min: "71",
                  max: "74",
                },
              },
              hip: {
                number: {
                  min: "91",
                  max: "94",
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              us: {
                text: "l/xl",
              },
              waist: {
                number: {
                  min: "76",
                  max: "79",
                },
              },
              hip: {
                number: {
                  min: "97",
                  max: "99",
                },
              },
            },
            {
              size: {
                text: "xxl",
              },
              us: {
                text: "xl/xxl",
              },
              waist: {
                number: {
                  min: "81",
                  max: "84",
                },
              },
              hip: {
                number: {
                  min: "94",
                  max: "104",
                },
              },
            },
            {
              size: {
                text: "xxxl",
              },
              us: {
                text: "xxl/xxxl",
              },
              waist: {
                number: {
                  min: "86",
                  max: "89",
                },
              },
              hip: {
                number: {
                  min: "99",
                  max: "109",
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: {
      id: "panties-types",
      name: "Panties Types",
      list: [
        {
          id: "high-waist",
          name: "high-waist",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/High-Waist.png",
          text: "Highest level of coverage",
        },
        {
          id: "thongs&v-strings",
          name: "thongs&v-strings",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Thongs.png",
          text: "Minimal side coverage, no rear coverage",
        },
        {
          id: "boyshorts",
          name: "boyshorts",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Boyshorts.png",
          text: "Low cut leg, provides full coverage",
        },
        {
          id: "briefs/hiphuggers",
          name: "briefs/hiphuggers",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Briefs.png",
          text: "Low-waisted, provides moderate coverage",
        },
        {
          id: "bikinis",
          name: "bikinis",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Bikinis.png",
          text: "Low-waisted, high-cut leg",
        },
      ],
    },
  },
  {
    id: "shapewear",
    name: "shapewear",
    title: "Shapewear Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "shapewear-size-chart",
        name: null,
        data: {
          headers: [
            {
              id: "size",
              name: "size",
              unitConversion: false,
            },
            {
              id: "height",
              name: "height",
              unitConversion: true,
            },
            {
              id: "chest",
              name: "chest",
              unitConversion: true,
            },
            {
              id: "waist",
              name: "waist",
              unitConversion: true,
            },
          ],
          rows: [
            {
              size: {
                text: "s",
              },
              height: {
                number: {
                  min: "158",
                  max: "163",
                },
              },
              chest: {
                number: {
                  min: "78",
                  max: "82",
                },
              },
              waist: {
                number: {
                  min: "68",
                  max: "72",
                },
              },
            },
            {
              size: {
                text: "m",
              },
              height: {
                number: {
                  min: "163",
                  max: "168",
                },
              },
              chest: {
                number: {
                  min: "82",
                  max: "86",
                },
              },
              waist: {
                number: {
                  min: "72",
                  max: "76",
                },
              },
            },
            {
              size: {
                text: "l",
              },
              height: {
                number: {
                  min: "168",
                  max: "173",
                },
              },
              chest: {
                number: {
                  min: "86",
                  max: "90",
                },
              },
              waist: {
                number: {
                  min: "76",
                  max: "80",
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              height: {
                number: {
                  min: "173",
                  max: "178",
                },
              },
              chest: {
                number: {
                  min: "90",
                  max: "96",
                },
              },
              waist: {
                number: {
                  min: "80",
                  max: "84",
                },
              },
            },
            {
              size: {
                text: "xxl",
              },
              height: {
                number: {
                  min: "178",
                  max: "183",
                },
              },
              chest: {
                number: {
                  min: "94",
                  max: "100",
                },
              },
              waist: {
                number: {
                  min: "84",
                  max: "88",
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: {
      id: "shape-types",
      name: "Shape Types",
      list: [
        {
          id: "corset",
          name: "corset",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Corset.png",
          text: "Shapes the torso, creating an hourglass shape",
        },
        {
          id: "garters",
          name: "garters",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Garters.png",
          text: "Worn around the hips, used to keep stockings in place",
        },
        {
          id: "teddy/bodysuit",
          name: "teddy / bodysuit",
          image:
            "https://hiddenfigure.evestemptation.com/email/SIZEGUIDE/180x180/Bodysuit.png",
          text: "Single piece garment covering the torso",
        },
      ],
    },
  },
  {
    id: "swimwear",
    name: "swimwear",
    title: "Swimwear Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "swimwear-size-chart",
        name: null,
        data: {
          headers: [
            {
              id: "size",
              name: "size",
              unitConversion: false,
            },
            {
              id: "height",
              name: "height",
              unitConversion: true,
            },
            {
              id: "chest",
              name: "chest",
              unitConversion: true,
            },
          ],
          rows: [
            {
              size: {
                text: "s",
              },
              height: {
                number: {
                  min: "150",
                  max: "155",
                },
              },
              chest: {
                number: {
                  min: "76",
                  max: "84",
                },
              },
            },
            {
              size: {
                text: "m",
              },
              height: {
                number: {
                  min: "155",
                  max: "160",
                },
              },
              chest: {
                number: {
                  min: "84",
                  max: "92",
                },
              },
            },
            {
              size: {
                text: "l",
              },
              height: {
                number: {
                  min: "160",
                  max: "165",
                },
              },
              chest: {
                number: {
                  min: "88",
                  max: "96",
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              height: {
                number: {
                  min: "165",
                  max: "170",
                },
              },
              chest: {
                number: {
                  min: "96",
                  max: "104",
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: null,
  },
  {
    id: "clothing",
    name: "clothing",
    title: "Clothing Size Chart",
    unitConversion: true,
    tables: [
      {
        id: "women-clothing-top-size-chart",
        name: "women's clothing top size chart",
        data: {
          headers: [
            {
              id: "size",
              name: "size",
              unitConversion: false,
              style: {
                width: "25%",
              },
            },
            {
              id: "us",
              name: "US",
              unitConversion: false,
              style: {
                width: "25%",
              },
            },
            {
              id: "height",
              name: "height",
              unitConversion: true,
              style: {
                width: "25%",
              },
            },
            {
              id: "chest",
              name: "chest",
              unitConversion: true,
              style: {
                width: "25%",
              },
            },
          ],
          rows: [
            {
              size: {
                text: "xs",
              },
              us: {
                text: "0",
              },
              height: {
                number: {
                  min: "155",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "76",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "s",
              },
              us: {
                text: "2",
              },
              height: {
                number: {
                  min: "160",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "80",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "m",
              },
              us: {
                text: "4",
              },
              height: {
                number: {
                  min: "165",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "84",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "l",
              },
              us: {
                text: "6",
              },
              height: {
                number: {
                  min: "170",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "88",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              us: {
                text: "8",
              },
              height: {
                number: {
                  min: "175",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "92",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xxl",
              },
              us: {
                text: "10",
              },
              height: {
                number: {
                  min: "180",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "96",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xxxl",
              },
              us: {
                text: "12",
              },
              height: {
                number: {
                  min: "185",
                  max: null,
                },
              },
              chest: {
                number: {
                  min: "100",
                  max: null,
                },
              },
            },
          ],
          unit: "cm",
        },
      },
      {
        id: "women-clothing-bottom-size-chart",
        name: "women's clothing bottom size chart",
        data: {
          headers: [
            {
              id: "size",
              name: "size",
              unitConversion: false,
              style: {
                width: "25%",
              },
            },
            {
              id: "us",
              name: "US",
              unitConversion: false,
              style: {
                width: "25%",
              },
            },
            {
              id: "height",
              name: "height",
              unitConversion: true,
              style: {
                width: "25%",
              },
            },
            {
              id: "waist",
              name: "waist",
              unitConversion: true,
              style: {
                width: "25%",
              },
            },
          ],
          rows: [
            {
              size: {
                text: "s",
              },
              us: {
                text: "2",
              },
              height: {
                number: {
                  min: "160",
                  max: null,
                },
              },
              waist: {
                number: {
                  min: "68",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "m",
              },
              us: {
                text: "4",
              },
              height: {
                number: {
                  min: "165",
                  max: null,
                },
              },
              waist: {
                number: {
                  min: "72",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "l",
              },
              us: {
                text: "6",
              },
              height: {
                number: {
                  min: "170",
                  max: null,
                },
              },
              waist: {
                number: {
                  min: "76",
                  max: null,
                },
              },
            },
            {
              size: {
                text: "xl",
              },
              us: {
                text: "8",
              },
              height: {
                number: {
                  min: "175",
                  max: null,
                },
              },
              waist: {
                number: {
                  min: "80",
                  max: null,
                },
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: null,
  },
  {
    id: "shoes",
    name: "shoes",
    title: "Shoes Size Chart",
    unitConversion: false,
    tables: [
      {
        id: "women-shoes-size-chart",
        name: "women's shoes size chart",
        data: {
          headers: [
            {
              id: "us",
              name: "US",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "europe",
              name: "Europe",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "cm",
              name: "CM",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
          ],
          rows: [
            {
              us: {
                text: "5",
              },
              europe: {
                text: "35",
              },
              cm: {
                text: "22.5",
              },
            },
            {
              us: {
                text: "5.5",
              },
              europe: {
                text: "36",
              },
              cm: {
                text: "23",
              },
            },
            {
              us: {
                text: "6",
              },
              europe: {
                text: "37",
              },
              cm: {
                text: "23.5",
              },
            },
            {
              us: {
                text: "6.5",
              },
              europe: {
                text: "38",
              },
              cm: {
                text: "24",
              },
            },
            {
              us: {
                text: "7",
              },
              europe: {
                text: "39",
              },
              cm: {
                text: "24.5",
              },
            },
            {
              us: {
                text: "7.5",
              },
              europe: {
                text: "39",
              },
              cm: {
                text: "25",
              },
            },
            {
              us: {
                text: "8",
              },
              europe: {
                text: "40",
              },
              cm: {
                text: "25.5",
              },
            },
            {
              us: {
                text: "8.5",
              },
              europe: {
                text: "40",
              },
              cm: {
                text: "26",
              },
            },
          ],
          unit: "cm",
        },
      },
      {
        id: "men-shoes-size-chart",
        name: "men's shoes size chart",
        data: {
          headers: [
            {
              id: "us",
              name: "US",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "europe",
              name: "Europe",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
            {
              id: "cm",
              name: "CM",
              unitConversion: false,
              style: {
                width: "30%",
              },
            },
          ],
          rows: [
            {
              us: {
                text: "7",
              },
              europe: {
                text: "39",
              },
              cm: {
                text: "24.5",
              },
            },
            {
              us: {
                text: "7.5",
              },
              europe: {
                text: "40",
              },
              cm: {
                text: "25",
              },
            },
            {
              us: {
                text: "8",
              },
              europe: {
                text: "41",
              },
              cm: {
                text: "25.5",
              },
            },
            {
              us: {
                text: "8.5",
              },
              europe: {
                text: "42",
              },
              cm: {
                text: "26",
              },
            },
            {
              us: {
                text: "9",
              },
              europe: {
                text: "43",
              },
              cm: {
                text: "26.5",
              },
            },
            {
              us: {
                text: "9.5",
              },
              europe: {
                text: "44",
              },
              cm: {
                text: "27",
              },
            },
            {
              us: {
                text: "10",
              },
              europe: {
                text: "45",
              },
              cm: {
                text: "27.5",
              },
            },
            {
              us: {
                text: "10.5",
              },
              europe: {
                text: "46",
              },
              cm: {
                text: "28",
              },
            },
          ],
          unit: "cm",
        },
      },
    ],
    guide: null,
    types: null,
  },
];

export const getSizeGuideData = () => sizeGuideData;

export default CMSReducer;
