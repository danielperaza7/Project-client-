// Import Actions
import _ from "lodash";
import MobileDetect from "mobile-detect";
import {
  CHANGE_STORE_NAME,
  CHANGE_HEADER,
  SET_USER,
  SET_CART_NUM,
  SET_CART_JUST_ADDED,
  CLEAR_CART_JUST_ADDED,
  SET_SHOW_HEADER,
  SET_SHOW_FOOTER,
  ADD_ERROR,
  CLEAR_ERRORS,
  SET_SHOW_HEADER_FOOTER,
  SHOW_MASK,
  REMOVE_MASK,
  PUSH_CUSTOM_HISTORY,
  POP_CUSTOM_HISTORY,
  POP_NEWSLETTER_SUBSCRIPTION,
  SET_COLLAPSE_HEADER,
  SET_CLIENT_MD,
  SET_SERVER_LOCATION,
  SET_NEW_HEADER,
  ADD_RECENT_SEARCH,
  CLEAR_RECENT_SEARCH,
  SET_SEARCH_HISTORY,
  SET_ACCOUNT_INFORMATION_EMAIL,
  SET_ACCOUNT_INFORMATION_PHONE,
  SET_ACCOUNT_INFORMATION_NAME,
  RESET_MEMBERSHIP_UPGRADE_AND_DEGRADE_INFO,
  SET_MOBILE_STORE,
  COLLAPSE_HEADER_MENU,
  HANDLE_NAV_STATUS
} from "./AppActions";

// import configs
import { CURRENT_COUNTRY } from "../../config/config";

// Initial State
const initialState = {
  footer: {
    contactUs: [
      {
        icon: "ion-chatbubble",
        title: "live chat",
        link: "START A CHAT",
        content: "9am - 6pm PST Monday through Friday",
        link_options: {
          path: "",
          click: false,
          url: ""
        }
      },
      {
        icon: "ion-email",
        title: "email",
        link: "HELPDESK@EVESTEMPTATION.COM",
        content: "We will be sure to get back to you within 24-48 hours",
        link_options: {
          path: "",
          click: true,
          url: "mailto:helpdesk@evestemptation.com"
        }
      },
      {
        icon: "ion-android-call",
        title: "call us",
        link: "+1 855-844-0545",
        content: "9am - 6pm PST Monday through Friday",
        link_options: {
          path: "",
          click: false,
          url: ""
        }
      },
      {
        icon: "ion-android-map",
        title: "visit",
        link: "SEE LOCATIONS AND HOURS",
        content: ["Beverly Hills, CA", "Arcadia, CA"],
        link_options: {
          path: "/page/store-location",
          click: true,
          url: ""
        }
      }
    ],
    usefulInfo: [
      {
        title: "My Account",
        link_options: {
          path: "/account/dashboard/",
          click: true,
          url: ""
        }
      },
      {
        title: "Membership",
        link_options: {
          path: "/membershipRule",
          click: true,
          url: ""
        }
      },
      {
        title: "Shipping",
        link_options: {
          path: "/page/shipping",
          click: true,
          url: ""
        }
      },
      {
        title: "Returns",
        link_options: {
          path: "/page/return",
          click: true,
          url: ""
        }
      },
      {
        title: "GiftCard",
        link_options: {
          path: "/page/giftcard",
          click: true,
          url: ""
        }
      },
      {
        title: "FAQs",
        link_options: {
          path: "/page/faqs",
          click: true,
          url: ""
        }
      },
      {
        title: "About us",
        link_options: {
          path: "/page/about-us",
          click: true,
          url: ""
        }
      },
      {
        title: "Career",
        link_options: {
          path: "/page/career",
          click: true,
          url: ""
        }
      },
      {
        title: "Blog",
        link_options: {
          path: "",
          click: true,
          url: "http://blog.evestemptation.com/"
        }
      },
      {
        title: "Affiliates",
        link_options: {
          path: "",
          click: true,
          url: "https://evebyeves.affiliatetechnology.com/index.php"
        }
      }
    ]
  },
  storeName: "et",
  header: null,
  user: null,
  productNum: 0,
  productAdded: [],
  country: CURRENT_COUNTRY,
  show_header: true,
  collapse_header: false,
  show_footer: true,
  errors: [],
  customHistory: [],
  newHeader: false,
  // errors: [{code: '1234', msg:'asdf'}],
  recentSearchedTerms: [],
  recentSearchHistory: [],
  mobileStoreName: "et",
  collapseHeaderMenu: false,
  navOpen: false
};

