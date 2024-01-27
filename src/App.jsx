import React, { useState } from "react";
import Board from "./components/Board";
import { getShuffledPuzzle, isSolvable } from "./utils";
import Rules from "./components/Rules";
import ConfettiExplosion from "react-confetti-explosion";


const App = () => {
  const [puzzle, setPuzzle] = useState([])
  const [complete, setComplete] = useState(false)
  const [moves, setMoves] = useState(0)

  const getPuzzle = () => {
    let newPuzzle;
    do {
      newPuzzle = getShuffledPuzzle()
      const zeroPosition = newPuzzle.flat().indexOf(0)
      const lastNumber = newPuzzle.flat().length - 1;

      newPuzzle = newPuzzle.map((row) => row.slice())
      newPuzzle[Math.floor(zeroPosition / 3)][zeroPosition % 3] =
        newPuzzle[Math.floor(lastNumber / 3)][lastNumber % 3];
      newPuzzle[Math.floor(lastNumber / 3)][lastNumber % 3] = 0;
    } while (!isSolvable(newPuzzle))

    return newPuzzle;
  }

  const handleMove = (newPuzzle) => {
    setPuzzle(newPuzzle)
    setMoves(moves + 1)
  }

  const handleComplete = () => {
    setComplete(true)
  }

  const handleReset = () => {
    setComplete(false)
    setPuzzle(getPuzzle())
    setMoves(0)
  }

  
  const handleReshuffle = () => {
    setComplete(false)
    setPuzzle(getPuzzle())
  }

  return (
    <>
      {complete && (
        <>
          <ConfettiExplosion />
          <span className="congratulation">You did it!</span>
        </>
      )}
      <div className="App">
        <Board
          onMove={handleMove}
          onComplete={handleComplete}
          onReset={handleReset}
          moves={moves}
          puzzle={puzzle}
          complete={complete}
          onReshuffle={handleReshuffle}
        />
        <Rules />
      </div>
    </>
   )
}

export default App;
