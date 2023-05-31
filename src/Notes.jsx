import React from "react";
import { useEffect } from "react";

import "./app.css";

import notes from "./data/notes.json";
import Spacer from "./components/Spacer.jsx";
import NoteEntry from "./components/NoteEntry";

function Notes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div id="mainPage">
        <Spacer height={50} />
        <div id="mainTitleContainer">
          <h1 id="mainTitle" className="mainTitle">
            Notes
          </h1>
        </div>

        <div id="notesContainer">
          <div id="noteEntries">
            {notes.map((note, i) => (
              <NoteEntry {...note} key={i} />
            ))}
          </div>
        </div>
        <Spacer height={100} />
      </div>
    </>
  );
}

export default Notes;
