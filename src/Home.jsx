import React from "react";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
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
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  return (
    <>
      <div id="mainPage">
        <Spacer height={100} />

        <div
          id="mainTitleContainer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 id="mainTitle" className="mainTitle">
            Hi, I'm Nolan
          </h1>
          <button id="themeToggle">
            <img
              id="themeToggleImg"
              src={
                theme == "dark"
                  ? "./images/Lightmode.png"
                  : "./images/Darkmode.png"
              }
              width={35}
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            ></img>
          </button>
        </div>
        <div id="terminalContainer">
          {terminalOpen ? (
            <Terminal id="mainPageTerminal" setTheme={setTheme}></Terminal>
          ) : null}
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
            I study computer science and math at the University of Alberta.
            Right now, I'm a Tech Lead at the{" "}
            <a
              href="https://uofa.indyrioters.com/"
              target="_blank"
              className="inTextLink"
            >
              University of Alberta Innovation Fund
            </a>
            .{" "}
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
              <img
                src={
                  theme == "dark"
                    ? "./images/linkIcons/resume_dark.png"
                    : "./images/linkIcons/resume.png"
                }
                width={35}
              ></img>
            </a>
            <a
              href="mailto:nolanzurek@gmail.com"
              onClick={() => {
                navigator.clipboard.writeText("nolanzurek@gmail.com");
              }}
            >
              <img
                src={
                  theme == "dark"
                    ? "./images/linkIcons/email_dark.png"
                    : "./images/linkIcons/email.png"
                }
                width={35}
              ></img>
            </a>
            <a href="https://github.com/nolanzurek" target="_blank">
              <img
                src={
                  theme == "dark"
                    ? "./images/linkIcons/github_dark.png"
                    : "./images/linkIcons/github.png"
                }
                width={35}
              ></img>
            </a>
            <a
              href="https://www.linkedin.com/in/nolan-zurek-a00471b0/"
              target="_blank"
            >
              <img
                src={
                  theme == "dark"
                    ? "./images/linkIcons/linkedin_dark.png"
                    : "./images/linkIcons/linkedin.png"
                }
                width={35}
              ></img>
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
