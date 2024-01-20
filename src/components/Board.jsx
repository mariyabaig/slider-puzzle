import { useEffect } from "react";
import PropTypes from "prop-types";
import { flattenArray } from "../utils"; // Import the flattenArray function from a utilities file
import image1 from "../assets/image_part_001.jpg";
import image2 from "../assets/image_part_002.jpg";
import image3 from "../assets/image_part_003.jpg";
import image4 from "../assets/image_part_004.jpg";
import image5 from "../assets/image_part_005.jpg";
import image6 from "../assets/image_part_006.jpg";
import image7 from "../assets/image_part_007.jpg";
import image8 from "../assets/image_part_008.jpg";
import image10 from "../assets/image_part_010.jpg";

const Board = ({ onMove, onComplete, onReset, moves, puzzle, complete }) => {
  const getImageSource = (value) => {
    switch (value) {
      case 1:
        return image1;
      case 2:
        return image2;
      case 3:
        return image3;
      case 4:
        return image4;
      case 5:
        return image5;
      case 6:
        return image6;
      case 7:
        return image7;
      case 8:
        return image8;
      case 0:
        return image10;
      default:
        return null;
    }
  };

  const movePiece = (x, y) => {
    if (!complete) {
      const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

      if (emptySlot) {
        const newPuzzle = puzzle.map((row) => [...row]);

        newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y];
        newPuzzle[x][y] = 0;

        onMove(newPuzzle);
        checkCompletion(newPuzzle);
      }
    }
  };

  const checkNeighbours = (x, y, d = 1) => {
    const neighbours = [
      puzzle[x - d]?.[y] === 0 && { x: x - d, y },
      puzzle[x][y + d] === 0 && { x, y: y + d },
      puzzle[x + d]?.[y] === 0 && { x: x + d, y },
      puzzle[x][y - d] === 0 && { x, y: y - d },
    ];

    return neighbours.find((el) => el);
  };

  const checkCompletion = (puzzle) => {
    if (flattenArray(puzzle).join("") === "123456780") {
      onComplete();
    }
  };

  
  useEffect(() => {
    if (!puzzle.length) {
      onReset();
    }
  }, [puzzle, onReset]);

  return (
    <div className="Board">
      <h3>Moves: {moves}</h3>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "black",
          border: `5px solid ${complete ? "black" : "black"}`,
          borderRadius: 5,
          padding: 5,
        }}
      >
        {puzzle.map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
            }}
          >
            {row.map((col, j) => {
              const color = col === 0 ? "transparent" : "crimson";
              return (
                <div
                  key={`${i}-${j}`}
                  onClick={() => movePiece(i, j)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 77,
                    height: 77,
                    margin: 2,
                    backgroundColor: color,
                    borderRadius: 5,
                    cursor: complete ? "not-allowed" : "pointer",
                    userSelect: "none",
                  }}
                >
                  <img
                    src={getImageSource(col)}
                    alt={col !== 0 && col.toString()}
                    style={{ width: "100%", height: "100%", borderRadius: 5 }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            margin: "2px",
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: complete ? "not-allowed" : "pointer",
          }}
          onClick={onReset}
        >
          Play Again
        </button>
      </p>
    </div>
  );
};

Board.propTypes = {
  onMove: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  moves: PropTypes.number.isRequired,
  puzzle: PropTypes.array.isRequired,
  complete: PropTypes.bool.isRequired,
};

export default Board;
