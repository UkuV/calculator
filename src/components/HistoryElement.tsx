import { useRef, useEffect } from "react";
import { History } from "../types/history";
import "../css/HistoryElement.css";

const HistoryElement = ({ history }: { history: History[] }) => {
  const historyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollLeft = historyRef.current.scrollWidth;
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="history-element-container">
      <div ref={historyRef} className="history-element-scroll">
        <div className="history-element-content">
          {history.map((item, index) => (
            <p key={index} className="history-element-item">{`${item.input}=${item.result}`}</p>
          ))}
        </div>
      </div>
      {/* Fade overlay left */}
      <div className="history-element-fade" />
    </div>
  );
};

export default HistoryElement;
