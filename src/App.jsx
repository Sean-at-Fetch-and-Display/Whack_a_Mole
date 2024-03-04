import { useEffect, useState } from "react";
import "./App.css";
import holeImg from "./assets/hole.png";
import moleImg from "./assets/mole.png";
//import hammerImg from "./assets/hammerEdit.png";

function App() {
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [cursorToggle, setCursorToggle] = useState(false);

  function whackMole(e) {
    if (!moles[e.target.id]) return;
    const id = e.target.id;
    hideMole(id);
    setScore(score + 1);
  }

  function hideMole(id) {
    const newMoles = [...moles];
    newMoles[id] = false;
    setMoles(newMoles);
  }

  function showMole(id) {
    const newMoles = [...moles];
    newMoles[id] = true;
    setMoles(newMoles);
  }

  useEffect(() => {
    let interval = null;
    if (startGame) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        showMole(randomIndex);
        setTimeout(() => {
          hideMole(randomIndex);
        }, 800);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [startGame, moles]);

  function start() {
    setStartGame(true);
    console.log("Start Whack-A-Mole!");
  }

  function finish() {
    const newMoles = [...moles];
    setMoles(newMoles.fill(false));
    setStartGame(false);
    setScore(0);
    console.log("Game finished.");
  }

  /*---------------------------------------------------------------------------------------*/

  /*const mouseCursor = document.querySelector(".cursor");*/

  function down(e) {
    console.log(e.view.onClick);
    console.log(cursorToggle);
    setCursorToggle(true);
  }

  function up() {
    console.log(cursorToggle);
    setCursorToggle(false);
  }

  return (
    <>
      <div className="container">
        <div className="cursor cursor_click"></div>

        <div className="cursorV2"></div>
        <div className="cursor rounded"></div>
        <div className="cursor pointed"></div>

        <h1 className="header_font"> Whack-A-Mole!</h1>

        <div className="outer_mole_grid">
          <div
            className="mole_grid"
            id={cursorToggle ? "cursor_click" : "cursor"}
            onMouseDown={down}
            onMouseUp={up}
          >
            {moles.map((isMole, index) => (
              <img
                src={isMole ? moleImg : holeImg}
                className="hole"
                key={index}
                id={index}
                onClick={whackMole}
              />
            ))}
          </div>
        </div>
        <div className="control_panel">
          <button onClick={start}> Start Game</button>
          <div className="score_board"> Score: {score}</div>
          <button onClick={finish}> Finish Game</button>
        </div>
      </div>
    </>
  );
}

export default App;
