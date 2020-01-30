export class WordTypeScoreMO {
  public verbScore: number;
  public nounScore: number;
  public prepScore: number;
  public wasteScore: number;
  public ad_Score: number;

  constructor(verbScore = 0, nounScore = 0, prepScore = 0, wasteScore = 0, ad_Score = 0) {
    this.nounScore = nounScore;
    this.prepScore = prepScore;
    this.verbScore = verbScore;
    this.wasteScore = wasteScore;
    this.ad_Score = ad_Score;
  }

  public reset() {
    this.nounScore = 0;
    this.prepScore = 0;
    this.verbScore = 0;
    this.wasteScore = 0;
    this.ad_Score = 0;
  }
}
