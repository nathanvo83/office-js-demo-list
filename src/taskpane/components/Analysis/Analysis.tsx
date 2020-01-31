import { ChunkListMO } from "../../models/ChunkListMO";
import { ChunkDataMO } from "../../models/ChunkDataMO";
import { wordData } from "../../database/wordData";
import { WordTypeCountMO } from "../../models/WordTypeCountMO";
import { ChunkNodeMO } from "../../models/ChunkNodeMO";
import { Config } from "../../constants/config";
import { WordTypeScoreMO } from "../../models/WordTypeScoreMO";

export enum Metrics {
  Overall,
  Verbs,
  Nouns,
  Prepositions,
  AdjectivesAdverbs,
  WasteWords
}

export class Analysis {
  private previousLength: number;

  constructor() {
    this.previousLength = 0;
  }

  private createChunkDataMO(content: string) {
    let chunkDataMO: ChunkDataMO;
    let title = this.getChunkTitle(content);

    chunkDataMO = new ChunkDataMO(title, content);

    return chunkDataMO;
  }

  private getChunkTitle(content: string) {
    let temp = content.trim();
    let paragraph = temp.substring(0, temp.indexOf("\r", 0));

    let end = paragraph.indexOf(" ", 30) === -1 ? paragraph.length : paragraph.indexOf(" ", 30);

    return paragraph.substring(0, end) + " ...";
  }

  isTextChange(text: string) {
    if (text.length !== this.previousLength) {
      console.log("text change");
      this.previousLength = text.length;
      return true;
    }
    console.log("text does not change");
    return false;
  }

  private identifVerbs(word: string) {
    let result: boolean = false;
    // verbs
    wordData.verbTokenRegex.forEach(verb => {
      if (word.endsWith(verb) === true) {
        result = true;
      }
    });
    wordData.verbTokenMatch.forEach(verb => {
      if (word === verb) {
        result = true;
      }
    });

    return result;
  }

  private identifyNouns(word: string) {
    let result: boolean = false;
    // nouns
    wordData.nounTokenRegex.forEach(noun => {
      if (word.endsWith(noun) === true) {
        result = true;
      }
    });
    wordData.nounExceptionMatch.forEach(noun => {
      if (word === noun) {
        result = true;
      }
    });

    return result;
  }

  private identifyPrepositions(word: string) {
    let result: boolean = false;
    // prepositions
    wordData.prepositionTokenMatch.forEach(prep => {
      if (word === prep) {
        result = true;
      }
    });

    return result;
  }

  private identifyAd_s(word: string) {
    let result: boolean = false;
    // ad_
    wordData.adjTokenRegex.forEach(prep => {
      if (word.endsWith(prep) === true) {
        result = true;
      }
    });

    wordData.adjectiveAdverbExceptionMatch.forEach(prep => {
      if (word === prep) {
        result = true;
      }
    });
    return result;
  }

  private identifyWastes(word: string) {
    let result: boolean = false;
    // waste

    wordData.wasteWordTokenMatch.forEach(waste => {
      if (word.includes(waste)) {
        result = true;
      }
      // if (word === waste) {
      //   result = true;
      // }
    });
    return result;
  }

  // -1: normal
  // 0: verbs
  // 1:nouns
  // 2:prepositions
  // 3:ad_s
  // 4:waste
  public identifyWord(word: string) {
    if (this.identifVerbs(word) === true) {
      return 0;
    } else if (this.identifyNouns(word) === true) {
      return 1;
    } else if (this.identifyPrepositions(word) === true) {
      return 2;
    } else if (this.identifyAd_s(word) === true) {
      return 3;
    } else if (this.identifyWastes(word) === true) {
      return 4;
    }
    return -1;
  }

