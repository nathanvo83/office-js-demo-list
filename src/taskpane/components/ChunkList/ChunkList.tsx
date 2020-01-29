import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkListMO } from "../../models/ChunkListMO";
import Chunk from "../Chunk/Chunk";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { ChunkDataMO } from "../../models/ChunkDataMO";

export interface AppProps {
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  chunkListMO: ChunkListMO;
  // setChunkListMO;
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

  chunkHandler = (index: number, chunkDataMO: ChunkDataMO) => {
    this.moveCursor(chunkDataMO.content);

    const { setChunkDetailsMO, chunkDetailsMO } = this.props;
    chunkDetailsMO.isShow = true;
    chunkDetailsMO.data = chunkDataMO;
    chunkDetailsMO.index = index;

    setChunkDetailsMO(chunkDetailsMO);
  };

  renderChunk() {
    let listItems: JSX.Element[] = [];

    let temp = this.props.chunkListMO.head;

    while (temp !== null) {
      listItems.push(
        <div key={temp.index} onClick={this.chunkHandler.bind(this, temp.index, temp.data)}>
          <Chunk title={(temp.isUpdated === false ? "o - " : "x - ") + temp.index + ". " + temp.data.title}></Chunk>
        </div>
      );
      temp = temp.next;
    }
    return listItems;
  }

  render() {
    return <>{this.renderChunk()}</>;
  }
}

const mapDispatchToProps = dispatch => ({
  setChunkDetailsMO: chunkDetailsMO => {
    dispatch({
      type: types.SET_CHUNK_DETAILS,
      chunkDetailsMO: chunkDetailsMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO }) => ({ chunkDetailsMO, chunkListMO });

export default connect(mapStateToProps, mapDispatchToProps)(ChunkList);
