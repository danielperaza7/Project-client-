// import axios from "axios";
// const LOB_API_KEY = "test_372aa5f184ab6aa5d74198c001e2d55c3fc";

export const SET_ADDRESS_FORM_LOCAL = "SET_ADDRESS_FORM_LOCAL";

export function setLocalAddress(data) {
  console.log("setLocalAddress called");
  return {
    type: SET_ADDRESS_FORM_LOCAL,
    payload: data,
  };
}