const AppReducer = (state = initialState, action) => {
  const showMask = state.app && state.app.masks ? state.app.masks : {};
  const newList = state.recentSearchedTerms.map(ele => ele);
  const poppedCustomHistory = state.customHistory.map(item => item);
  const errorsADD = state.errors.map(err => err);
  const removeMask = state.app && state.app.masks ? state.app.masks : {};

  switch (action.type) {
    case ADD_ERROR:
      errorsADD.push(action.payload);
      return {
        ...state,
        errors: errorsADD
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };
    case SHOW_MASK:
      showMask[action.payload] = true;
      return {
        ...state,
        masks: showMask
      };
    case REMOVE_MASK:
      removeMask[action.payload] = false;
      return {
        ...state,
        masks: removeMask
      };
    case CHANGE_STORE_NAME:
      return {
        ...state,
        storeName: action.payload
      };
    case CHANGE_HEADER:
      return {
        ...state,
        header: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_CART_NUM:
      return {
        ...state,
        productNum: action.payload
      };
    case SET_CART_JUST_ADDED: {
      const productAdded = state.productAdded.map(prod => prod);
      productAdded.push(action.payload);
      return {
        ...state,
        productAdded
      };
    }
    case CLEAR_CART_JUST_ADDED:
      return {
        ...state,
        productAdded: []
      };
    case SET_SHOW_HEADER:
      return {
        ...state,
        show_header: action.payload
      };
    case SET_COLLAPSE_HEADER:
      return {
        ...state,
        collapse_header: action.payload
      };
    case SET_SHOW_FOOTER:
      return {
        ...state,
        show_footer: action.payload
      };
    case SET_SHOW_HEADER_FOOTER:
      return {
        ...state,
        show_header: action.payload,
        show_footer: action.payload
      };
    case PUSH_CUSTOM_HISTORY: {
      const pushedCustomHistory = state.customHistory.map(item => item);
      // if pathname and search are same, then pop original one
      if (pushedCustomHistory.length > 0) {
        const lastRecord = pushedCustomHistory[pushedCustomHistory.length - 1];
        if (
          action.payload.pathname === lastRecord.pathname
          && action.payload.search === lastRecord.search
        ) {
          pushedCustomHistory.pop();
        }
      }

      pushedCustomHistory.push(action.payload);
      if (pushedCustomHistory.length > 10) {
        pushedCustomHistory.splice(0, 5);
      }
      return {
        ...state,
        customHistory: pushedCustomHistory
      };
    }
    case POP_CUSTOM_HISTORY: {
      poppedCustomHistory.splice(-1, 1);
      return {
        ...state,
        customHistory: poppedCustomHistory
      };
    }
    case POP_NEWSLETTER_SUBSCRIPTION:
      console.debug("POP_NEWSLETTER_SUBSCRIPTION", action.payload);
      return {
        ...state,
        newsletter: action.payload
      };
    case SET_CLIENT_MD:
      return {
        ...state,
        clientMD: action.payload
      };
    case SET_SERVER_LOCATION:
      return {
        ...state,
        serverLocation: action.payload
      };
    case SET_NEW_HEADER:
      return {
        ...state,
        newHeader: action.payload
      };
    case ADD_RECENT_SEARCH:
      if (newList.includes(action.payload)) {
        const index = newList.indexOf(action.payload);
        newList.splice(index, 1);
      }
      newList.push(action.payload);
      return {
        ...state,
        recentSearchedTerms: newList
      };
    case CLEAR_RECENT_SEARCH:
      return {
        ...state,
        recentSearchedTerms: []
      };
    case SET_SEARCH_HISTORY:
      return {
        ...state,
        recentSearchHistory: action.payload
      };
    case SET_ACCOUNT_INFORMATION_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_ACCOUNT_INFORMATION_PHONE:
      return {
        ...state,
        phone: action.payload
      };
    case SET_ACCOUNT_INFORMATION_NAME:
      return {
        ...state,
        lastname: action.payload.lastname,
        firstname: action.payload.firstname
      };
    case RESET_MEMBERSHIP_UPGRADE_AND_DEGRADE_INFO:
      return {
        ...state,
        user: action.payload
      };
    case SET_MOBILE_STORE:
      return {
        ...state,
        mobileStoreName: action.payload
      };
    case COLLAPSE_HEADER_MENU:
      return {
        ...state,
        collapseHeaderMenu: action.payload
      };
    case HANDLE_NAV_STATUS:
      return {
        ...state,
        navOpen: action.payload
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getCollapseHeaderMenu = state => state.app.collapseHeaderMenu;
// get header data
export const getHeader = state => state.app.header;

// get footer data
export const getFooter = state => state.app.footer;

// get store Name
export const getStoreName = state => state.app.storeName;
export const getMobileStoreName = state => state.app.mobileStoreName;

// get user data
export const getUserData = state => state.app.user;
export const getCustomerID = state => (state.app.user && state.app.user.customer_id ? state.app.user.customer_id : null);
// get user email (if not exist, return '')
export const getUserEmail = state => (state.app.user ? state.app.user.email || "" : "");
// get user saved payment list (if not exist, return '')
export const getUserPayments = state => (state.app.user ? state.app.user.payments || "" : "");
// get product number
export const getProductNum = state => ((state.app && state.app.user) ? (_.get(state, "app.user.cartSchema.items.length", 0) > 0
  ? state.app.user.cartSchema.items
    .map(item => item.item_qty)
    .reduce((accum, value) => accum + value)
  : 0) + _.get(state, "app.user.redeemSchema.items.length", 0) : 0);

export const getProductAdded = state => state.app.productAdded;

// get tier information
export const getTiers = state => (state.app.header ? state.app.header.tiers : []);

export const getRewardPointsToValueRate = state => (state.app.header ? state.app.header.reward_points_to_value_rate : null);

export const getCurrency = state => (state.app.header && state.app.header.currency ? state.app.header.currency : "");

export const getAllMasksState = state => (state.app.MASKS ? state.app.masks : {});

export const getShowHeader = state => state.app.show_header;

export const getCollapseHeader = state => state.app.collapse_header;

export const getShowFooter = state => state.app.show_footer;

export const getErrors = state => state.app.errors;

export const getCustomerGroupId = state => (state.app && state.app.user && state.app.user.group_id ? state.app.user.group_id : 0);

export const getPreviousCustomHistory = state => (state.app.customHistory.length > 1
  ? state.app.customHistory[state.app.customHistory.length - 2]
  : null);

export const getNewsletter = state => state.app.newsletter;

export const getClientMD = (state) => {
  const { ua } = state.app.clientMD;

  const md = new MobileDetect(ua);

  if (ua === undefined && typeof window !== "undefined") {
    return {
      fakeDeviceWidth: window.innerWidth
    };
  }

  const clientMD = {
    phone: md.phone(),
    tablet: md.tablet(),
    userAgent: md.userAgent()
  };

  if (clientMD.phone) {
    clientMD.fakeDeviceWidth = 375;
  } else if (clientMD.tablet) {
    clientMD.fakeDeviceWidth = 768;
  } else {
    clientMD.fakeDeviceWidth = 1440;
  }

  return clientMD;
};

export const getServerLocation = state => state.app.serverLocation;

export const getCartIsEmpty = state => !(_.get(state, "app.user.cartSchema.items.length") > 0);

export const getRewardPoints = state => _.get(state, "app.user.reward_points", null);

export const getRedeemSchema = state => (state.app.user && state.app.user.redeemSchema ? state.app.user.redeemSchema : null);

export const getAccountBalance = state => (state.app.user && state.app.user.account_balance ? state.app.user.account_balance : 0);

export const getAddressBook = state => (state.app.user && state.app.user.addresses ? state.app.user.addresses : null);

export const getCartShippingAddress = state => (_.get(state, "app.user.cartSchema.shipping_address")
  ? state.app.user.cartSchema.shipping_address
  : null);

export const getCartBillingAddress = state => (state.app.user && state.app.user.cartSchema && state.app.user.cartSchema.billing_address
  ? state.app.user.cartSchema.billing_address
  : null);

export const getNewHeader = state => state.app.newHeader;

export const getRecentSearchedTerms = state => state.app.recentSearchedTerms;

export const getHistorySearch = state => state.app.recentSearchHistory;

export const getNavOpen = state => state.app.navOpen;

// Export Reducer
export default AppReducer;
