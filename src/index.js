import { render } from "react-dom";
import App from "./App";
import React from "react";
import Scroll from "react-scroll";

var Element = Scroll.Element;
const styles = {
  marginleft: "25%",
  marginright: "15%"
};
class Section extends React.Component {
  render() {
    return (
      <div style={styles}>
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "500px",
            overflow: "scroll",
            marginBottom: "100px",
            marginTop: "8%"
          }}
        >
          <App />
        </Element>
      </div>
    );
  }
}

render(<Section />, document.getElementById("root"));
