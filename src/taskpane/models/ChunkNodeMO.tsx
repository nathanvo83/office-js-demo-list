import { ChunkDataMO } from "./ChunkDataMO";

export class ChunkNodeMO {
  public index: number;
  public data: ChunkDataMO;
  public next: ChunkNodeMO;

  constructor(index: number = 0, data: ChunkDataMO = null, next: ChunkNodeMO = null) {
    this.index = index;
    this.data = data;
    this.next = next;
  }
}
