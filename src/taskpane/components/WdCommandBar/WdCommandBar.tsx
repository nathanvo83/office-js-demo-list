import * as React from "react";
import { connect } from "react-redux";
// import * as underscore from "underscore";
import { CommandBar } from "office-ui-fabric-react";
import { types } from "../../constants/types";

// import { Config } from "../config";
// import * as Utils from "../utils";

export interface AppProps {
  //
  refreshAction;
  setShowInfoPane;
}

export interface AppState {
  //
}

class WdCommandBar extends React.Component<AppProps, AppState> {
  render() {
    const {
      refreshAction,
      // openSettingsPane,
      // activeMetric,
      setShowInfoPane
      // setCurrentChunkRelative,
      // isCurrentChunkFirst,
      // isCurrentChunkLast,
      // ready
    } = this.props;
    // const label = Utils.labelForMetric(activeMetric);
    return (
      <CommandBar
        items={[
          {
            key: "menu",
            ariaLabel: "menu",
            iconProps: { iconName: "GlobalNavButton" },
            onClick: () => {
              setShowInfoPane();
            }
          }
        ]}
        farItems={[
          {
            key: "prev",
            /*text: 'Update',*/
            iconProps: {
              iconName: "ChevronLeft"
            },
            // disabled: !ready || isCurrentChunkFirst(),
            // onClick: () => {
            //   setCurrentChunkRelative(-1);
            // },
            ariaLabel: "Previous Region"
          },
          {
            key: "next",
            /*text: 'Update',*/
            iconProps: {
              iconName: "ChevronRight"
            },
            // disabled: !ready || isCurrentChunkLast(),
            // onClick: () => {
            //   setCurrentChunkRelative(1);
            // },
            ariaLabel: "Next Region"
          },
          {
            key: "refresh",
            /*text: 'Update',*/
            iconProps: {
              iconName: "Refresh"
            },
            // disabled: !ready,
            onClick: () => {
              refreshAction();
            },
            ariaLabel: "Refresh"
          },
          {
            key: "settings",
            iconProps: {
              iconName: "Settings"
            },
            // disabled: !ready,
            /*text: 'Settings',*/
            ariaLabel: "Settings"
            // onClick: () => {
            //   openSettingsPane();
            // }
          }
        ]}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setShowInfoPane: () => {
    dispatch({ type: types.SHOW_INFO_PANE });
  }
});

const mapStateToProps = ({ isShowInfoPane }) => ({
  isShowInfoPane
});

export default connect(mapStateToProps, mapDispatchToProps)(WdCommandBar);
