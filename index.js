/**
 * Client entry point
 */
import React from "react";
import { hydrate } from "react-dom";
import { Cookies } from "react-cookie";
import App from "./App";
import { configureStore } from "./store";

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById("root");

// FERV2
// automatically authenticate
const cookie = new Cookies(); // create a new instance of cookie
const token = cookie.get("x-auth");

console.log('start:', cookie);

hydrate(<App store={store} token={token} cookie={cookie} />, mountApp);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept();
}
