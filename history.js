import { createBrowserHistory, createMemoryHistory } from "history/index";

export default typeof window === "undefined"
  ? createMemoryHistory()
  : createBrowserHistory();
