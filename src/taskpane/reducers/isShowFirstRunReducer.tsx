import { types } from "../constants/types";

export const isShowFirstRunReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_FIRST_RUN:
      return true;

    case types.HIDE_FIRST_RUN:
      return false;

    default:
      return state;
  }
};
