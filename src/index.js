import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import loginWithTeacher from "./loginWithTeacher";

(async () => {
  await loginWithTeacher();
  ReactDOM.render(<App />, document.getElementById("root"));
})();
