import { WordTypeCountMO } from "./WordTypeCountMO";

export class ChunkDataMO {
  public title: string;
  public content: string;
  public wordTypeCount: WordTypeCountMO;

  constructor(title: string = "", content: string = "", wordCountType: WordTypeCountMO = new WordTypeCountMO()) {
    this.title = title;
    this.content = content;
    this.wordTypeCount = wordCountType;
  }
}
