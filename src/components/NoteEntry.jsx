import React from "react";

import "./noteEntry.css";

function NoteEntry(props) {
  if (props.link) {
    return (
      <a href={props.link} alt={props.linkAlt} target="_blank">
        <div className="noteEntry">
          <div className="noteEntryTextContainer">
            <h3 className="noteTitle">{props.title}</h3>
            {props.institution ? (
              <p className="noteInstitution">{props.institution}</p>
            ) : null}
            <p className="noteDescription">{props.description}</p>
          </div>
          <div className="noteEntryImageContainer">
            <img
              className="noteImage"
              height={200}
              width={200}
              src={props.image}
              alt={props.imageAlt}
            />
          </div>
        </div>
      </a>
    );
  } else {
    return (
      <div className="noteEntry">
        <div className="noteEntryTextContainer">
          <h3 className="noteTitle">{props.title}</h3>
          {props.institution ? (
            <p className="noteInstitution">{props.institution}</p>
          ) : null}
          <p className="noteDescription">{props.description}</p>
          <p className="noteLinksContainer">
            {props.links.map((document, i) => (
              <a
                className="documentLink inTextLink"
                href={document.link}
                target="_blank"
                alt={document.linkAlt}
                key={i}
              >
                {document.title}
              </a>
            ))}
          </p>
        </div>
        <div className="noteEntryImageContainer">
          <img
            className="noteImage"
            height={200}
            width={200}
            src={props.image}
            alt={props.imageAlt}
          />
        </div>
      </div>
    );
  }
}

export default NoteEntry;
