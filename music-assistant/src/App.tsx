import "./App.css";

function App() {
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
        >
          <p></p>
        </div>
      );
    }
    return notes;
  };

  generateNotes();

  return (
    <>
      <div className="content-container">
        <ul id="staff">
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
          {generateNotes()}
        </ul>
      </div>
      <svg className="icon">
        <use href="/user-icons.svg#icon-treble-clef" />
      </svg>
    </>
  );
}

export default App;
