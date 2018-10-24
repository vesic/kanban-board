import React from "react";
import Board from "./Board";
import Navbar from "./Navbar";

const App = () => (
  <React.Fragment>
    <Navbar />
    <div style={style()}>
      <Board />
    </div>
  </React.Fragment>
);

const style = () => ({
  padding: "30px",
  paddingTop: "35px"
});

export default App;
