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

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;

  // redux
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
}

export interface AppState {
  isLoad: boolean;
  chunkListMO: ChunkListMO;
}

class App extends React.Component<AppProps, AppState> {
  private analysis: Analysis;

  constructor(props, context) {
    super(props, context);

    this.analysis = new Analysis();
  }

  componentDidMount() {
    this.setState({
      isLoad: false,
      chunkListMO: new ChunkListMO()
    });

    this.subcribeToEvent();
  }

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

    let result = this.analysis.process(body.text);

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

  process = () => {
    Word.run(async context => {
      this.setLoading();
      let result = await this.getWordDocument(context);
      this.updateChunkDetails(result);

      this.setState({ chunkListMO: result }, this.setCompleted);
    });
  };

  subcribeToEvent = () => {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, this.process);
  };

  unsubcribeToEvent = () => {
    Office.context.document.removeHandlerAsync(Office.EventType.DocumentSelectionChanged, this.process);
  };

  renderMaster() {
    //
    return <ChunkList list={this.state.chunkListMO}></ChunkList>;
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
        {chunkDetailsMO.isShow === false ? this.renderMaster() : this.renderDetails()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setChunkDetailsMO: chunkDetailsMO => {
    dispatch({
      type: types.SET_CHUNK,
      chunkDetailsMO: chunkDetailsMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO }) => ({ chunkDetailsMO });

export default connect(mapStateToProps, mapDispatchToProps)(App);
