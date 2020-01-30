import { types } from "../constants/types";
import { WordTypeScoreMO } from "../models/WordTypeScoreMO";

export const wordTypeScoreMOReducer = (state = new WordTypeScoreMO(), action) => {
  switch (action.type) {
    case types.SET_SCORE:
      return {
        ...state,
        ...action.wordTypeScoreMO
      };

    default:
      return state;
  }
};
