import React from "react";
import { useState } from "react";
import Terminal from "./terminal/Terminal.jsx";
import Terrain from "./components/Terrain.jsx";
import NoteEntry from "./components/NoteEntry.jsx";
import SeeMore from "./components/SeeMore.jsx";
import Spacer from "./components/Spacer.jsx";

import "./app.css";

import projects from "./data/projects.json";
import notes from "./data/notes.json";

function Home() {
  const [terminalOpen, setTerminalOpen] = useState(true);
  return (
    <>
      <div id="mainPage">
        <Spacer height={100} />
        <div id="mainTitleContainer">
          <h1 id="mainTitle" className="mainTitle">
            Hi, I'm Nolan
          </h1>
        </div>
        <div id="terminalContainer">
          {terminalOpen ? <Terminal id="mainPageTerminal"></Terminal> : null}
          <button
            id="noTerminal"
            onClick={() => setTerminalOpen(!terminalOpen)}
          >
            {terminalOpen ? "⏶ Hide the terminal" : "⏷ Show the terminal"}
          </button>
        </div>
        <div id="infoContainer">
          <h2 id="infoTitle" className="sectionTitle">
            Info
          </h2>
          <p id="educationInfo">
            I'm a computer science student at the University of Waterloo,
            working at{" "}
            <a
              href="https://www.linkedin.com/company/kennacommunications/"
              target="_blank"
              className="inTextLink"
            >
              Kenna
            </a>{" "}
            working as an Application Developer
          </p>
          <p id="trampolineInfo">
            I am also a trampoline gymnast on{" "}
            <a
              href="https://www.gymnastics.sport/site/athletes/bio_detail.php?id=41128&type=licence"
              target="_blank"
              className="inTextLink"
            >
              Team Canada
            </a>
          </p>
          <div id="socialIcons">
            <a href="./documents/pdf/Nolan_Zurek_Resume.pdf">
              <img src={"./images/linkIcons/resume.png"} width={35}></img>
            </a>
            <a
              href="mailto:nolanzurek@gmail.com"
              onClick={() => {
                navigator.clipboard.writeText("nolanzurek@gmail.com");
              }}
            >
              <img src={"./images/linkIcons/email.png"} width={35}></img>
            </a>
            <a href="https://github.com/nolanzurek" target="_blank">
              <img src={"./images/linkIcons/github.png"} width={35}></img>
            </a>
            <a
              href="https://www.linkedin.com/in/nolan-zurek-a00471b0/"
              target="_blank"
            >
              <img src={"./images/linkIcons/linkedin.png"} width={35}></img>
            </a>
          </div>
        </div>
        <div id="projectsContainer">
          <h2 id="projectsTitle" className="sectionTitle">
            Projects
          </h2>
          <div id="projectEntries">
            {projects.slice(0, 2).map((project, i) => (
              <NoteEntry {...project} key={i} />
            ))}
          </div>
          <div id="projectsSeeMore">
            <SeeMore link="/projects" extraText="Projects"></SeeMore>
          </div>
        </div>
        <div id="notesContainer">
          <h2 id="notesTitle" className="sectionTitle">
            Notes
          </h2>
          <div id="noteEntries">
            {notes.slice(0, 4).map((note, i) => (
              <NoteEntry {...note} key={i} />
            ))}
          </div>
          <div id="notesSeeMore">
            <SeeMore link="/notes" extraText="Notes"></SeeMore>{" "}
          </div>
        </div>
      </div>
      <div id="terrainContainer">
        <Terrain width={window.innerWidth}></Terrain>
      </div>
    </>
  );
}

export default Home;
