import * as React from "react";
import { Checkbox } from "office-ui-fabric-react";

export interface AppProps {
  //
  label: string;
  color: string;
  score: number;
}

export interface AppState {
  //
  start: boolean;
  down: boolean;
  active: boolean;
}

export default class GraphPart extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      down: false,
      active: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, start: false });
    }, 0);
  }

  checkBoxHandler() {
    console.log("check change....");
    this.setState({ ...this.state, active: !this.state.active });
  }

  render() {
    // const { label, color, score, foo, activeMetric, setActiveMetric, metricKey } = this.props;
    const { label, color, score } = this.props;
    const { start, down } = this.state;
    // const active = metricKey === activeMetric;
    // function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    //   console.log(`The option has been changed to ${isChecked}. ${ev}`);
    // }

    const pct = (score / 5) * 100;

    // const theLabel = <span className={`graph-part-label ${active ? "graph-part-label--active" : ""}`}>{label}</span>;
    const theLabel = <span className={`graph-part-label`}>{label}</span>;

    const theBar = (
      <div
        // className={`graph-part-bar ${down ? "graph-part-bar--down" : ""} ${active ? "graph-part-bar--active" : ""}`}
        className={`graph-part-bar ${down ? "graph-part-bar--down" : ""} `}
        style={{
          width: `${start ? 0 : pct}%`,
          backgroundColor: color
        }}
      ></div>
    );

    return (
      <div
        className={`graph-part graph-part--active`}
        // className={`graph-part ${active ? "graph-part--active" : ""}`}
        // onClick={() => {
        //   setActiveMetric(active ? 0 : metricKey);
        //   this.setState({ ...this.state, down: active });
        //   setTimeout(() => {
        //     this.setState({ ...this.state, down: false });
        //   }, 100);
        // }}
      >
        {/* <Checkbox checked={active} /> */}
        <Checkbox />
        {theLabel}
        {theBar}
      </div>
    );
  }
}
