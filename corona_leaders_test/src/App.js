import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [get, setGet] = useState("hey from client");
  useEffect(() => {
    const getFromServer = async () => {
      const res = await fetch("http://127.0.0.1:8000/covid/");
      const data = await res.json();
      console.log(data);
      // setGet(data);
    };
    getFromServer();
  }, []);
  return (
    <div className="App">
      <h1>{get}</h1>
    </div>
  );
}

export default App;
