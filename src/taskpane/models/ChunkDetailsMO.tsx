import { ChunkDataMO } from "./ChunkDataMO";

export class ChunkDetailsMO {
  public isShow: boolean;
  public data: ChunkDataMO;
  public index: number;

  constructor(index: number = 0, isShow: boolean = false, data: ChunkDataMO = new ChunkDataMO()) {
    this.index = index;
    this.isShow = isShow;
    this.data = data;
  }
}
