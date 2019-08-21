import {
  AUTH_USER,
  AUTH_ERROR,
  SET_CARTID,
  REMOVE_AUTH,
  GET_IDENTITY_RESPONSE,
  SET_RESET_PAGE_INFO,
} from "./AuthActions";

// here the waitingForIdentity is a tricky part
// this is because when we refresh the page
// the render part will be directly executed without waiting for getting identity
// thus we add this part to make the rendering process more smooth
//
// And then, we update this value only when dispatch AUTH_USER action
// because in the current bussiness requirement, only when we auth user can

const authInitialState = {
  waitingForIdentity: true,
};

export default (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: "",
        authenticated: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CARTID:
      return {
        ...state,
        cartId: action.payload,
      };
    case REMOVE_AUTH:
      return {
        ...state,
        authenticated: false,
      };
    case GET_IDENTITY_RESPONSE:
      return {
        ...state,
        waitingForIdentity: false,
      };
    case SET_RESET_PAGE_INFO:
      // console.log("catch resetMethod successfully", action.payload);
      return {
        ...state,
        resetMethod: action.payload,
      };
    default:
      return state;
  }
};

export const getAuthStatus = state => state.auth.authenticated; // true means registered user : email login or social login
export const getCartId = state => state.auth.cartId; // ???? what's this for ? FERV2
export const getWaitingForIdentity = state => state.auth.waitingForIdentity;
export const getResetMethod = state => state.auth.resetMethod;
