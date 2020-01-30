import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { Button } from "office-ui-fabric-react";

export interface AppProps {
  //
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  setWordTypeScoreMO;
  chunkListMO;
}

export interface AppState {
  //
}

class ChunkDetails extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }
  chunkHandler = () => {
    const { chunkDetailsMO, setChunkDetailsMO, setWordTypeScoreMO, chunkListMO } = this.props;

    chunkDetailsMO.isShow = false;

    setChunkDetailsMO(chunkDetailsMO);
    setWordTypeScoreMO(chunkListMO.wordTypeScore);
  };

  renderContent = (content: string) => {
    let listItems: JSX.Element[] = [];
    let start: number = 0;

    for (let i = 0; i < content.length; i++) {
      if (content[i] === "\r") {
        listItems.push(<div>{content.substring(start, i)}</div>);
        start = i + 1;
      }
    }

    if (start < content.length - 1) {
      listItems.push(<div>{content.substring(start + 1)}</div>);
    }

    return listItems;
  };

  render() {
    // const { setWordTypeScoreMO, chunkDetailsMO } = this.props;

    // setWordTypeScoreMO(chunkDetailsMO.data.wordTypeScore);

    return (
      <>
        <hr></hr>
        <Button onClick={this.chunkHandler}>Close</Button>
        <br />

        {this.renderContent(this.props.chunkDetailsMO.data.content)}
      </>
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
  setWordTypeScoreMO: wordTypeScoreMO => {
    dispatch({
      type: types.SET_SCORE,
      wordTypeScoreMO: wordTypeScoreMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO }) => ({ chunkDetailsMO, chunkListMO });

export default connect(mapStateToProps, mapDispatchToProps)(ChunkDetails);
