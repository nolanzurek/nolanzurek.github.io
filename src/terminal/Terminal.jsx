import React from "react";
import TerminalEntry from "./TerminalEntry.jsx";
import filesystem from "../data/filesystem.json";
import notes from "../data/notes.json";
import projects from "../data/projects.json";
import "./terminal.css";
import getPath from "../utils/getPath.js";
import themes from "../data/themes.json";

export default class Terminal extends React.Component {
  constructor(props) {
    filesystem.notes = notes;
    filesystem.projects = projects;
    super(props);
    this.state = {
      filePath: [],
      fileContext: filesystem,
      history: [],
      response: "",
      user: localStorage.getItem("user")
        ? localStorage.getItem("user")
        : "guest",
    };
    this.terminalInputRef = React.createRef();
  }

  componentDidMount = () => {};

  componentDidUpdate = (previousProps, previousState) => {
    if (previousState.filePath !== this.state.filePath) {
      let newContext = filesystem;
      for (let i = 0; i < this.state.filePath.length; i++) {
        if (Array.isArray(newContext[this.state.filePath[i]])) {
          newContext = newContext[this.state.filePath[i]];
        } else {
          this.setState({
            ...this.state,
            filePath: this.state.filePath.slice(0, -1),
          });
          break;
        }
      }
      // this.state.filePath.forEach((el) => {
      //   if (Array.isArray(newContext[el])) {
      //     newContext = newContext[el];
      //   }
      // });
      this.setState({ fileContext: newContext });
    }
  };

  handleCommand = (command) => {
    //pick which command has to be run from functions below using the first word of the command
    //add the command to the history

    //add the command to the history

    //split the command into an array of words
    let commandArray = command.split(" ");
    let commandBodyArray = commandArray.slice(1);

    let response = "";
    let clearFlag = false;

    //check if the command is a valid command
    switch (commandArray[0].toLowerCase()) {
      case "cd":
        this.handleCD(commandBodyArray);
        break;
      case "ls":
        response = this.handleLS(commandBodyArray);
        break;
      case "pwd":
        response = this.handlePWD(commandBodyArray);
        break;
      case "help":
        response = this.handleHELP();
        break;
      case "man":
        response = this.handleHELP();
        break;
      case "clear":
        clearFlag = this.handleCLEAR(commandBodyArray);
        break;
      case "echo":
        response = this.handleECHO(commandBodyArray);
        break;
      case "whoami":
        response = this.handleWHOAMI(commandBodyArray);
        break;
      case "login":
        response = this.handleLOGIN(commandBodyArray);
        break;
      case "logout":
        response = this.handleLOGOUT();
        break;
      case "visit":
        response = this.handleVISIT(commandBodyArray);
        break;
      case "open":
        response = this.handleVISIT(commandBodyArray);
        break;
      case "info":
        response = this.handleINFO(commandBodyArray);
        break;
      case "darkmode":
        response = this.handleTHEME("dark");
        break;
      case "lightmode":
        response = this.handleTHEME("light");
        break;
      case "theme":
        response = this.handleTHEME(commandBodyArray[0]);
        break;
      default:
        response = "Command not found";
      //add the command to the history
    }
    if (!clearFlag) {
      this.setState({
        history: [
          ...this.state.history,
          [command, this.state.filePath, response, this.state.user],
        ],
      });
    } else {
      this.setState({
        history: [],
      });
      clearFlag = false;
    }
    this.terminalInputRef.current.scrollBy(0, 1000);
  };

  handleCD = (commandBodyArray) => {
    let workingArray = commandBodyArray[0].split("/");
    if (workingArray[0] === ".") {
      this.setState({
        filePath: [...this.state.filePath, ...workingArray.slice(1)],
      });
    } else if (workingArray[0] === "..") {
      if (this.state.filePath.length == 0) {
        return;
      }

      let numBacks = workingArray
        .map((el) => (el === ".." ? 1 : 0))
        .reduce((a, b) => a + b);

      this.setState({
        filePath: [
          ...this.state.filePath.slice(0, -numBacks),
          ...workingArray.slice(numBacks),
        ],
      });
    } else {
      this.setState({
        filePath: [...this.state.filePath, ...workingArray],
      });
    }
  };

