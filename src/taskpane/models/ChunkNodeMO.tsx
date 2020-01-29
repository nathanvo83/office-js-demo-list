import { ChunkDataMO } from "./ChunkDataMO";

export class ChunkNodeMO {
  public index: number;
  public data: ChunkDataMO;
  public next: ChunkNodeMO;
  public isUpdated: boolean;

  constructor(index: number = 0, data: ChunkDataMO = null, next: ChunkNodeMO = null, isUpdated: boolean = false) {
    this.index = index;
    this.data = data;
    this.next = next;
    this.isUpdated = isUpdated;
  }
}
