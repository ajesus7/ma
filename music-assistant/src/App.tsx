import "./App.css";

function App() {
  return (
    <>
      <div className="content-container">
        <ul className="staff">
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
          <li className="line"></li>
        </ul>
      </div>
      <svg className="icon">
        <use href="/user-icons.svg#icon-treble-clef" />
      </svg>
    </>
  );
}

export default App;
