
import "../index.css"

const Rules = () => {
  return (
    <div className="container">
      <h2 className="heading">Rules of the Game</h2>
      <p className="intro">
        Welcome to the Puzzle Game! The objective is to rearrange the puzzle
        pieces to reach the correct order.
      </p>
      <div className="section">
        <strong className="subHeading">How to Play:</strong>
        <ol className="list">
          <li>Click on a puzzle piece next to the empty slot to move it.</li>
          <li>
            Continue making moves until you successfully arrange the numbers in
            ascending order.
          </li>
          <li>
            To start a new game, click the "Reshuffle" button. The puzzle will
            be shuffled, and you can begin again.
          </li>
        </ol>
      </div>
      <div className="section">
        <strong className="subHeading">Rules:</strong>
        <ul className="list">
          <li>Only adjacent puzzle pieces can be moved into the empty slot.</li>
          <li>Strive to complete the puzzle in the fewest moves possible.</li>
        </ul>
      </div>
      <p className="footer">Have fun and enjoy the challenge!</p>
    </div>
  )
}

export default Rules;
