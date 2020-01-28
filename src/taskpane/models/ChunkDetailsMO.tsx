import { ChunkDataMO } from "./ChunkDataMO";

export class ChunkDetailsMO {
  public isShow: boolean;
  public data: ChunkDataMO;
  public index: number;

  constructor(isShow: boolean = false, data: ChunkDataMO = new ChunkDataMO(), index: number = 0) {
    this.index = index;
    this.isShow = isShow;
    this.data = data;
  }
}
