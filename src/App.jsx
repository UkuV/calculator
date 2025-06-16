import React, { useState } from "react";
import Calculator from "./components/Calculator";
import Paper from "@mui/material/Paper";
import Currency from "./components/Currency";
import "./css/App.css";

function App() {
  const [calcMode, setCalcMode] = useState(true);
  const [fade, setFade] = useState(true);
  const handleModeSwitch = (mode) => {
    if (mode !== calcMode) {
      setFade(false);
      setTimeout(() => {
        setCalcMode(mode);
        setFade(true);
      }, 200);
    }
  };
  return (
    <div className="app-root">
      <Paper
        elevation={14}
        sx={{
          width: "390px",
          height: "844px",
          borderRadius: "40px",
          background: "rgba(243, 238, 238, 0.1)",
          flexDirection: "column",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <div className="app-switcher">
          <button
            onClick={() => handleModeSwitch(true)}
            className={`app-switch-btn${calcMode ? " active" : ""}`}
          >
            Calculator
          </button>
          <span className="app-switch-separator">|</span>
          <button
            onClick={() => handleModeSwitch(false)}
            className={`app-switch-btn${!calcMode ? " active" : ""}`}
          >
            Exchange Rate
          </button>
        </div>
        <div className={`app-content${fade ? " fade-in" : " fade-out"}`}>
          {calcMode ? <Calculator /> : <Currency />}
        </div>
      </Paper>
    </div>
  );
}

export default App;
