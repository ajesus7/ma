import { useEffect, useState } from "react";
import "./App.css";
import * as Tone from "tone";

/**
   * 
   * The generateStaffList function creates a 2-dimensional array structure.
   * This array consists of 13 rows, and each row contains 13 elements.
   * Each element within a row is an array holding the string "0".
   * This function is useful when you need to initialize a grid-like data structure with a predefined value.

   */
const generateStaffList = (): Array<Array<Array<string>>> => {
  let list = new Array<Array<Array<string>>>();

  for (let y = 0; y < 13; y++) {
    let row = new Array<Array<string>>();
    for (let x = 0; x < 13; x++) {
      row.push(["0", "4n", "holder"]);
    }
    list.push(row);
  }

  return list;
};

function App() {
  const [staffList, setStaffList] = useState(generateStaffList);

  // Initialize the staffList state when the component mounts
  useEffect(() => {
    const initialStaffList = generateStaffList();
    setStaffList(initialStaffList);
  }, []);

  const playTone = (note: number, interval: string) => {
    console.log("tone played: ", note, " : ", convertNumToPitchLetter(note));
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(convertNumToPitchLetter(note), interval);
  };

  const convertNumToPitchLetter = (y: number): string => {
    const yPosToNote = [
      "F5",
      "E5",
      "D5",
      "C5",
      "B4",
      "A4",
      "G4",
      "F4",
      "E4",
      "D4",
      "C4",
      "B3",
      "A3",
    ];

    // Map the noteLetter to the corresponding note name
    const noteName = yPosToNote[y];

    // Concatenate the note name with the octave number
    const fullNoteName = `${noteName}`;

    return fullNoteName;
  };

  const generateNotes = () => {
    const notes = [];
    for (let i = 0; i < 8; i++) {
      notes.push(
        <div
          className="note"
          key={i}
          style={{
            transform: `translate(${5 * i + 10}em, ${-1 * i}em)`,
          }}
          onClick={() => playTone(i + 37, "4n")}
        >
          <p></p>
        </div>
      );
    }
    return notes;
  };

  /**
   * 1. first grabs all elements that have .invisible or .visible
   *      so, on first toggle, will only have a list of invisible elements.
   *      on second toggle, will only have a list of visible elements.
   *
   * 2. toggles visibility:
   *     .invisible -> .visible (makes element appear);
   *     .visible -> .invisible (makes element disappear)
   */
  // *
  const lightsOn = () => {
    const elements = document.querySelectorAll(".invisible, .visible");

    elements.forEach((element) => {
      if (element.classList.contains("invisible")) {
        element.classList.remove("invisible");
        element.classList.add("visible");
      } else {
        element.classList.add("invisible");
        element.classList.remove("visible");
      }
    });
  };

  const hideNotes = () => {
    const elements = document.querySelectorAll(".dot, .dot-invisible");

    elements.forEach((element) => {
      if (element.classList.contains("dot-invisible")) {
        element.classList.remove("dot-invisible");
        element.classList.add("dot");
      } else {
        element.classList.add("dot-invisible");
        element.classList.remove("dot");
      }
    });
  };

  const generateDots = () => {
    const dots = [];
    let horizontalLineClassName = "horizontal-line invisible ";
    let dotVisibility = "dot invisible ";
    // let verticalLineClassName = "vertical-line invisible ";

    for (let y = 0; y < 13; y++) {
      for (let x = 0; x < 13; x++) {
        // render the main 5 lines
        if (y % 2 == 0 && y > 1 && y < 11) {
          console.log("y div by 2 ", y);
          horizontalLineClassName = "horizontal-line";
          dotVisibility = "dot";

          // hide the 2 left-most columns of note positions
          if (x < 2) {
            dotVisibility = "dot invisible";
          }
        }

        // half notes and one ledger line above and below staff
        if (!(y % 2 == 0 && y > 1 && y < 11)) {
          horizontalLineClassName = "horizontal-line invisible secondary-line";
          dotVisibility = "dot invisible secondary-dot";
        }

        // const currentPosition = determinePosition(x, y);

        dots.push(
          <div key={`${x}-${y}`} className="square">
            {/* First conditional block for the "note" */}
            {staffList[y][x][2] === "note" && (
              <div
                className="note"
                onClick={() =>
                  playTone(parseInt(staffList[y][x][0]), staffList[y][x][1])
                }
              ></div>
            )}
            {/* Horizontal line */}
            <div className={horizontalLineClassName}></div>
            {/* Second conditional block for the "holder" */}
            {staffList[y][x][2] === "holder" && (
              <div
                className={dotVisibility}
                onClick={() => playTone(y, staffList[y][x][1])}
              ></div>
            )}
            {/* <div className={verticalLineClassName}></div> */}
          </div>
        );
      }
    }
    return dots;
  };

  // const determinePosition = (x: number, y: number): Array<string> => {
  //   const note = y.toString;
  //   return [note, "4n", "note"];
  // };

  generateNotes();

  return (
    <>
      <div className="main">
        <div className="staff-hide-overflow">
          <div className="staff-container">{generateDots()}</div>
        </div>
        <div className="row">
          <button onClick={lightsOn}>Show All Lines</button>
          <button onClick={hideNotes}>Hide Notes</button>
        </div>
        <svg viewBox="0 0 44.19 125" className="icon">
          <use href="/user-icons.svg#icon-treble-clef" />
        </svg>
      </div>
    </>
  );
}

export default App;
