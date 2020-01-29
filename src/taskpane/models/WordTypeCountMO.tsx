export class WordTypeCountMO {
  public verb: number;
  public noun: number;
  public prep: number;
  public waste: number;

  constructor(verb = 0, noun = 0, prep = 0, waste = 0) {
    this.noun = noun;
    this.prep = prep;
    this.verb = verb;
    this.waste = waste;
  }

  public append(wtc: WordTypeCountMO) {
    this.noun += wtc.noun;
    this.prep += wtc.prep;
    this.verb += wtc.verb;
    this.waste += wtc.waste;
  }

  public reset() {
    this.noun = 0;
    this.prep = 0;
    this.verb = 0;
    this.waste = 0;
  }
}
