import { WordTypeCountMO } from "./WordTypeCountMO";
import { WordTypeScoreMO } from "./WordTypeScoreMO";

export class ChunkDataMO {
  public title: string;
  public content: string;
  public wordTypeCount: WordTypeCountMO;
  public wordTypeScore: WordTypeScoreMO;
  public contentWordCount: number;

  constructor(
    title: string = "",
    content: string = "",
    wordTypeCount: WordTypeCountMO = new WordTypeCountMO(),
    wordTypeScore: WordTypeScoreMO = new WordTypeScoreMO(),
    contentWordCount: number = 0
  ) {
    this.title = title;
    this.content = content;
    this.wordTypeCount = wordTypeCount;
    this.wordTypeScore = wordTypeScore;
    this.contentWordCount = contentWordCount;
  }
}
