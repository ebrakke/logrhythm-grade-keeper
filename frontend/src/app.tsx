import React, { Component } from "react";

import Navbar from "./navbar";
import Students from "./students";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Students />
      </div>
    );
  }
}

export default App;
