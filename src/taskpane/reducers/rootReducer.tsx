import { combineReducers } from "redux";
import { chunkDetailsMOReducer } from "./chunkDetailsMOReducer";
import { chunkListMOReducer } from "./chunkListMOReducer";
import { wordTypeScoreMOReducer } from "./wordTypeScoreMOReducer";
import { isShowInfoPaneReducer } from "./isShowInfoPaneReducer";
import { isShowFirstRunReducer } from "./isShowFirstRunReducer";
import { isShowIntroReducer } from "./isShowIntroReducer";

export const rootReducer = combineReducers({
  chunkDetailsMO: chunkDetailsMOReducer,
  chunkListMO: chunkListMOReducer,
  wordTypeScoreMO: wordTypeScoreMOReducer,
  isShowInfoPane: isShowInfoPaneReducer,
  isShowFirstRun: isShowFirstRunReducer,
  isShowIntro: isShowIntroReducer
});
