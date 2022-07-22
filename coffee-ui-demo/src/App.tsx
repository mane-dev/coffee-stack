import React from "react";
import * as ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";

const App = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
