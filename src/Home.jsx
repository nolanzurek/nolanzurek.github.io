import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import NoteEntry from "./components/NoteEntry.jsx";
import SeeMore from "./components/SeeMore.jsx";
import Spacer from "./components/Spacer.jsx";
import Terrain from "./components/Terrain.jsx";
import Terminal from "./terminal/Terminal.jsx";

import "./app.css";

import notes from "./data/notes.json";
import projects from "./data/projects.json";

function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [storedTheme, setStoredTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const [localTheme, setLocalTheme] = useState(
    storedTheme || (defaultDark ? "dark" : "light")
  );

  function setTheme(myTheme) {
    setLocalTheme(myTheme);
    setStoredTheme(myTheme);
  }

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
                localTheme == "light"
                  ? "./images/Darkmode.png"
                  : "./images/Lightmode.png"
              }
              width={35}
              onClick={() => {
                setTheme(localTheme === "light" ? "dark" : "light");
              }}
            ></img>
          </button>
        </div>
        {/* <div id="terminalContainer">
          {terminalOpen ? (
            <Terminal id="mainPageTerminal" setTheme={setTheme}></Terminal>
          ) : null}
          <button
            id="noTerminal"
            onClick={() => setTerminalOpen(!terminalOpen)}
          >
            {terminalOpen ? "⏶ Hide the terminal" : "⏷ Show the terminal"}
          </button>
        </div> */}
        <div id="infoContainer">
          {/* <h2 id="infoTitle" className="sectionTitle">
            Info
          </h2> */}
          <p id="educationInfo">
            I study computer science and mathematics at the University of
            Alberta. My interests lie in programming langauge implementation and
            the theory of computation.
          </p>
          <p id="trampolineInfo">
            In my spare time, I compete for{" "}
            <a
              href="https://www.gymnastics.sport/site/athletes/bio_detail.php?id=41128&type=licence"
              target="_blank"
              className="inTextLink"
              alt="Nolan Zurek FIG Profile"
            >
              Team Canada
            </a>{" "}
            in{" "}
            <a
              href="https://en.wikipedia.org/wiki/Double_mini_trampoline"
              target="_blank"
              className="inTextLink"
              alt="Double Mini Trampoline Wikipedia Page"
            >
              double-mini trampoline
            </a>{" "}
            and serve as the VP Internal/External for the{" "}
            <a
              href="https://ualbertamss.com/"
              target="_blank"
              className="inTextLink"
              alt="University of Alberta Mathematical Sciences Society Webpage"
            >
              University of Alberta Mathematical Sciences Society
            </a>
            .
          </p>
          <br />
          <div id="socialIcons">
            <a href="./documents/pdf/Nolan_Zurek_Resume.pdf">
              <img
                src={
                  localTheme == "light"
                    ? "./images/linkIcons/resume.png"
                    : "./images/linkIcons/resume_dark.png"
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
                  localTheme == "light"
                    ? "./images/linkIcons/email.png"
                    : "./images/linkIcons/email_dark.png"
                }
                width={35}
              ></img>
            </a>
            <a href="https://github.com/nolanzurek" target="_blank">
              <img
                src={
                  localTheme == "light"
                    ? "./images/linkIcons/github.png"
                    : "./images/linkIcons/github_dark.png"
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
                  localTheme == "light"
                    ? "./images/linkIcons/linkedin.png"
                    : "./images/linkIcons/linkedin_dark.png"
                }
                width={35}
              ></img>
            </a>
            {/* <a href="https://www.strava.com/athletes/51610587" target="_blank">
              <img
                src={
                  localTheme == "light"
                    ? "./images/linkIcons/strava.png"
                    : "./images/linkIcons/strava_dark.png"
                }
                width={35}
              ></img>
            </a> */}
          </div>
        </div>
        <div id="projectsContainer">
          <h2 id="projectsTitle" className="sectionTitle">
            Projects
          </h2>
          <div id="projectEntries">
            {projects.slice(0, 3).map((project, i) => (
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
        <Terrain width={window.innerWidth} theme={localTheme}></Terrain>
      </div>
    </>
  );
}

export default Home;
