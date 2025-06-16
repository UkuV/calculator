import { useEffect, useState } from "react";
import { BackIcon } from "../icons/back";
import { DivideIcon } from "../icons/divide";
import { MultiplyIcon } from "../icons/multiply";
import { Key } from "../types/key";
import Keypad from "./Keypad";
import { evaluate, isPrime, round } from "mathjs";
import { HistoryIcon } from "../icons/history";
import { HistoryData, History } from "../types/history";
import CalculatorInputs from "./CalculatorInputs";

const OPERATORS = ["+", "-", "×", "÷", "p"];
const getHistory = async () => {
  try {
    const response = await fetch("/api/history");
    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    const data: HistoryData = await response.json();

    return data.records;
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};

const postHistory = async (body: History) => {
  try {
    const response = await fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to post history");
    }
  } catch (error) {
    console.error("Error posting history:", error);
  }
};

const Calculator = () => {
  const calcKeys: Key[] = [
    { label: "C", value: "clear", color: "#E94747" },
    { label: <BackIcon />, value: "backspace" },
    { label: "P", value: "P", color: "#316BFF" },
    { label: <DivideIcon />, value: "÷", color: "#316BFF" },

    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: <MultiplyIcon />, value: "×", color: "#316BFF" },

    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "-", value: "-", color: "#316BFF" },

    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "+", value: "+", color: "#316BFF" },

    { label: "0", value: "0" },
    { label: ".", value: "." },
    { label: "=", value: "=", bgColor: "#6FCF97", colWidth: 2 },
  ];

  const fetchHistory = async () => {
    const historyData = await getHistory();
    if (!historyData) {
      return;
    }

    setHistory(historyData);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const [history, setHistory] = useState<History[]>([]);

  const [input, setInput] = useState<string>("");
  const [evaluated, setEvaluated] = useState<boolean>(false);

  const addToHistory = async (input: string, result: string) => {
    const newHistory: History = { input, result };
    await postHistory(newHistory);
    setHistory((prev) => [...prev, newHistory]);
  };

  function getMaxPrime(a: number, b: number): string {
    if (a > b) return "NaN";
    if (a === b) return isPrime(a) ? a.toString() : "NaN";
    for (let i = b; i >= a; i--) {
      if (isPrime(i)) return i.toString();
    }
    return "NaN";
  }

  const handleKeyClick = async (value: string) => {
    if (value === "") return;

    if (value === "clear") {
      if (input === "") return;
      setInput("");
      setEvaluated(false);
      return;
    }
    if (value === "backspace") {
      if (input === "") return;
      setInput((prev) => prev.slice(0, -1));
      setEvaluated(false);
      return;
    }

    // This allows a number to start a new input, operator continues calculation
    if (evaluated) {
      if (OPERATORS.includes(value)) {
        setInput(input + value);
        setEvaluated(false);
        return;
      } else if ("0123456789.".includes(value)) {
        setInput(value);
        setEvaluated(false);
        return;
      }
    }

    // Input validation
    if ("0123456789.".includes(value)) {
      const segments = input.split(/[\+\-\×\÷]/);
      const currentSegment = segments[segments.length - 1] || "";
      const digitCount = currentSegment.replace(/\D/g, "").length;
      // Check number length
      if (digitCount >= 10 && value !== ".") return;
      // Check for multiple decimal points in the current segment
      if (value === "." && currentSegment.includes(".")) return;
    }

    switch (value) {
      case "=":
        try {
          setEvaluated(true);
          // Prime number logic
          if (/^\s*\d+\s*P\s*\d+\s*$/i.test(input)) {
            const [a, b] = input.split("P").map((n) => parseInt(n.trim(), 10));
            const result = !Number.isNaN(a) && !Number.isNaN(b) ? getMaxPrime(a, b) : "NaN";
            setInput(result);
            await addToHistory(input, result);
            return;
          }
          // Normal calculation
          const parsedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
          const result = round(evaluate(parsedInput), 4).toString();
          if (input === result) return;
          setInput(result);
          await addToHistory(input, result);
        } catch {
          setInput("NaN");
        }
        break;
      default:
        setInput((prev) => prev + value);
        break;
    }
  };

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      switch (true) {
        case key === "Enter" || key === "=":
          handleKeyClick("=");
          break;
        case key === "Backspace":
          handleKeyClick("backspace");
          break;
        case key === "Escape" || key.toLowerCase() === "c":
          handleKeyClick("clear");
          break;
        case OPERATORS.includes(key):
          const operationMap: Record<string, string> = {
            "*": "×",
            "/": "÷",
            "+": "+",
            "-": "-",
            p: "P",
          };
          handleKeyClick(operationMap[key]);
          break;
        case /^[0-9.]$/.test(key):
          handleKeyClick(key);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <>
      <CalculatorInputs history={history} input={input} />
      <HistoryIcon sx={{ margin: "0px 0px 5px 15px", height: "30px" }} />
      <Keypad keys={calcKeys} onClick={handleKeyClick} />
    </>
  );
};
export default Calculator;
