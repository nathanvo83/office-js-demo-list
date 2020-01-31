import * as React from "react";
import { DefaultButton, PrimaryButton, ButtonType } from "office-ui-fabric-react";
import Slider from "react-slick";
import "./FirstRun.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";

import Lottie from "react-lottie";
import * as slideOneData from "./slideOne.json";

class Slide extends React.Component<any, any> {
  render() {
    const { imagePath, animationData } = this.props;

    let slideMedia = <div className={"first-run-slide-image"}></div>;
    if (animationData) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet"
        }
      };
      slideMedia = (
        <div className={"first-run-slide-lottie"}>
          <Lottie options={defaultOptions} />
        </div>
      );
    } else {
      slideMedia = <div className={"first-run-slide-image"} style={{ backgroundImage: `url(${imagePath})` }}></div>;
    }

    return (
      <div className={"first-run-slide"}>
        {slideMedia}
        <div className={"first-run-slide-content-container"}>
          <div className={"first-run-slide-content"}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default class FirstRun extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { currentSlide: 0 };
  }

  private slider;

  renderX() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      afterChange: currentSlide => {
        this.setState({ currentSlide });
      }
    };
    const { currentSlide } = this.state;

    const lastSlide = 2;

    const { onDismiss } = this.props;

    return (
      <div className={"first-run-container"}>
        123
        {currentSlide !== lastSlide && (
          <div className={"first-run-skip-link"}>
            <DefaultButton
              text="Skip"
              onClick={onDismiss}
              styles={{
                flexContainer: {
                  flexDirection: "row-reverse"
                }
              }}
              iconProps={{ iconName: "ChevronRight" }}
            />
          </div>
        )}
        {currentSlide > 0 && (
          <div className={"first-run-button-previous"}>
            <DefaultButton
              buttonType={ButtonType.icon}
              onClick={() => {
                this.slider.slickPrev();
              }}
              iconProps={{ iconName: "ChevronLeft" }}
            />
          </div>
        )}
        {currentSlide < lastSlide && (
          <div className={"first-run-button-next"}>
            <DefaultButton
              buttonType={ButtonType.icon}
              onClick={() => {
                this.slider.slickNext();
              }}
              iconProps={{ iconName: "ChevronRight" }}
            />
          </div>
        )}
        <Slider
          {...sliderSettings}
          ref={c => {
            this.slider = c;
          }}
        >
          <Slide animationData={slideOneData}>
            {/* <h3 className={'ms-font-xl'}>Lorem Ipsum</h3> */}
            <p className={"ms-fontWeight-light"}>
              The WritersDiet Test is a diagnostic tool designed to give you feedback on whether your writing is “flabby
              or fit.”
            </p>
          </Slide>
          <Slide imagePath={"https://picsum.photos/330/330/?image=410"}>
            <h3 className={"ms-font-xl"}>Lorem Ipsum</h3>
            <p className={"ms-fontWeight-light"}>
              The WritersDiet Test highlights words in each of five grammatical categories. The higher the percentage of
              highlighted words, the “flabbier” your score.
            </p>
          </Slide>
          <Slide imagePath={"https://picsum.photos/330/330/?image=510"}>
            <h3 className={"ms-font-xl"}>Lorem Ipsum</h3>
            <p className={"ms-fontWeight-light"}>
              Originally designed for academic writers, the Writer’s Diet has also proven popular with students,
              technical writers, business analysts, journalists, and even fiction writers – anyone who aspires to write
              more clearly and engagingly.
            </p>
            <div className={"first-run-get-started-container"}>
              <PrimaryButton text="Start Writing" onClick={onDismiss} />
              <PrimaryButton text="Start Writing" />
            </div>
          </Slide>
        </Slider>
      </div>
    );

    /*3
        const content = {
            0: <div>Page 1</div>,
            1: <div>Page 2</div>,
            2: <div>Page 3</div>
        }
        const { pageIndex } = this.state

        const carouselPicker = (
        <div className={'first-run-carousel-picker'}>
            <Link onClick={this.setPageIndex.apply(this,0)}>1</Link>
            <Link onClick={this.setPageIndex.apply(this,1)}>2</Link>
            <Link onClick={this.setPageIndex.apply(this,2)}>3</Link>
        </div>)

        const container = (
        <div className={'first-run-container'}>
            <div className={'first-run-carousel'}>
                { content[pageIndex] }
                { carouselPicker }
            </div>
        </div>)
        
        return container
        */
  }

  render() {
    return <div>123</div>;
  }
}
