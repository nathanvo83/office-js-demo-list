import { types } from "../constants/types";

export const isShowIntroReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_INTRO:
      return true;

    case types.HIDE_INTRO:
      return false;

    default:
      return state;
  }
};
