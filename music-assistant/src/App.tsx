import "./App.css";
import * as Tone from "tone";

function App() {
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
      console.log("y");

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

        dots.push(
          <div key={`${x}-${y}`} className="square">
            <div
              className={dotVisibility}
              onClick={() => playTone(y, "4n")}
            ></div>
            <div className={horizontalLineClassName}></div>
            {/* <div className={verticalLineClassName}></div> */}
          </div>
        );
      }
    }
    return dots;
  };

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
