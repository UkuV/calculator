import { useEffect, useRef } from "react";
import { History } from "../types/history";
import HistoryElement from "./HistoryElement";
import "../css/CalculatorInputs.css";

const CalculatorInputs = ({ history, input }: { history: History[]; input: any }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);
  return (
    <>
      <HistoryElement history={history} />
      <div ref={inputRef} className="calculator-inputs-container">
        <p className="calculator-inputs-value">{input}</p>
      </div>
    </>
  );
};

export default CalculatorInputs;
