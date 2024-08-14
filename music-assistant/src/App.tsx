import "./App.css";
import * as Tone from "tone";

function App() {
  const playTone = (note: number, interval: string) => {
    console.log("tone played: ", note, " : ", convertNumToPitchLetter(note));
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(convertNumToPitchLetter(note), interval);
  };

  const convertNumToPitchLetter = (num: number): string => {
    const octave = Math.floor(num / 7);
    const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
    const noteLetter = num % 7;

    // Map the noteLetter to the corresponding note name
    const noteName = noteLetters[noteLetter];

    // Concatenate the note name with the octave number
    const fullNoteName = `${noteName}${octave}`;

    console.log(
      "num ",
      num,
      " octave ",
      octave,
      " noteLetter ",
      noteLetter,
      " ",
      fullNoteName
    );
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

  const lightsOn = () => {
    const elements = document.querySelectorAll(".invisible, .visible");

    elements.forEach((element) => {
      if (element.classList.contains("invisible")) {
        element.classList.remove("invisible");
        element.classList.add("visible");
      } else {
        element.classList.add("invisible");
      }
    });
  };

  const generateDots = () => {
    const dots = [];
    let horizontalLineClassName = "horizontal-line invisible ";
    let dotVisibility = "dot invisible ";
    let verticalLineClassName = "vertical-line invisible ";

    for (let y = 0; y < 10; y++) {
      console.log("y");
      if (y === 2) {
        horizontalLineClassName = "horizontal-line";
        dotVisibility = "dot";
      }
      if (y > 6) {
        horizontalLineClassName = "horizontal-line invisible";
        dotVisibility = "dot invisible";
        verticalLineClassName = "vertical-line invisible ";
      }
      for (let x = 0; x < 10; x++) {
        dots.push(
          <div
            key={`${x}-${y}`}
            className="square"
            onClick={() => playTone(x + y, "4n")}
          >
            <div className={dotVisibility}></div>
            <div className={horizontalLineClassName}></div>
            <div className={verticalLineClassName}></div>
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
        <button onClick={lightsOn}></button>
      </div>
    </>
  );
}

export default App;
