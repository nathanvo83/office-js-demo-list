import { combineReducers } from "redux";
import { chunkDetailsMOReducer } from "./chunkDetailsMOReducer";
import { chunkListMOReducer } from "./chunkListMOReducer";
import { wordTypeScoreMOReducer } from "./wordTypeScoreMOReducer";

export const rootReducer = combineReducers({
  chunkDetailsMO: chunkDetailsMOReducer,
  chunkListMO: chunkListMOReducer,
  wordTypeScoreMO: wordTypeScoreMOReducer
});
