import { combineReducers } from "redux";
import { chunkDetailsMOReducer } from "./chunkDetailsMOReducer";

export const rootReducer = combineReducers({
  chunkDetailsMO: chunkDetailsMOReducer
});
