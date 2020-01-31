import { types } from "../constants/types";

export const isShowInfoPaneReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_INFO_PANE:
      return true;

    case types.HIDE_INFO_PANE:
      return false;

    default:
      return state;
  }
};
