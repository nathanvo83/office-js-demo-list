import * as React from "react";
import { connect } from "react-redux";
import "./Diagnosis.css";
import { types } from "../../constants/types";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { IconButton } from "office-ui-fabric-react";
import { ChunkListMO } from "../../models/ChunkListMO";

// import RegionIcon from "../../../assets/regionicon.svg";
// import DocumentIcon from "../../../assets/documenticon.svg";

// import DocumentIcon from "../../../../assets/documenticon.svg";
const DocumentIcon = require("../../../../assets/documenticon.svg");
const RegionIcon = require("../../../../assets/regionicon.svg");

export interface AppProps {
  //
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  chunkListMO: ChunkListMO;
  setWordTypeScoreMO;
}

export interface AppState {
  //
}

class Diagnosis extends React.Component<AppProps, AppState> {
  closeButtonHandler = () => {
    const { setChunkDetailsMO, chunkDetailsMO, chunkListMO, setWordTypeScoreMO } = this.props;
    chunkDetailsMO.isShow = false;
    setChunkDetailsMO(chunkDetailsMO);
    setWordTypeScoreMO(chunkListMO.wordTypeScore);
  };

  render() {
    const { chunkDetailsMO, chunkListMO } = this.props;

    const regionBackgroundColor = "#5f5ba4"; // dark purple
    const documentBackgroundColor = "#69696c"; // dark grey
    const overallMessage = `This ${chunkDetailsMO.isShow ? "region" : "document"} has ${
      chunkDetailsMO.isShow ? chunkDetailsMO.data.contentWordCount : chunkListMO.contentWordCount
    } eligible words.`;

    return (
      <div
        className="diagnosis-container"
        style={{
          ...{
            backgroundColor: chunkDetailsMO.isShow ? regionBackgroundColor : documentBackgroundColor
          },

          color: "white"
        }}
      >
        <div className="diagnosis-container-top">
          <div className="diagnosis-header">
            {chunkDetailsMO.isShow ? (
              <img src={RegionIcon} className="diagnosis-icon" width="40px" height="40px"></img>
            ) : (
              <img src={DocumentIcon} className="diagnosis-icon" width="40px" height="40px"></img>
            )}
            {/* <DocumentIcon className="diagnosis-icon" width="40px" height="40px" /> */}
            FIT & TRIM
          </div>
          <div className={"diagnosis-icon-container"}>
            {chunkDetailsMO.isShow ? (
              <IconButton
                iconProps={{
                  iconName: "ChromeClose",
                  styles: { root: { color: "white" } }
                }}
                onClick={this.closeButtonHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="diagnosis-container-footer">{overallMessage} </div>
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
  setWordTypeScoreMO: wordTypeScoreMO => {
    dispatch({
      type: types.SET_SCORE,
      wordTypeScoreMO: wordTypeScoreMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO }) => ({ chunkDetailsMO, chunkListMO });

export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);
