import * as React from "react";
import { connect } from "react-redux";
// import * as underscore from 'underscore'
import { Panel, PanelType, Link, Icon } from "office-ui-fabric-react";
// import { Config, Settings } from '../config'
import { Config } from "../../constants/config";
import "./InfoPane.css";
import { types } from "../../constants/types";

export interface AppProps {
  //
  isShowInfoPane;
  setHideInfoPane;
  setShowFirstRun;
  setShowIntro;
}

export interface AppState {
  //
}

class InfoPane extends React.Component<any, any> {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  private onRenderFooterContent = () => {
    return (
      <div>
        <p className="build-number ms-fontWeight-light ms-font-s">Build {Config.base.buildNumber}</p>
      </div>
    );
  };

  render() {
    // const { showFirstRun } = this.props;
    const { isShowInfoPane, setHideInfoPane, setShowIntro } = this.props;
    const panel = (
      <Panel
        isOpen={isShowInfoPane}
        // isOpen={this.props.isOpen}
        // isFooterAtBottom={true}
        type={PanelType.smallFixedNear}
        hasCloseButton={true}
        onDismiss={() => {
          setHideInfoPane();
        }}
        onRenderFooterContent={this.onRenderFooterContent}
        // isLightDismiss={true}
        onLightDismissClick={() => {
          // this.props.close();
          setHideInfoPane();
        }}
      >
        <div className={"info-pane-container"}>
          <div className={"info-pane-top"}>
            <div className={"info-pane-logo"}>
              <img src={"assets/wd-logo-96.png"} />
            </div>
            <h1 className={"wd-themed-header"}>The Writer’s Diet</h1>
          </div>
          <div className={"info-pane-rest"}>
            {/* <Link onClick={showFirstRun}>Show Intro</Link> */}
            <Link
              onClick={() => {
                setShowIntro();
              }}
            >
              Show Intro
            </Link>
            <br />
            <Link
              onClick={() => {
                window.open("http://writersdiet.com");
              }}
            >
              Website <Icon iconName={"NavigateExternalInline"} />{" "}
            </Link>
            <Link
              onClick={() => {
                window.open("http://writersdiet.com/privacy");
              }}
            >
              Privacy Policy <Icon iconName={"NavigateExternalInline"} />
            </Link>
          </div>
        </div>
      </Panel>
    );

    return panel;
  }
}

const mapDispatchToProps = dispatch => ({
  setHideInfoPane: () => {
    dispatch({ type: types.HIDE_INFO_PANE });
  },
  setShowIntro: () => {
    dispatch({ type: types.SHOW_INTRO });
  },
  setShowFirstRun: () => {
    dispatch({ type: types.SHOW_FIRST_RUN });
  }
});

const mapStateToProps = ({ isShowInfoPane }) => ({
  isShowInfoPane
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPane);
