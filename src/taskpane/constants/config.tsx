import * as React from "react";

export const Config = {
  base: {
    buildNumber: require("../../../package.json").version // https://semver.org/
    // bounds: {
    //     'minChunkWords': {
    //         min: 100,
    //         max: 1000
    //     },
    //     'ignore.wordCountLessThan': {
    //         min: 0,
    //         max: 100
    //     }
  },

  metrics: {
    Overall: {
      key: "Overall",
      order: 0,
      borderColor: "#69696c",
      color: "#f4f4f4",
      secondaryColor: "#6d6d6f",
      hue: 0.1,
      label: "Overall",
      word: "overall",
      longDescription: <span>The results of all tests combined.</span>
    },

    Verbs: {
      key: "Verbs",
      order: 1,
      borderColor: "#dc8749",
      color: "#dc8749",
      secondaryColor: "#333333",
      hue: 0.1,
      label: "be-verbs",
      word: "be-verb",
      longDescription: (
        <span>
          Counts be-verbs: <em>am, is, are, was, were, be,</em> and <em>been</em>.
        </span>
      ),
      scoreCutoffs: [25, 35, 45, 55]
    },
    Nouns: {
      key: "Nouns",
      order: 2,
      borderColor: "#97c6e9",
      color: "#97c6e9",
      secondaryColor: "#333333",
      hue: 0.3,
      label: "zombie nouns",
      word: "zombie noun",
      longDescription: (
        <span>
          Counts nominalizations (abstract nouns) that end with the suffixes&#32;
          <em>ion, ism, ty, ment, ness, ance, ence.</em>
        </span>
      ),
      scoreCutoffs: [35, 45, 55, 65]
    },
    Prepositions: {
      key: "Prepositions",
      order: 3,
      borderColor: "#aac044",
      color: "#aac044",
      secondaryColor: "#333333",
      hue: 0.5,
      label: "prepositions",
      word: "preposition",
      longDescription: (
        <span>
          Counts common prepositions such as <em>in, by, for,</em> and <em>of</em>. The test also counts <em>to</em>{" "}
          when used in an infinitive verb construction.
        </span>
      ),
      scoreCutoffs: [135, 155, 175, 195]
    },
    AdjectivesAdverbs: {
      key: "AdjectivesAdverbs",
      order: 4,
      borderColor: "#f7e73f",
      color: "#f7e73f",
      secondaryColor: "#333333",
      hue: 0.7,
      label: "ad-words",
      word: "ad-word",
      longDescription: (
        <span>
          Counts adjectives and adverbs that end with common suffixes such as
          <em>able, ac, al, ant, ary, ent, ful, ible, ic, ive, less, ly, ous.</em>
        </span>
      ),
      scoreCutoffs: [55, 75, 95, 115]
    },
    WasteWords: {
      key: "WasteWords",
      order: 5,
      borderColor: "#e6b5c4",
      color: "#e6b5c4",
      secondaryColor: "#333333",
      hue: 0.9,
      label: "it, this, that, there",
      word: "it, this, that, there",
      longDescription: (
        <span>
          Counts the words <em>it, this, that,</em> and <em>there</em>.
        </span>
      ),
      scoreCutoffs: [25, 35, 45, 55]
    }
  }
};