  private calculateWord(content: string) {
    let _verb = 0;
    let _waste = 0;
    let _noun = 0;
    let _prep = 0;
    let _ad_ = 0;
    let wc = 0;

    if (content) {
      content.split(" ").forEach(word => {
        if (word.trim().length > 0) {
          let term = word.toLowerCase();

          wc++;

          switch (this.identifyWord(term)) {
            case 0:
              _verb++;
              break;
            case 1:
              _noun++;
              break;
            case 2:
              _prep++;
              break;
            case 3:
              _ad_++;
              break;
            case 4:
              _waste++;
              break;

            default:
              break;
          }
        }
      });
    }

    let wtc = new WordTypeCountMO(_verb, _noun, _prep, _waste, _ad_);
    wc--;

    return { wtc, wc };
  }

  // private calculateWord(content: string) {
  //   let _verb = 0;
  //   let _waste = 0;
  //   let _noun = 0;
  //   let _prep = 0;
  //   let _ad_ = 0;
  //   let wc = 0;

  //   if (content) {
  //     content.split(" ").forEach(word => {
  //       if (word.trim().length > 0) {
  //         let term = word.toLowerCase();

  //         wc++;

  //         // verbs
  //         wordData.verbTokenRegex.forEach(verb => {
  //           if (term.endsWith(verb) === true) {
  //             _verb += 1;
  //           }
  //         });
  //         wordData.verbTokenMatch.forEach(verb => {
  //           if (term === verb) {
  //             _verb += 1;
  //           }
  //         });

  //         // nouns
  //         wordData.nounTokenRegex.forEach(noun => {
  //           if (term.endsWith(noun) === true) {
  //             _noun += 1;
  //           }
  //         });
  //         wordData.nounExceptionMatch.forEach(noun => {
  //           if (term === noun) {
  //             _noun += 1;
  //           }
  //         });

  //         // adj
  //         wordData.adjTokenRegex.forEach(prep => {
  //           if (term.endsWith(prep) === true) {
  //             _ad_ += 1;
  //           }
  //         });

  //         wordData.adjectiveAdverbExceptionMatch.forEach(prep => {
  //           if (term === prep) {
  //             _ad_ += 1;
  //           }
  //         });

  //         // prep
  //         wordData.prepositionTokenMatch.forEach(prep => {
  //           if (term === prep) {
  //             _prep += 1;
  //           }
  //         });

  //         // waste
  //         wordData.wasteWordTokenMatch.forEach(waste => {
  //           if (term === waste) {
  //             _waste += 1;
  //           }
  //         });
  //       }
  //     });
  //   }

  //   let wtc = new WordTypeCountMO(_verb, _noun, _prep, _waste, _ad_);
  //   wc--;

  //   return { wtc, wc };
  // }

  // scoreCalculator = (metric: Metrics, count: number, wc: number) => {

  private calculateScore(count: number, wordCount: number, scoreCutoffs: number[]) {
    // const { metrics } = this._config;
    // const { scoreCutoffs } = metrics[+metric];

    const scoreContributionWeight = {
      0: 1, // lean
      1: 2, // fit & trim
      2: 4, // needs toning
      3: 16, // flabby
      4: 32 // heart attack
    };

    const rate = (count / wordCount) * 1000;

    // Get the highest rating class less than rating based on the thresholds defined in the config
    const rating = scoreCutoffs.reduce((r, cutoff) => {
      return rate >= cutoff ? r + 1 : r;
    }, 0);

    // Calculate floating score based on rating
    let score: number = 0;

    if (rating > 0) {
      score = rating + (rate - scoreCutoffs[rating - 1]) / (scoreCutoffs[rating] - scoreCutoffs[rating - 1]);
    } else if (rating == 0) {
      score = rating + rate / scoreCutoffs[rating];
    }

    const scoreContribution = scoreContributionWeight[rating];

    return {
      scoreContribution,
      score,
      rating
    };
  }

