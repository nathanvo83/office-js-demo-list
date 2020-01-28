import { types } from "../constants/types";
import { ChunkDetailsMO } from "../models/ChunkDetailsMO";

export const chunkDetailsMOReducer = (state = new ChunkDetailsMO(), action) => {
  console.log("====>>> update chunkDetailsMO");
  switch (action.type) {
    case types.SET_CHUNK:
      return {
        ...state,
        chunkDetailsMO: action.chunkDetailsMO
      };

    default:
      return state;
  }
};
