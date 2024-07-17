import { useState, useEffect } from "react";

const ProgressBar = ({ value = 0 }) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(100, Math.max(0, value)));
  });

  return (
    <div className="progress">
      <span>{percent.toFixed()}%</span>
      <div
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
        // role="progressbar"
        // aria-valuemin={0}
        // aria-valuemax={100}
        // aria-valuenow={percent.toFixed()}
      ></div>
    </div>
  );
};
export default ProgressBar;
