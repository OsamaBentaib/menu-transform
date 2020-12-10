import React, { Fragment } from "react";
import Cursor from "./containers/Cursor";
import Menu from "./containers/Menu";
import { Context } from "./context/Context";

function App() {
  return (
    <Fragment>
      <Context>
        <main>
          <Menu />
        </main>
        <Cursor />
      </Context>
    </Fragment>
  );
}

export default App;
