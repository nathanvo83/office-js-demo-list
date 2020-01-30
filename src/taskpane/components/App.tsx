import * as React from "react";
import { connect } from "react-redux";
import { Button, ButtonType } from "office-ui-fabric-react";
import Progress from "./Progress";
import { Analysis } from "./Analysis/Analysis";
import { ChunkListMO } from "../models/ChunkListMO";
import ChunkList from "./ChunkList/ChunkList";
import { types } from "../constants/types";
import { ChunkDetailsMO } from "../models/ChunkDetailsMO";
import ChunkDetails from "./ChunkDetails/ChunkDetails";
import { ChunkNodeMO } from "../models/ChunkNodeMO";
import { Timer } from "../Utils/Timer";
import Graph from "./Graph/Graph";
import { WordTypeScoreMO } from "../models/WordTypeScoreMO";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;

  // redux
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;

  chunkListMO: ChunkListMO;
  setChunkListMO;

  wordTypeScoreMO: WordTypeScoreMO;
  setWordTypeScoreMO;
}

export interface AppState {
  isLoad: boolean;
  statusInfo: string;
}

class App extends React.Component<AppProps, AppState> {
  private analysis: Analysis;
  private keyPressTimerId;
  private chunkDetailsContentChange: boolean;

  constructor(props, context) {
    super(props, context);
    this.analysis = new Analysis();
    this.chunkDetailsContentChange = false;
    // this.shouldReload = false;
  }

  componentDidMount() {
    this.setState({
      isLoad: false,
      statusInfo: "(0/0)"
    });

    setTimeout(this.process, 0);
    this.subcribeToEvent();
  }

  componentDidUpdate() {
    const { chunkDetailsMO } = this.props;

    if (this.chunkDetailsContentChange === true && chunkDetailsMO.isShow === false) {
      this.chunkDetailsContentChange = false;
      this.processWordCountOnly();
    }
  }

  detectChange = async context => {
    let body = context.document.body;
    context.load(body, "text");
    await context.sync();

    return this.analysis.isTextChange(body.text);
  };

  updateChunkDetails = (chunkListMO: ChunkListMO) => {
    const { chunkDetailsMO, setChunkDetailsMO } = this.props;

    if (chunkDetailsMO.isShow === true) {
      let chunk: ChunkNodeMO = chunkListMO.getChunkAtIndex(chunkDetailsMO.index);

      if (chunk !== null) {
        chunkDetailsMO.data = chunk.data;
        setChunkDetailsMO(chunkDetailsMO);
      }
    }
  };

  getWordDocument = async context => {
    let body = context.document.body;
    context.load(body, "text");
    await context.sync();

    let result = this.analysis.split(body.text);

    return result;
  };

  setCompleted = () => {
    this.setState({ isLoad: false }, () => {
      // this.showTime("completed");
      // this.flagRuning = false;
      // this.subcribeToEvent();
    });
  };

  setLoading = () => {
    this.setState({ isLoad: true }, () => {
      // this.flagRuning = true;
      // this.showTime("loading");
    });
  };

  processWordCountOnly = async () => {
    this.setLoading();
    await this.countWordChunkList();
    this.setCompleted();
  };

  process = () => {
    const { chunkDetailsMO } = this.props;

    Word.run(async context => {
      let flag = await this.detectChange(context);

      if (flag === true) {
        this.setLoading();
        let result = await this.getWordDocument(context);
        this.props.setChunkListMO(result);
        this.updateChunkDetails(result);

        if (chunkDetailsMO.isShow === true) {
          this.chunkDetailsContentChange = true;
          await this.countWordChunkDetails();
        } else {
          await this.countWordChunkList();
        }

        this.setCompleted();
      }
    });
  };

  countWordChunkDetails = async () => {
    const { chunkListMO, setChunkListMO, chunkDetailsMO, setWordTypeScoreMO } = this.props;
    let idx = chunkDetailsMO.index;
    let temp = this.analysis.calculator(chunkListMO, idx, idx);
    setWordTypeScoreMO(temp.wordTypeScore);
    setChunkListMO(temp);
  };

  countWordChunkList = async () => {
    const { chunkListMO, setChunkListMO, setWordTypeScoreMO } = this.props;
    let x = 10;

    let max = Math.ceil(chunkListMO.length / x);
    chunkListMO.wordTypeCount.reset();
    chunkListMO.wordTypeScore.reset();

    // setWordTypeScoreMO(new WordTypeScoreMO());
    // Timer.sleep(500);

    let temp: ChunkListMO = new ChunkListMO();
    for (let i = 0; i < max; i++) {
      await Timer.sleep(100);
      temp = this.analysis.calculator(chunkListMO, i * x, (i + 1) * x);
      // setWordTypeScoreMO(temp.wordTypeScore, async () => {
      //   await Timer.sleep(100);
      //   setChunkListMO(temp);
      // });

      setChunkListMO(temp);
      this.setState({ statusInfo: `(${Math.min((i + 1) * x, chunkListMO.length)}/${chunkListMO.length})` });
    }

    setWordTypeScoreMO(temp.wordTypeScore);
  };

