import * as React from "react";
import "./Chunk.css";

export interface AppProps {
  //
  title: string;
}

export interface AppState {
  //
}

class Chunk extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }

  render() {
    return (
      <>
        <div className="chunk">{this.props.title.trim()}</div>
      </>
    );
  }
}

export default Chunk;
