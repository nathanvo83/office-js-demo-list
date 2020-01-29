import { combineReducers } from "redux";
import { chunkDetailsMOReducer } from "./chunkDetailsMOReducer";
import { chunkListMOReducer } from "./chunkListMOReducer";

export const rootReducer = combineReducers({
  chunkDetailsMO: chunkDetailsMOReducer,
  chunkListMO: chunkListMOReducer
});
