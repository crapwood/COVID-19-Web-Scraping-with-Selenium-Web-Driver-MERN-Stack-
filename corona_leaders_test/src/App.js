import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import CovidIsrael from "./components/CovidIsrael";
import CovidWorld from "./components/CovidWorld";

function App() {
  return (
    <div className="App">
      <CovidIsrael />
      <CovidWorld />
    </div>
  );
}

export default App;