  handleLS = (commandBodyArray) => {
    let response = "";
    let fileContext = this.state.fileContext;

    response = Array.isArray(fileContext)
      ? fileContext.map((el) => el.title.replaceAll(" ", "_")).join(" ")
      : Object.keys(fileContext).join(" ");

    return response;
  };

  handlePWD = (commandBodyArray) => {
    let response = "";
    let filePath = this.state.filePath;

    response = "/" + filePath.join("/");

    return response;
  };

  handleCLEAR = (commandBodyArray) => {
    return true;
  };

  handleECHO = (commandBodyArray) => {
    return commandBodyArray.join(" ");
  };

  handleWHOAMI = (commandBodyArray) => {
    let guestStatus = this.state.user === "guest";
    return `
	${
    guestStatus
      ? "You are not logged in. \nUse the login command to create a username"
      : this.state.user
  }
    `;
  };

  handleLOGIN = (commandBodyArray) => {
    if (commandBodyArray.length === 0) {
      return "Login requires a username";
    } else {
      this.setState({
        user: commandBodyArray.join(" ").replace(" ", "_"),
      });
    }
    localStorage.setItem("user", commandBodyArray.join(" ").replace(" ", "_"));
    return "Login successful";
  };

  handleLOGOUT = () => {
    this.setState({
      user: "guest",
    });
    return "Logout successful";
  };

  handleHELP = () => {
    return [
      "Welcome to the nzurek.dev terminal! The following unix-like commands are supported:",
      "cd      - move to a directory",
      "ls      - list all the files in current directory",
      "pwd     - prints working directory",
      "clear   - remove all entries from the terminal",
      "echo    - prints the arguments to the command",
      'open    - opens a file and/or visits a link ("visit" also works for both)',
      "info    - prints description of item",
      "whoami  - prints the current user",
      "login   - allows you to login with a given username",
      "logout  - logs out of the terminal",
      "darkmode - changes the theme to dark mode",
      "lightmode - changes the theme to light mode",
      "theme   - changes the theme to the given theme",
      'help    - prints the help page ("man" also works)',
    ];
  };

  handleVISIT = (commandBodyArray) => {
    let fileContext = this.state.fileContext;

    let obj = fileContext.find(
      (el) =>
        el.title.toLowerCase() ===
        commandBodyArray[0].replaceAll("_", " ").toLowerCase()
    );

    //open the pdf or the link
    //window.location = obj.link;

    if (!obj) {
      return "Object not found";
    }

    //TODO: target blank
    const link = document.createElement("a");
    const hrefs = obj.link ? [obj.link] : obj.links.map((el) => el.link);
    link.target = "_blank";
    hrefs.forEach((el) => {
      link.href = el;
      link.click();
    });

    return obj.link ? "Page visited" : "Pages visited";
  };

  handleINFO = (commandBodyArray) => {
    let fileContext = this.state.fileContext;

    let obj = fileContext.find(
      (el) =>
        el.title.toLowerCase() ===
        commandBodyArray[0].replaceAll("_", " ").toLowerCase()
    );

    return obj ? `${obj.title}: ${obj.description}` : "Object not found";
  };

  handleTHEME = (input) => {
    if (!themes.includes(input)) {
      return `Theme ${input} not found`;
    }

    this.props.setTheme(input);
    return `Theme set to ${input}`;
  };

  render() {
    return (
      <>
        <div className="terminal">
          <div className="terminalEntries">
            {this.state.history.map((el) => {
              return (
                <TerminalEntry
                  command={el[0]}
                  filePath={el[1]}
                  response={el[2]}
                  user={el[3]}
                  onClick={() => {
                    this.terminalInputRef.current.focus();
                  }}
                />
              );
            })}
          </div>
          <div className="terminalInputContainer">
            <p className="terminalInputPrompt">
              {this.state.user}@{getPath(this.state.filePath)}
            </p>
            <input
              className="terminalInput"
              type="text"
              ref={this.terminalInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.handleCommand(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
      </>
    );
  }

  checkPath = (path) => {
    //split the path into an array of folders
    let pathArray = path.split("/");
    //check if the path is valid in the current file context
    //if it is valid, return true
    //if it is not valid, return false
    let newContext = filesystem;
    this.state.filePath.forEach((el) => {
      newContext = newContext[el];
    });

    return !!newContext;
  };
}
