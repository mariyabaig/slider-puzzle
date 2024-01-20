import React, { useEffect, useState } from "react";
import image1 from "./assets/image_part_001.jpg";
import image2 from "./assets/image_part_002.jpg";
import image3 from "./assets/image_part_003.jpg";
import image4 from "./assets/image_part_004.jpg";
import image5 from "./assets/image_part_005.jpg";
import image6 from "./assets/image_part_006.jpg";
import image7 from "./assets/image_part_007.jpg";
import image8 from "./assets/image_part_008.jpg";
import image9 from "./assets/image_part_009.jpg";

import image10 from "./assets/image_part_010.jpg";

const getShuffledPuzzle = () => {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const rowOne = [],
    rowTwo = [],
    rowThree = [];

  while (values.length) {
    const random = Math.floor(Math.random() * values.length);

    if (rowOne.length < 3) {
      rowOne.push(values.splice(random, 1)[0]);
    } else if (rowTwo.length < 3) {
      rowTwo.push(values.splice(random, 1)[0]);
    } else {
      rowThree.push(values.splice(random, 1)[0]);
    }
  }

  return [rowOne, rowTwo, rowThree];
};

const flattenArray = (arr) => {
  return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};

const getInversionsCount = (arr) => {
  arr = flattenArray(arr).filter((n) => n !== 0);

  const inversions = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const currentValue = arr[i];
    const currentInversions = arr.filter(
      (val, j) => i < j && val < currentValue
    );
    inversions.push(currentInversions.length);
  }

  const inversionsCount = inversions.reduce((total, val) => total + val, 0);

  return inversionsCount;
};

const isSolvable = (puzzle) => {
  return getInversionsCount(puzzle) % 2 === 0;
};

const getPuzzle = () => {
  let puzzle;
  do {
    puzzle = getShuffledPuzzle();

    // Swap the positions of 0 and the last number to make it closer to the solved state
    const zeroPosition = puzzle.flat().indexOf(0);
    const lastNumber = puzzle.flat().length - 1;

    puzzle = puzzle.map((row) => row.slice());
    puzzle[Math.floor(zeroPosition / 3)][zeroPosition % 3] =
      puzzle[Math.floor(lastNumber / 3)][lastNumber % 3];
    puzzle[Math.floor(lastNumber / 3)][lastNumber % 3] = 0;
  } while (!isSolvable(puzzle));

  return puzzle;
};


const App = () => {
  const [puzzle, setPuzzle] = useState([]);
  const [complete, setComplete] = useState(false);
  const [moves, setMoves] = useState(0);
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



  useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  const movePiece = (x, y) => {
    if (!complete) {
      const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

      if (emptySlot) {
        const newPuzzle = puzzle.map((row) => [...row]);

        newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y];
        newPuzzle[x][y] = 0;

        setPuzzle(newPuzzle);
        setMoves(moves + 1);

        checkCompletion(newPuzzle);
      }
    }
  };

  const solvePuzzle = () => {
    // Implement the solving algorithm here
    // You can use A* algorithm or any other suitable algorithm
    // For simplicity, let's assume a dummy solution here
    const solvedPuzzle = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ];

    setPuzzle(solvedPuzzle);
    setComplete(true);
  };

  const checkCompletion = (puzzle) => {
    if (flattenArray(puzzle).join("") === "123456780") {
      setComplete(true);
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

  const resetPuzzle = () => {
    setComplete(false);
    setPuzzle(getPuzzle());
    setMoves(0);
  };

  return (
    <div className="App">
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
          onClick={() => resetPuzzle()}
        >
          Play Again
        </button>
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
            marginRight: "10px",
          }}
          onClick={() => solvePuzzle()}
        >
          Solve Yourself
        </button>
      </p>
    </div>
  );
};

export default App;
