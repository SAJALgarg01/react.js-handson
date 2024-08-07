import { useState } from "react";

export default function StarRating({ starCount = 4 }) {
  const [starValue, setStarValue] = useState();
  const [hoverValue, setHoverValue] = useState();
  return (
    <div className="container">
      {Array.from({ length: starCount }, (_, index) => {
        return (
          <span
            key={index}
            onClick={() => setStarValue(index)}
            className={
              (hoverValue == undefined && index <= starValue) ||
              index <= hoverValue
                ? "gold"
                : ""
            }
            onMouseEnter={() => setHoverValue(index)}
            onMouseLeave={() => setHoverValue()}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
