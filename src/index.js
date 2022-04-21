import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));
const root = createRoot(document.getElementById("root"));
root.render(<App />);
