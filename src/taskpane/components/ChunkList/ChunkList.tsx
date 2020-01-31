import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkListMO } from "../../models/ChunkListMO";
import Chunk from "../Chunk/Chunk";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { WordTypeScoreMO } from "../../models/WordTypeScoreMO";
import { ChunkNodeMO } from "../../models/ChunkNodeMO";

export interface AppProps {
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  chunkListMO: ChunkListMO;
  // setChunkListMO;
  wordTypeScoreMO: WordTypeScoreMO;
  setWordTypeScoreMO;
}

export interface AppState {
  //
}

class ChunkList extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }

  moveCursor = (content: string) => {
    let temp = content.trim().substr(0, 255);

    Word.run(async context => {
      var searchResults = context.document.body.search(temp, { matchPrefix: true }).getFirst();

      searchResults.select("Start");
      await context.sync();
    });
  };

  chunkHandler = (chunkNodeMO: ChunkNodeMO) => {
    this.moveCursor(chunkNodeMO.data.content);

    const { setChunkDetailsMO, chunkDetailsMO, setWordTypeScoreMO } = this.props;
    chunkDetailsMO.isShow = true;
    chunkDetailsMO.data = chunkNodeMO.data;
    chunkDetailsMO.index = chunkNodeMO.index;

    setChunkDetailsMO(chunkDetailsMO);
    setWordTypeScoreMO(chunkNodeMO.data.wordTypeScore);
  };

  renderChunk() {
    let listItems: JSX.Element[] = [];

    let temp = this.props.chunkListMO.head;

    while (temp !== null) {
      listItems.push(
        <div key={temp.index} onClick={this.chunkHandler.bind(this, temp)}>
          <Chunk title={(temp.isUpdated === false ? "o - " : "x - ") + temp.index + ". " + temp.data.title}></Chunk>
        </div>
      );
      temp = temp.next;
    }
    return listItems;
  }

  render() {
    return <div>{this.renderChunk()}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  setChunkDetailsMO: chunkDetailsMO => {
    dispatch({
      type: types.SET_CHUNK_DETAILS,
      chunkDetailsMO: chunkDetailsMO
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

export default connect(mapStateToProps, mapDispatchToProps)(ChunkList);
