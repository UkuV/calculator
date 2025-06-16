import { BackIcon } from "../icons/back";
import { Key } from "../types/key";
import Keypad from "./Keypad";
import { CurrencyRates } from "../types/currency";
import { useEffect, useState } from "react";
import "../css/Currency.css";
import { ReloadIcon } from "../icons/reload";
import Button from "@mui/material/Button";

const getExRate = async () => {
  try {
    const response = await fetch("/api/rates");
    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    const data: CurrencyRates = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};

const NumberField = ({ value, color }: { value: string | number | null; color?: string }) => {
  return <p style={{ margin: 0, fontSize: "30px", color }}>{value}</p>;
};

function getTimeAgo(date: Date | null): string {
  if (!date) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin === 1) return "1 min ago";
  return `${diffMin} min ago`;
}

const RefreshExRates = ({
  onRefresh,
  lastRefresh,
}: {
  onRefresh: () => void;
  lastRefresh: Date | null;
}) => {
  // Refresh Last Updated text every minute
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000); // 60,000 ms = 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Button onClick={onRefresh} className="refresh-button" sx={{ color: "black" }}>
      Last Updated {getTimeAgo(lastRefresh)} <ReloadIcon />
    </Button>
  );
};

const Currency = () => {
  const currencyKeys: Key[] = [
    { label: "C", value: "clear", color: "#E94747" },
    { label: <BackIcon />, value: "backspace" },
    { label: "", value: "" },
    { label: "", value: "" },

    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "", value: "" },

    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "", value: "" },

    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "", value: "" },

    { label: "00", value: "00" },
    { label: "0", value: "0" },
    { label: ".", value: "." },
    { label: "", value: "" },
  ];
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<number | null>(null);
  const [exRates, setExRates] = useState<CurrencyRates | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [multiplier, setMultiplier] = useState<number>(0);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  console.log("from", fromCurrency);

  const fetchExRates = async () => {
    const exData = await getExRate();
    if (!exData) {
      return;
    }

    setExRates(exData);
    setLastRefresh(new Date());
  };

  useEffect(() => {
    fetchExRates();
  }, []);

  const calculateOutput = (inputValue: string, multiplierValue: number) => {
    if (!inputValue || isNaN(Number(inputValue)) || multiplierValue <= 0) {
      return null;
    }
    setOutput(Number(inputValue) * multiplierValue);
  };

  useEffect(() => {
    calculateOutput(input, multiplier);
  }, [input, toCurrency]);

  const currencyCodes = exRates ? Object.keys(exRates) : [];
  const toCurrencyCodes =
    exRates && fromCurrency && exRates[fromCurrency] ? Object.keys(exRates[fromCurrency]) : [];

  const handleKeyClick = async (value: string) => {
    if (value === "") return;

    if (value === "clear") {
      if (input === "") return;
      setInput("");
      setOutput(null);
      return;
    }
    if (value === "backspace") {
      if (input === "") return;
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    setInput((prev) => prev + value);
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
      <div className="currency-container">
        {exRates ? (
          <>
            <div className="currency-header">
              <select
                className="currency-select"
                value={fromCurrency || ""}
                onChange={(e) => {
                  setFromCurrency(e.target.value);
                  setToCurrency("");
                  setMultiplier(0);
                }}
              >
                <option value="" disabled>
                  Select currency
                </option>
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              {NumberField({ value: input, color: "#316BFF" })}
            </div>
            <div className="currency-header">
              <select
                className="currency-select"
                value={toCurrency || ""}
                onChange={(e) => {
                  const selected = e.target.value;
                  setToCurrency(selected);
                  if (exRates && fromCurrency && selected) {
                    setMultiplier(exRates[fromCurrency][selected]);
                  } else {
                    setMultiplier(0);
                  }
                }}
              >
                <option value="" disabled>
                  Select currency
                </option>
                {toCurrencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              {NumberField({ value: output !== null ? output.toFixed(2) : "" })}
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </div>
      <div className="refresh-container">
        {RefreshExRates({
          onRefresh: fetchExRates,
          lastRefresh: lastRefresh,
        })}
      </div>

      <Keypad keys={currencyKeys} onClick={handleKeyClick} />
    </>
  );
};

export default Currency;
