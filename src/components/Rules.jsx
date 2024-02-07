import "../index.css";

const Rules = () => {
  return (
    <div className="container">
      <h2 className="heading">Rules of the Game</h2>
      <p className="intro">
       The objective is to rearrange the puzzle pieces to
        reach the correct order.
      </p>
      <div className="section">
        <strong className="subHeading">How to Play:</strong>
        <div className="list">
          <p>
            &#11088; Click on a puzzle piece next to the empty slot to move it.
          </p>
        </div>
        <div className="list">
          <p>
            &#11088; Continue making moves until you successfully arrange the
            numbers in ascending order.
          </p>
        </div>
        <div className="list">
          <p>
            {" "}
            &#11088; To start a new game, click the "Reshuffle" button. The
            puzzle will be shuffled, and you can begin again.
          </p>
        </div>
      </div>
      <div className="section">
        <strong className="subHeading">Rules:</strong>
        <div className="list">
          <p>
            {" "}
            &#11088;Only adjacent puzzle pieces can be moved into the empty
            slot.
          </p>
        </div>
        <div className="list">
          <p>
            &#11088; Strive to complete the puzzle in the fewest moves possible.
          </p>
        </div>
      </div>
     Have fun and enjoy the challenge!
    </div>
  );
};

export default Rules;
