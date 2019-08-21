/* eslint-disable import/prefer-default-export */
/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

let DevTools;
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  DevTools = require("./modules/App/components/DevTools").default;
}

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [applyMiddleware(thunk)];

  if (
    typeof window !== "undefined"
    && typeof process !== "undefined"
    && process.env
    && process.env.NODE_ENV === "development"
  ) {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : DevTools.instrument()
    );
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
