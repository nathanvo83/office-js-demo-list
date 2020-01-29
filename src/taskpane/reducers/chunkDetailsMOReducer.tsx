import { types } from "../constants/types";
import { ChunkDetailsMO } from "../models/ChunkDetailsMO";

export const chunkDetailsMOReducer = (state = new ChunkDetailsMO(), action) => {
  console.log("====>>> update chunkDetailsMO:", action.chunkDetailsMO);
  switch (action.type) {
    case types.SET_CHUNK_DETAILS:
      return {
        ...state,
        ...action.chunkDetailsMO
        // chunkDetailsMO: action.chunkDetailsMO
      };

    default:
      return state;
  }
};
