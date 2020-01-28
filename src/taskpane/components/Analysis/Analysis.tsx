import { ChunkListMO } from "../../models/ChunkListMO";
import { ChunkDataMO } from "../../models/ChunkDataMO";
import { wordData } from "../../database/wordData";
import { WordTypeCountMO } from "../../models/WordTypeCountMO";

export class Analysis {
  // private chunkListMO: ChunkListMO;

  constructor() {
    //da a
    // this.chunkListMO = new ChunkListMO();
  }

  private createChunkDataMO(content: string) {
    let chunkDataMO: ChunkDataMO;
    let title = this.getChunkTitle(content);
    // let wtc = this.calculator(content);

    chunkDataMO = new ChunkDataMO(title, content);

    return chunkDataMO;
  }

  private getChunkTitle(content: string) {
    let end = content.indexOf(" ", 30) === -1 ? content.length : content.indexOf(" ", 30);
    return content.substring(0, end);
  }

  // private calculatorVerb(data: string) {
  //   let _verb = 0;

  //   if (data) {
  //     data.split(" ").forEach(word => {
  //       let term = word.toLowerCase();

  //       // verbs
  //       wordData.verbTokenRegex.forEach(verb => {
  //         if (term.endsWith(verb) === true) {
  //           _verb += 1;
  //         }
  //       });
  //       wordData.verbTokenMatch.forEach(verb => {
  //         if (term === verb) {
  //           _verb += 1;
  //         }
  //       });
  //     });
  //   }
  //   return _verb;
  // }

  // private calculatorNoun(data: string) {
  //   let _noun = 0;

  //   if (data) {
  //     data.split(" ").forEach(word => {
  //       let term = word.toLowerCase();

  //       // nouns
  //       wordData.nounTokenRegex.forEach(noun => {
  //         if (term.endsWith(noun) === true) {
  //           _noun += 1;
  //         }
  //       });
  //       wordData.nounExceptionMatch.forEach(noun => {
  //         if (term === noun) {
  //           _noun += 1;
  //         }
  //       });
  //     });
  //   }
  //   return _noun;
  // }

  // private calculatorPrep(data: string) {
  //   let _prep = 0;

  //   if (data) {
  //     data.split(" ").forEach(word => {
  //       let term = word.toLowerCase();

  //       // adj
  //       wordData.adjTokenRegex.forEach(prep => {
  //         if (term.endsWith(prep) === true) {
  //           _prep += 1;
  //         }
  //       });

  //       wordData.adjectiveAdverbExceptionMatch.forEach(prep => {
  //         if (term === prep) {
  //           _prep += 1;
  //         }
  //       });
  //       wordData.prepositionTokenMatch.forEach(prep => {
  //         if (term === prep) {
  //           _prep += 1;
  //         }
  //       });
  //     });
  //   }
  //   return _prep;
  // }

  // private calculatorWaste(data: string) {
  //   let _waste = 0;

  //   if (data) {
  //     data.split(" ").forEach(word => {
  //       let term = word.toLowerCase();

  //       // waste
  //       wordData.wasteWordTokenMatch.forEach(waste => {
  //         if (term === waste) {
  //           _waste += 1;
  //         }
  //       });
  //     });
  //   }
  //   return _waste;
  // }

  private calculatorWord(content: string) {
    let _verb = 0;
    let _waste = 0;
    let _noun = 0;
    let _prep = 0;

    if (content) {
      content.split(" ").forEach(word => {
        let term = word.toLowerCase();

        // verbs
        wordData.verbTokenRegex.forEach(verb => {
          if (term.endsWith(verb) === true) {
            _verb += 1;
          }
        });
        wordData.verbTokenMatch.forEach(verb => {
          if (term === verb) {
            _verb += 1;
          }
        });

        // nouns
        wordData.nounTokenRegex.forEach(noun => {
          if (term.endsWith(noun) === true) {
            _noun += 1;
          }
        });
        wordData.nounExceptionMatch.forEach(noun => {
          if (term === noun) {
            _noun += 1;
          }
        });

        // adj
        // wordData.adjTokenRegex.forEach(prep => {
        //   if (term.endsWith(prep) === true) {
        //     _prep += 1;
        //   }
        // });

        // wordData.adjectiveAdverbExceptionMatch.forEach(prep => {
        //   if (term === prep) {
        //     _prep += 1;
        //   }
        // });
        // wordData.prepositionTokenMatch.forEach(prep => {
        //   if (term === prep) {
        //     _prep += 1;
        //   }
        // });

        // // waste
        // wordData.wasteWordTokenMatch.forEach(waste => {
        //   if (term === waste) {
        //     _waste += 1;
        //   }
        // });
      });
    }

    let wtc = new WordTypeCountMO(_verb, _noun, _prep, _waste);

    return wtc;
  }

  private calculator(chunkListMO: ChunkListMO) {
    let temp = chunkListMO.head;

    while (temp !== null) {
      setTimeout(temp => {
        temp.data.wordTypeCount = this.calculatorWord(temp.data.content);
      }, 100);

      temp = temp.next;
    }
  }

  private split(doc: string) {
    let chunkListMO: ChunkListMO = new ChunkListMO();
    let start: number = 0;

    for (let i = 0; i < doc.length; i++) {
      if (doc[i] === "\r" && i - start >= 5000) {
        let content = doc.substring(start, i - 1);
        chunkListMO.addLast(this.createChunkDataMO(content));
        //
        start = i;
      }
    }

    if (start < doc.length - 1) {
      let content = doc.substring(start, doc.length - 1);
      chunkListMO.addLast(this.createChunkDataMO(content));
    }

    return chunkListMO;
  }

  public process(doc: string) {
    let result = this.split(doc);

    // do somthing => count word type...
    this.calculator(result);

    return result;
  }

  public test(msg: string) {
    console.log(msg);
  }
}