  lastKeyPressChecking = async () => {
    let len1: number;
    let len2: number;

    len1 = await Word.run(async context => {
      let body1 = context.document.body;
      context.load(body1, "text");
      await context.sync();

      return body1.text.length;
    });

    await Timer.sleep(1500);

    len2 = await Word.run(async context => {
      let body2 = context.document.body;
      context.load(body2, "text");
      await context.sync();

      return body2.text.length;
    });

    if (len1 === len2) {
      this.process();
    }
  };

  updateAppContent = () => {
    clearTimeout(this.keyPressTimerId);
    this.keyPressTimerId = setTimeout(this.lastKeyPressChecking, 2000);
  };

  subcribeToEvent = () => {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, this.updateAppContent);
  };

  unsubcribeToEvent = () => {
    Office.context.document.removeHandlerAsync(Office.EventType.DocumentSelectionChanged, this.updateAppContent);
  };

  renderMaster() {
    // const { chunkListMO } = this.props;
    return (
      <div>
        {/* <div>wc: {chunkListMO.contentWordCount}</div>
        <div>noun: {chunkListMO.wordTypeCount.noun}</div>
        <div>verb: {chunkListMO.wordTypeCount.verb}</div>
        <div>prep: {chunkListMO.wordTypeCount.prep}</div>
        <div>waste: {chunkListMO.wordTypeCount.waste}</div>
        <div>ad_: {chunkListMO.wordTypeCount.ad_}</div>
        <div>---Score---</div>
        <div>noun: {chunkListMO.wordTypeScore.nounScore}</div>
        <div>verb: {chunkListMO.wordTypeScore.verbScore}</div>
        <div>prep: {chunkListMO.wordTypeScore.prepScore}</div>
        <div>waste: {chunkListMO.wordTypeScore.wasteScore}</div>
        <div>ad_: {chunkListMO.wordTypeScore.ad_Score}</div> */}
        <ChunkList></ChunkList>
      </div>
    );
  }

  renderDetails() {
    //
    // const { chunkDetailsMO } = this.props;

    return (
      <div>
        {/* <div>wc: {chunkDetailsMO.data.contentWordCount}</div>
        <div>noun: {chunkDetailsMO.data.wordTypeCount.noun}</div>
        <div>verb: {chunkDetailsMO.data.wordTypeCount.verb}</div>
        <div>prep: {chunkDetailsMO.data.wordTypeCount.prep}</div>
        <div>waste: {chunkDetailsMO.data.wordTypeCount.waste}</div>
        <div>ad_: {chunkDetailsMO.data.wordTypeCount.ad_}</div>
        <div>---Score---</div>
        <div>noun: {chunkDetailsMO.data.wordTypeScore.nounScore}</div>
        <div>verb: {chunkDetailsMO.data.wordTypeScore.verbScore}</div>
        <div>prep: {chunkDetailsMO.data.wordTypeScore.prepScore}</div>
        <div>waste: {chunkDetailsMO.data.wordTypeScore.wasteScore}</div>
        <div>ad_: {chunkDetailsMO.data.wordTypeScore.ad_Score}</div> */}

        <ChunkDetails></ChunkDetails>
      </div>
    );
  }

  render() {
    const { title, isOfficeInitialized, chunkDetailsMO } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    console.log("-->", chunkDetailsMO.isShow);

    return (
      <div className="ms-welcome">
        {this.state.isLoad === false ? "completed" : "loading"} - {this.state.statusInfo}
        <br />
        <Button
          className="ms-welcome__action"
          buttonType={ButtonType.hero}
          iconProps={{ iconName: "ChevronRight" }}
          onClick={this.process}
        >
          Run
        </Button>
        <Button
          className="ms-welcome__action"
          buttonType={ButtonType.hero}
          iconProps={{ iconName: "ChevronRight" }}
          onClick={this.countWordChunkList}
        >
          Count
        </Button>
        <hr />
        <Graph></Graph>
        <hr />
        {chunkDetailsMO.isShow === false ? this.renderMaster() : this.renderDetails()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setChunkDetailsMO: chunkDetailsMO => {
    dispatch({
      type: types.SET_CHUNK_DETAILS,
      chunkDetailsMO: chunkDetailsMO
    });
  },
  setChunkListMO: chunkListMO => {
    dispatch({
      type: types.SET_CHUNK_LIST,
      chunkListMO: chunkListMO
    });
  },
  setWordTypeScoreMO: wordTypeScoreMO => {
    dispatch({
      type: types.SET_SCORE,
      wordTypeScoreMO: wordTypeScoreMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO, wordTypeScoreMO }) => ({
  chunkDetailsMO,
  chunkListMO,
  wordTypeScoreMO
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
