import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkListMO } from "../../models/ChunkListMO";
import Chunk from "../Chunk/Chunk";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { ChunkDataMO } from "../../models/ChunkDataMO";

export interface AppProps {
  list: ChunkListMO;
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
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

  chunkHandler = (index: number, chunkDataMO: ChunkDataMO) => {
    console.log("==> chunk item list - ", index, chunkDataMO);

    const { setChunkDetailsMO, chunkDetailsMO } = this.props;
    chunkDetailsMO.isShow = true;
    chunkDetailsMO.data = chunkDataMO;
    chunkDetailsMO.index = index;

    setChunkDetailsMO(chunkDetailsMO);
  };

  renderChunk() {
    let listItems: JSX.Element[] = [];

    let temp = this.props.list.head;

    while (temp !== null) {
      listItems.push(
        <div key={temp.index} onClick={this.chunkHandler.bind(this, temp.index, temp.data)}>
          <Chunk title={temp.index + ". " + temp.data.title}></Chunk>
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
      type: types.SET_CHUNK,
      chunkDetailsMO: chunkDetailsMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO }) => ({ chunkDetailsMO });

export default connect(mapStateToProps, mapDispatchToProps)(ChunkList);
