import * as React from "react";
// import * as underscore from "./node_modules/underscore";
// import { IconButton } from "office-ui-fabric-react";

// import * as Utils from "../utils";
// import { Config } from "../config";
// import { Collapsable } from "../collapsable/collapsable";

import "./Diagnosis.css";

// import RegionIcon from "../../../assets/regionicon.svg";
// import DocumentIcon from "../../../assets/documenticon.svg";

// import DocumentIcon from "../../../../assets/documenticon.svg";
// const DocumentIcon = require("../../../../assets/documenticon.svg");

export interface AppProps {
  //
}

export interface AppState {
  //
}

export default class Diagnosis extends React.Component<AppProps, AppState> {
  render() {
    return <div>------</div>;
  }

  // getRatingLabel = (scoreData, activeMetric) => {
  //   const { ratingLabelPresets } = Config.base;
  //   const { scoreLanguagePreset, scoreLanguageCustom } = this.props.settings;
  //   const { rating } = scoreData[activeMetric]; // overall score

  //   if (scoreLanguagePreset === "custom") {
  //     return scoreLanguageCustom[rating];
  //   } else {
  //     const theme =
  //       underscore.findWhere(ratingLabelPresets, {
  //         key: scoreLanguagePreset
  //       }) || ratingLabelPresets[0];
  //     const { ratings } = theme;
  //     return ratings[rating];
  //   }
  // };

  // render() {
  //   // const { documentMode, scoreData, hasCloseButton, onClose, wc, activeMetric, totalMetricWords } = this.props;

  //   const closeButton = (
  //     <IconButton
  //       iconProps={{
  //         iconName: "ChromeClose",
  //         styles: { root: { color: "white" } }
  //       }}
  //       // onClick={onClose}
  //     />
  //   );

  //   // const regionBackgroundColor = "#5f5ba4"; // dark purple
  //   // const documentBackgroundColor = "#69696c"; // dark grey

  //   // const overallMessage = `This ${documentMode ? "document" : "region"} has ${wc} eligible words.`;

  //   // what percentage of the words are e.g. ad-words?
  //   // const pct = Math.round((totalMetricWords / (wc + 0.001)) * 100);
  //   // const selectedMetricMessage = `${Utils.labelForMetric(activeMetric)}: ${pct}% of ${
  //   //   documentMode ? "document" : "region"
  //   // }`;

  //   // const diagnosisMessage = activeMetric === 0 ? overallMessage : selectedMetricMessage;
  //   const diagnosisMessage = "123----";

  //   const content = (
  //     <div
  //       className={"diagnosis-container"}
  //       style={{
  //         // ...{
  //         //   backgroundColor: documentMode ? documentBackgroundColor : regionBackgroundColor
  //         // },
  //         // ...Utils.styleForMetric("fill", activeMetric),
  //         // ...Utils.styleForMetric("stroke", activeMetric),
  //         color: "white"
  //       }}
  //     >
  //       <div
  //         className={"diagnosis-container-top"}
  //         // title={`${this.getRatingLabel(scoreData, activeMetric)} ${documentMode ? "document" : "region"}`}
  //         title={"document"}
  //       >
  //         <div className={"diagnosis-header"}>
  //           {/* {documentMode ? (
  //             <RegionIcon className={"diagnosis-icon"} width="40px" height="40px" />
  //           ) : (
  //             <DocumentIcon className={"diagnosis-icon"} width="40px" height="40px" />
  //           )} */}
  //           <DocumentIcon className={"diagnosis-icon"} width="40px" height="40px" />

  //           {/* <span>{this.getRatingLabel(scoreData, activeMetric)}</span> */}
  //           <span>{"rating"}</span>
  //         </div>

  //         {/* <div className={"diagnosis-icon-container"}>{hasCloseButton && closeButton}</div> */}
  //         <div className={"diagnosis-icon-container"}>{closeButton}</div>
  //       </div>
  //       <div className="diagnosis-container-footer">{diagnosisMessage} </div>
  //     </div>
  //   );

  //   // const renderTitle = () => {
  //   //   const captionStyle = {
  //   //     ...Utils.secondaryStyleForMetric("color", 0),
  //   //     ...Utils.styleForMetric("backgroundColor", 0),
  //   //     position: "relative",
  //   //     padding: "8px"
  //   //   };

  //   //   return (
  //   //     <div className={"diagnosis-caption"} style={captionStyle}>
  //   //       <h5 className="ms-font-s">Diagnosis</h5>
  //   //       <div className="accordion__arrow" role="presentation" />
  //   //     </div>
  //   //   );
  //   // };

  //   // const diagnosis = <Collapsable renderTitle={renderTitle}>{content}</Collapsable>;

  //   return content; /*diagnosis*/
  // }
}
