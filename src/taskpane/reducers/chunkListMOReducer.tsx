import { types } from "../constants/types";
import { ChunkListMO } from "../models/ChunkListMO";

export const chunkListMOReducer = (state = new ChunkListMO(), action) => {
  switch (action.type) {
    case types.SET_CHUNK_LIST:
      return {
        ...state,
        ...action.chunkListMO
      };

    default:
      return state;
  }
};
