import { combineReducers, createStore } from "redux";
import apiSlice from "./apiSlice";
const rooteReducer = combineReducers({ api: apiSlice });
const store = createStore(rooteReducer);
export default store;
