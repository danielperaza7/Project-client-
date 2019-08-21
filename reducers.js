/**
 * Root Reducer
 */
import { combineReducers } from "redux";

// Import Reducers
import app from "./modules/App/AppReducer";
import posts from "./modules/Post/PostReducer";
import intl from "./modules/Intl/IntlReducer";
import category from "./modules/Category/CategoryReducer";
import authReducer from "./modules/Authentication/AuthReducer";
import reduxFormReducer from "./modules/App/FormReducer";
import customer from "./modules/Customer/CustomerReducer";
import checkout from "./modules/CheckoutV2/CheckoutReducer";
import cms from "./modules/CMS/CMSReducer";

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  category,
  customer,
  form: reduxFormReducer,
  auth: authReducer,
  checkout,
  cms,
});
