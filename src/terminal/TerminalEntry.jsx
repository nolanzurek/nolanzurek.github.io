import React from "react";
import "./terminalEntry.css";
import getPath from "../utils/getPath.js";

export function TerminalEntry(props) {
  let commandArray = [
    props.command.split(" ")[0],
    props.command.split(" ").slice(1).join(" "),
  ];
  return (
    <div className="terminalEntry">
      <p>
        <span className="user">{props.user}@</span>
        <span className="path">{getPath(props.filePath)}</span>{" "}
        <span className="command">{commandArray[0]} </span>
        <span className="args">
          {commandArray[1] ? commandArray[1] : ""}
        </span>{" "}
        <br></br>{" "}
        <span className="response">
          {Array.isArray(props.response)
            ? props.response.map((el) => (
                <p className="responseArrayItem">{el}</p>
              ))
            : props.response}
        </span>
      </p>
    </div>
  );
}

export default TerminalEntry;
