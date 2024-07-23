export default Board = ({ board, size, handleClick }) => {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size},50px)` }}
    >
      {board.map((row, rowNo) => {
        return row.map((cell, colNo) => {
          return (
            <div
              key={(rowNo, colNo)}
              onClick={() => {
                handleClick(rowNo, colNo);
              }}
              className="cell"
            >
              {cell}
            </div>
          );
        });
      })}
    </div>
  );
};
