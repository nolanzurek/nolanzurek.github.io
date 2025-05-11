import React from "react";
import { useEffect } from "react";

import "./app.css";

import projects from "./data/projects.json";
import Spacer from "./components/Spacer.jsx";
import NoteEntry from "./components/NoteEntry";

function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div id="mainPage">
        <Spacer height={50} />
        <div id="mainTitleContainer">
          <h1 id="mainTitle" className="mainTitle">
            Projects
          </h1>
        </div>
        <div id="projectsContainer">
          <div id="projectEntries">
            {projects.map((project, i) => (
              <NoteEntry {...project} key={i} />
            ))}
          </div>
        </div>
        <Spacer height={100} />
      </div>
    </>
  );
}

export default Projects;
