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

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;

  // redux
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;

  chunkListMO: ChunkListMO;
  setChunkListMO;
}

export interface AppState {
  isLoad: boolean;
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
      isLoad: false
    });

    this.subcribeToEvent();
  }

  componentDidUpdate() {
    console.log("--- app componentDidUpdate");
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
    const { chunkListMO, setChunkListMO, chunkDetailsMO } = this.props;
    let idx = chunkDetailsMO.index;
    this.analysis.calculator(chunkListMO, idx, idx);
    setChunkListMO(chunkListMO);
  };

  countWordChunkList = async () => {
    const { chunkListMO, setChunkListMO } = this.props;
    let x = 10;

    let max = Math.ceil(chunkListMO.length / x);

    for (let i = 0; i < max; i++) {
      await Timer.sleep(100);
      this.analysis.calculator(chunkListMO, i * x, (i + 1) * x);
      setChunkListMO(chunkListMO);
    }
  };

  lastKeyPressChecking = async () => {
    console.log("--- app last key press checking");

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
    //
    return <ChunkList analysis={this.analysis}></ChunkList>;
  }

  renderDetails() {
    //
    const { chunkDetailsMO } = this.props;

    return (
      <div>
        <div>noun: {chunkDetailsMO.data.wordTypeCount.noun}</div>
        <div>verb: {chunkDetailsMO.data.wordTypeCount.verb}</div>
        <div>prep: {chunkDetailsMO.data.wordTypeCount.prep}</div>
        <div>waste: {chunkDetailsMO.data.wordTypeCount.waste}</div>
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
        {this.state.isLoad === false ? "completed" : "loading"}
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
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO }) => ({ chunkDetailsMO, chunkListMO });

export default connect(mapStateToProps, mapDispatchToProps)(App);
