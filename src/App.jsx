import React from "react";

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
  const solvedPuzzle = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];

  let puzzle = getShuffledPuzzle();

  // Swap the positions of 0 and the last number to make it closer to the solved state
  const zeroPosition = puzzle.flat().indexOf(0);
  const lastNumber = puzzle.flat().length - 1;

  puzzle = puzzle.map((row) => row.slice());
  puzzle[Math.floor(zeroPosition / 3)][zeroPosition % 3] =
    puzzle[Math.floor(lastNumber / 3)][lastNumber % 3];
  puzzle[Math.floor(lastNumber / 3)][lastNumber % 3] = 0;

  return puzzle;
};

export default function App() {
  const [puzzle, setPuzzle] = React.useState([]);
  const [complete, setComplete] = React.useState(false);
  const [moves, setMoves] = React.useState(0);

  React.useEffect(() => {
    setPuzzle(getPuzzle());
  }, []);

  const movePiece = (x, y) => {
    if (!complete) {
      if (checkNeighbours(x, y) || checkNeighbours(x, y, 2)) {
        const emptySlot = checkNeighbours(x, y) || checkNeighbours(x, y, 2);

        const newPuzzle = puzzle.map((row) => row.slice());

        if (x === emptySlot.x && y < emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y + 1];
          newPuzzle[x][y + 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (x === emptySlot.x && y > emptySlot.y) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x][y - 1];
          newPuzzle[x][y - 1] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        if (y === emptySlot.y && x < emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x + 1][y];
          newPuzzle[x + 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        } else if (y === emptySlot.y && x > emptySlot.x) {
          newPuzzle[emptySlot.x][emptySlot.y] = puzzle[x - 1][y];
          newPuzzle[x - 1][y] = newPuzzle[x][y];
          newPuzzle[x][y] = 0;
        }

        setPuzzle(newPuzzle);
        setMoves(moves + 1);

        checkCompletion(newPuzzle);
      }
    }
  };

  const checkCompletion = (puzzle) => {
    if (flattenArray(puzzle).join("") === "123456780") {
      setComplete(true);
    }
  };

  const checkNeighbours = (x, y, d = 1) => {
    const neighbours = [];

    if (puzzle[x][y] !== 0) {
      neighbours.push(
        puzzle[x - d] && puzzle[x - d][y] === 0 && { x: x - d, y: y }
      );
      neighbours.push(puzzle[x][y + d] === 0 && { x: x, y: y + d });
      neighbours.push(
        puzzle[x + d] && puzzle[x + d][y] === 0 && { x: x + d, y: y }
      );
      neighbours.push(puzzle[x][y - d] === 0 && { x: x, y: y - d });
    }

    const emptySlot = neighbours.find((el) => typeof el === "object");

    return emptySlot;
  };

  const resetPuzzle = () => {
    setComplete(false);
    setPuzzle(getPuzzle());
    setMoves(0);
  };

  return (
    <div className="App">
      {<h3>Moves: {moves}</h3>}
      <div
        style={{
          display: "inline-block",
          backgroundColor: "oldlace",
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
                  <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {col !== 0 && col}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: complete ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            resetPuzzle();
          }}
        >
          Play Again
        </button>
      </p>
    </div>
  );
}
