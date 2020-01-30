import { ChunkNodeMO } from "./ChunkNodeMO";
import { ChunkDataMO } from "./ChunkDataMO";
import { WordTypeCountMO } from "./WordTypeCountMO";
import { WordTypeScoreMO } from "./WordTypeScoreMO";

export class ChunkListMO {
  public head: ChunkNodeMO;
  public length: number;
  public wordTypeCount: WordTypeCountMO;
  public wordTypeScore: WordTypeScoreMO;
  public contentWordCount: number;

  constructor() {
    this.head = null;
    this.length = 0;
    this.wordTypeCount = new WordTypeCountMO();
    this.wordTypeScore = new WordTypeScoreMO();
    this.contentWordCount = 0;
  }

  addFirst(chunkDataMO: ChunkDataMO) {
    this.head = new ChunkNodeMO(0, chunkDataMO, this.head);
  }

  addLast(chunkDataMO: ChunkDataMO) {
    if (this.head === null) {
      this.addFirst(chunkDataMO);
    } else {
      let temp: ChunkNodeMO = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }

      temp.next = new ChunkNodeMO(temp.index + 1, chunkDataMO);
    }
  }

  updateChunkAtIndex(index: number, chunkDataMO: ChunkDataMO) {
    let temp: ChunkNodeMO = this.head;

    while (temp !== null && index <= temp.index) {
      if (temp.index === index) {
        temp.data = chunkDataMO;
        break;
      }

      temp = temp.next;
    }
  }

  getChunkAtIndex(index: number) {
    let temp: ChunkNodeMO = this.head;

    while (temp !== null) {
      if (temp.index === index) {
        return temp;
      }

      temp = temp.next;
    }

    return null;
  }

  // clone() {}
}
