import React, { useEffect } from "react";

import "./app.css";

import Spacer from "./components/Spacer.jsx";
import coursework from "./data/coursework.json";

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
            Coursework
          </h1>
        </div>
        <div id="courseworkContainer">
          <div id="courseworkEntries">
            {coursework.toReversed().map((entry) => (
              <div className="courseworkEntry" key={entry.term}>
                <h2 className="sectionTitle">{entry.term}</h2>
                <ul>
                  {entry.courses.map((course, index) => (
                    <li key={index}>
                      <p>
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {course.code}
                        </span>
                        : {course.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Spacer height={100} />
      </div>
    </>
  );
}

export default Projects;
