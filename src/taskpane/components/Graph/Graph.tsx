import * as React from "react";
import { connect } from "react-redux";
import "./Graph.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinHearts } from "@fortawesome/free-regular-svg-icons";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faMeh } from "@fortawesome/free-regular-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import GraphPart from "./GraphPart";
import { Config } from "../../constants/config";
import { WordTypeScoreMO } from "../../models/WordTypeScoreMO";

export interface AppProps {
  //
  wordTypeScoreMO: WordTypeScoreMO;
}

export interface AppState {
  //
}

class Graph extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }

  render() {
    const theSections = (
      <div className={"graph-part-sections"}>
        <div className={"graph-part-section-slice graph-part-section-slice--1"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--2"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--3"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--4"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--5"}></div>
      </div>
    );

    const theLines = (
      <div className={"graph-part-sections graph-part-lines"}>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
      </div>
    );

    const theEmojis = (
      <div className={"graph-part graph-part-emojis"}>
        <FontAwesomeIcon icon={faSmileBeam} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faGrinHearts} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faMeh} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faFrown} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faSadCry} style={{ flex: 1 }} />
      </div>
    );
    const { wordTypeScoreMO } = this.props;
    const graph = (
      <div className={"graph-container"}>
        {theSections}
        {theLines}
        {theEmojis}
        <GraphPart
          label={Config.metrics.Verbs.label}
          score={wordTypeScoreMO.verbScore}
          color={Config.metrics.Verbs.color}
        ></GraphPart>
        <GraphPart
          label={Config.metrics.Nouns.label}
          score={wordTypeScoreMO.nounScore}
          color={Config.metrics.Nouns.color}
        ></GraphPart>
        <GraphPart
          label={Config.metrics.Prepositions.label}
          score={wordTypeScoreMO.prepScore}
          color={Config.metrics.Prepositions.color}
        ></GraphPart>
        <GraphPart
          label={Config.metrics.AdjectivesAdverbs.label}
          score={wordTypeScoreMO.ad_Score}
          color={Config.metrics.AdjectivesAdverbs.color}
        ></GraphPart>
        <GraphPart
          label={Config.metrics.WasteWords.label}
          score={wordTypeScoreMO.wasteScore}
          color={Config.metrics.WasteWords.color}
        ></GraphPart>
      </div>
    );

    return <div>{graph}</div>;
  }
}

const mapStateToProps = ({ wordTypeScoreMO }) => ({
  wordTypeScoreMO
});

export default connect(mapStateToProps, null)(Graph);