  private calculateChunkNodeScores(chunkNodeMO: ChunkNodeMO) {
    let score: WordTypeScoreMO = new WordTypeScoreMO();

    // verbs
    score.verbScore = this.calculateScore(
      chunkNodeMO.data.wordTypeCount.verb,
      chunkNodeMO.data.contentWordCount,
      Config.metrics.Verbs.scoreCutoffs
    ).score;

    // nouns
    score.nounScore = this.calculateScore(
      chunkNodeMO.data.wordTypeCount.noun,
      chunkNodeMO.data.contentWordCount,
      Config.metrics.Nouns.scoreCutoffs
    ).score;

    // prep
    score.prepScore = this.calculateScore(
      chunkNodeMO.data.wordTypeCount.prep,
      chunkNodeMO.data.contentWordCount,
      Config.metrics.Prepositions.scoreCutoffs
    ).score;

    // ad_word
    score.ad_Score = this.calculateScore(
      chunkNodeMO.data.wordTypeCount.ad_,
      chunkNodeMO.data.contentWordCount,
      Config.metrics.AdjectivesAdverbs.scoreCutoffs
    ).score;

    // waste
    score.wasteScore = this.calculateScore(
      chunkNodeMO.data.wordTypeCount.waste,
      chunkNodeMO.data.contentWordCount,
      Config.metrics.WasteWords.scoreCutoffs
    ).score;

    return score;
  }

  private calculateChunkListScores(chunkListMO: ChunkListMO) {
    let score: WordTypeScoreMO = new WordTypeScoreMO();

    // verbs
    score.verbScore = this.calculateScore(
      chunkListMO.wordTypeCount.verb,
      chunkListMO.contentWordCount,
      Config.metrics.Verbs.scoreCutoffs
    ).score;

    // nouns
    score.nounScore = this.calculateScore(
      chunkListMO.wordTypeCount.noun,
      chunkListMO.contentWordCount,
      Config.metrics.Nouns.scoreCutoffs
    ).score;

    // prep
    score.prepScore = this.calculateScore(
      chunkListMO.wordTypeCount.prep,
      chunkListMO.contentWordCount,
      Config.metrics.Prepositions.scoreCutoffs
    ).score;

    // ad_word
    score.ad_Score = this.calculateScore(
      chunkListMO.wordTypeCount.ad_,
      chunkListMO.contentWordCount,
      Config.metrics.AdjectivesAdverbs.scoreCutoffs
    ).score;

    // waste
    score.wasteScore = this.calculateScore(
      chunkListMO.wordTypeCount.waste,
      chunkListMO.contentWordCount,
      Config.metrics.WasteWords.scoreCutoffs
    ).score;

    return score;
  }

  public calculator(chunkListMO: ChunkListMO, from: number, to: number) {
    let temp = chunkListMO.head;
    let i: number = 0;

    while (temp !== null && i <= to) {
      if (i >= from && i <= to) {
        let { wtc, wc } = this.calculateWord(temp.data.content);
        temp.data.wordTypeCount = wtc;
        temp.data.contentWordCount = wc;
        temp.isUpdated = true;
        temp.data.wordTypeScore = this.calculateChunkNodeScores(temp);

        chunkListMO.wordTypeCount.append(wtc);
        chunkListMO.contentWordCount += wc;
      }

      temp = temp.next;
      i++;
    }

    chunkListMO.wordTypeScore = this.calculateChunkListScores(chunkListMO);

    return chunkListMO;
  }

  public split(doc: string) {
    let chunkListMO: ChunkListMO = new ChunkListMO();
    let start: number = 0;
    let length: number = 0;

    for (let i = 0; i < doc.length; i++) {
      if (doc[i] === "\r" && i - start >= 5000) {
        let content = doc.substring(start, i);
        chunkListMO.addLast(this.createChunkDataMO(content));
        //
        start = i + 1;
        length++;
      }
    }

    if (start < doc.length - 1) {
      let content = doc.substring(start);
      chunkListMO.addLast(this.createChunkDataMO(content));
      length++;
    }

    chunkListMO.length = length;

    console.log("analysis chunkListMO: ", chunkListMO);

    return chunkListMO;
  }

  public test(msg: string) {
    console.log(msg);
  }

  public countWord(str, schar) {
    return str.length - str.replace(RegExp(schar), "").length;
  }
}
