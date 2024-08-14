import { useState, useEffect, useRef } from "react";

const GRID_SIZE = 6;

const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return [x, y];
};

export default SnakeGame = () => {
  const [snakeBody, setSnakeBody] = useState([
    [1, 0],
    [0, 0],
  ]);

  const directionRef = useRef([1, 0]);
  const foodRef = useRef(generateFood());
  // console.log(foodRef);

  const isSnakeBodyDiv = (y, x) => {
    return snakeBody.some(([row, col]) => {
      return y === row && x === col;
    });
  };

  let count = 0;

  useEffect(() => {
    const id = setInterval(async () => {
      setSnakeBody((snakeBody) => {
        const header = [
          snakeBody[0][0] + directionRef.current[0],
          snakeBody[0][1] + directionRef.current[1],
        ];
        // console.log(header);

        if (
          header[0] < 0 ||
          header[0] >= GRID_SIZE ||
          header[1] < 0 ||
          header[1] >= GRID_SIZE ||
          snakeBody.some(([x, y]) => {
            return header[0] == x && header[1] == y;
          })
        ) {
          return [
            [1, 0],
            [0, 0],
          ];
        }
        let copySnakeBody = snakeBody.slice();

        if (
          header[0] === foodRef.current[0] &&
          header[1] === foodRef.current[1]
        ) {
          const updateFood = async () => {
            let newFoodPosition;

            do {
              newFoodPosition = await generateFood();
            } while (
              snakeBody.some(([x, y]) => {
                return newFoodPosition[0] === x && newFoodPosition[1] === y;
              })
            );

            foodRef.current = newFoodPosition;
          };

          async function handleFoodUpdate() {
            await updateFood();
          }

          handleFoodUpdate();
          copySnakeBody.unshift(header);
        } else {
          // console.log(copySnakeBody);
          copySnakeBody.unshift(header);
          copySnakeBody.pop();
        }

        // copySnakeBody.unshift(header);

        return copySnakeBody;
      });
    }, 700);

    const handleDirection = (e) => {
      const key = e.code;

      switch (key) {
        case "ArrowUp":
          if (directionRef.current[0] != 1) directionRef.current = [-1, 0];
          break;
        case "ArrowDown":
          if (directionRef.current[0] != -1) directionRef.current = [1, 0];
          break;
        case "ArrowLeft":
          if (directionRef.current[1] != 1) directionRef.current = [0, -1];
          break;
        case "ArrowRight":
          if (directionRef.current[1] != -1) directionRef.current = [0, 1];
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);

  return (
    <div
      className="container"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE},1fr)` }}
    >
      {GAMEGRID.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <div
              key={(y, x)}
              className={` ${isSnakeBodyDiv(y, x) ? "snake" : ""}
              ${
                foodRef.current[0] == y && foodRef.current[1] == x ? "food" : ""
              }`}
            ></div>
          );
        });
      })}
    </div>
  );
};
