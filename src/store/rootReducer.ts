import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import filterReducer from "./slice/filterSlice";
const filterConfig = {
  key: "filter",
  storage: storage,
};

const rootReducer = combineReducers({
  filter: persistReducer(filterConfig, filterReducer) || (() => null),
});

export default rootReducer;
