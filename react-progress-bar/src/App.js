import "./styles.css";
import ProgressBar from "./components/progressBar.js";
import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
  }, []);

  return (
    <div className="app">
      <span>progress bar</span>
      <ProgressBar value={value} />
    </div>
  );
}
