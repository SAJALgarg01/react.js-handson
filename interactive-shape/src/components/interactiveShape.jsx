import { useState, useRef, useEffect } from "react";

export default function interactiveShape() {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  );

  const queue = useRef([]);
  const timeId = useRef([]);
  // console.log(queue);

  const handleClick = (rowIdx, colIdx, flag) => {
    if (timeId.current.length > 0 && flag) return;
    if (grid[rowIdx][colIdx] && flag) return;
    setGrid((prevGrid) => {
      const gridDeepcopy = prevGrid.map((row) => [...row]);
      // const gridShallowcopy = [...grid];
      gridDeepcopy[rowIdx][colIdx] = flag;
      if (flag) queue.current.unshift([rowIdx, colIdx]);
      return gridDeepcopy;
    });
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], idx) => {
        timeId.current[idx] = setTimeout(() => {
          handleClick(rowIdx, colIdx, false);
          if (timeId.current.length - 1 === idx) timeId.current = [];
        }, 1000 * (idx + 1));
      });
      queue.current = [];
    }
  }, [grid]);

  useEffect(() => {
    return () => {
      timeId.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  const handleContainerClick = (event) => {
    const target = event.target;
    console.log(event);

    if (target.classList.contains("cell_")) {
      // Extract the cell's coordinates from the data attributes
      const [rowIdx, colIdx] = target.dataset.index.split(",").map(Number);
      handleClick(rowIdx, colIdx, true);
    }
  };

  return (
    <div className="container" onClick={handleContainerClick}>
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div
              className={`cell_ ${cell ? "active" : ""}`}
              key={`${rowIdx}, ${colIdx}`}
              // onClick={() => handleClick(rowIdx, colIdx, true)}
              data-index={`${rowIdx},${colIdx}`}
            ></div>
          );
        });
      })}
    </div>
  );
}
