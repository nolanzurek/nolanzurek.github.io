class Skill {
  quarterFlips = 0;
  twistsArr = [];
  shape = "/"; //straight by default
  backward = false;
  discipline = "TRI";
  ddString = "";
  twistsTotal = 0;
  strongBackwards = undefined;
  guessedBackwards = false;
  constructor(ddStringIn, eventIn) {
    this.ddStringPermanent = ddStringIn;
    this.ddString = ddStringIn.replaceAll("-", "0");
    this.discipline = eventIn;
    if (this.ddString.includes(".") || "h(".includes(ddStringIn)) {
      this.strongBackwards = false;
      this.ddString = this.ddString.substring(1);
    } else {
      if (eventIn == "TUM") {
        this.strongBackwards = true;
      }
    }
    if (this.ddString.includes("/")) {
      this.shape = "/";
      this.ddString = this.ddString.slice(0, -1);
    } else if (this.ddString.includes("o")) {
      this.shape = "o";
      this.ddString = this.ddString.slice(0, -1);
    } else if (this.ddString.includes("<")) {
      this.shape = "<";
      this.ddString = this.ddString.slice(0, -1);
    }
    if (this.discipline == "TUM") {
      if ("hf^(".includes(ddStringIn)) {
        this.ddString = ddStringIn;
      } else {
        this.quarterFlips = 4 * this.ddString.length;
        for (var i = 0; i < this.ddString.length; i++) {
          this.twistsArr.push(parseInt(this.ddString[i]));
        }
        this.ddString = "" + this.quarterFlips;
        for (var i = 0; i < this.twistsArr.length; i++) {
          this.ddString += "" + this.twistsArr[i];
        }
        this.ddString += this.shape;
        this.ddString = this.ddString.replaceAll("0", "-");
      }
    } else {
      if (this.ddString.length == 2) {
        this.quarterFlips = parseInt(this.ddString.substring(0, 1));
        this.twistsArr = [parseInt(this.ddString.substring(1, 2))];
      } else if (this.ddString.length == 3) {
        //quintuple-full edge case (fix later?)
        this.quarterFlips = parseInt(this.ddString.substring(0, 1));
        this.twistsArr = [
          parseInt(this.ddString.substring(1, 2)),
          parseInt(this.ddString.substring(2, 3)),
        ];
      } else {
        this.quarterFlips = parseInt(this.ddString.substring(0, 2));
        this.ddString = this.ddString.substring(2);
        for (var i = 0; i < this.ddString.length; i++) {
          this.twistsArr.push(parseInt(this.ddString.substring(i, i + 1)));
        }
      }
    }

    if (this.strongBackwards != undefined) {
      this.backward = this.strongBackwards;
    } else {
      var twistsTotalA = 0;
      for (var i = 0; i < this.twistsArr.length; i++) {
        twistsTotalA += this.twistsArr[i];
      }
      this.backward = twistsTotalA % 2 == 0;
    }

    for (var i = 0; i < this.twistsArr.length; i++) {
      this.twistsTotal += this.twistsArr[i];
    }

    this.guessedBackwards = this.twistsTotal % 2 == 0;

    if (ddStringIn == "^") {
      this.quarterFlips = 4;
      this.twistsArr = [0];
    }
  }

  calculateDD() {
    var dd = 0;
    var twistsTotal = 0;
    for (var i = 0; i < this.twistsArr.length; i++) {
      twistsTotal += this.twistsArr[i];
    }
    var flips = Math.floor(this.quarterFlips / 4);

    if (this.discipline.toUpperCase() == "TRI") {
      dd = this.quarterFlips * 0.1 + 0.1 * twistsTotal;

      //complete flip bonuses
      if (flips == 0) {
        //nothing
      } else if (flips == 1) {
        dd += 0.1;
      } else if (flips == 2) {
        dd += 0.2;
      } else if (flips == 3) {
        dd += 0.4;
      } else if (flips == 4) {
        dd += 0.6;
      } else {
        //edge case
        //talk do judge about what to do here
        dd += 0.2 + 0.2 * flips;
      }

      if (flips == 0 || this.shape == "o") {
        //nothing
      } else if (
        flips == 1 &&
        (this.shape == "/" || this.shape == "<") &&
        twistsTotal == 0
      ) {
        dd += 0.1;
      } else if (flips != 1) {
        dd += 0.1 * flips;
      }

      //that's it? I hope?
    } else if (this.discipline.toUpperCase() == "DMT") {
      if (this.quarterFlips % 4 !== 0) {
        console.log("All DMT skills must be full flips");
        return undefined;
      }

      if (flips == 0) {
        dd = twistsTotal * 0.2;
      } else if (flips == 1) {
        dd += 0.5;
        if (twistsTotal == 0) {
          if (!(this.shape == "o")) {
            dd += 0.1;
          }
        } else {
          if (twistsTotal <= 2) {
            dd += 0.2 * twistsTotal;
          } else if (twistsTotal <= 4) {
            dd += 0.2 * 2 + 0.3 * (twistsTotal - 2);
          } else if (twistsTotal <= 6) {
            dd += 0.2 * 2 + 0.3 * 2 + 0.4 * (twistsTotal - 4);
          } else if (twistsTotal <= 8) {
            dd += 0.2 * 2 + 0.3 * 2 + 0.4 * 2 + 0.5 * (twistsTotal - 6);
          }
        }
      } else {
        //raw calculation
        dd += (twistsTotal * 0.2 + flips * 0.5) * flips;
        //bonuses
        if (this.shape == "<") {
          if (flips == 2) {
            dd += 0.4;
          } else if (flips == 3) {
            dd += 0.8;
          } else if (flips == 4) {
            dd += 1.6;
          } else {
            //edge case?? ask judge how this would be calculated
            dd += 1.6 + (flips - 4) * 0.4;
          }
        } else if (this.shape == "/") {
          if (flips == 2) {
            dd += 0.8;
          } else if (flips == 3) {
            dd += 1.6;
          } else {
            //edge case?? ask judge how this would be calculated
            dd += 1.6 + (flips - 3) * 0.8;
          }
        }
        //should the twists be outside of this bracket?
      }
    } else if (this.discipline.toUpperCase() == "TUM") {
      if (this.ddString == "(") {
        dd = 0.1;
      } else if (this.ddString == "h") {
        dd = 0.1;
      } else if (this.ddString == "f") {
        dd = 0.1;
      } else if (this.ddString == "^") {
        dd = 0.2;
      } else {
        if (this.quarterFlips == 4) {
          if (twistsTotal == 0) {
            dd = Math.floor(this.quarterFlips / 4) * 0.5;
            if (this.shape == "<" || this.shape == "/") {
              dd += 0.1;
            }
            //tumbling force backward?
            if (!this.backward) {
              dd += 0.1;
            }
          } else {
            dd = Math.floor(this.quarterFlips / 4) * 0.5;
            if (this.twistsTotal <= 4) {
              dd += 0.2 * twistsTotal;
            } else if (this.twistsTotal <= 6) {
              dd += 0.2 * 4 + 0.3 * (twistsTotal - 4);
            } else {
              dd += 0.2 * 4 + 0.3 * 2 + 0.4 * (twistsTotal - 6);
            }
            if (!this.backward) {
              dd += 0.1;
            }
          }
        } else if (this.quarterFlips == 8) {
          dd = Math.floor(this.quarterFlips / 4) * 0.5;
          if (this.twistsTotal <= 2) {
            dd += 0.1 * twistsTotal;
          } else if (this.twistsTotal <= 4) {
            dd += 0.1 * 2 + 0.2 * (twistsTotal - 2);
          } else if (this.twistsTotal <= 6) {
            dd += 0.1 * 2 + 0.2 * 2 + 0.3 * (twistsTotal - 4);
          } else {
            dd += 0.1 * 2 + 0.2 * 2 + 0.3 * 2 + 0.4 * (twistsTotal - 6);
          }
          if (this.shape == "<") {
            dd += 0.1;
          } else if (this.shape == "/") {
            dd += 0.2;
          }
          if (!this.backward) {
            dd += 0.2;
          }
          dd = dd * 2;
        } else if (this.quarterFlips == 12) {
          dd = Math.floor(this.quarterFlips / 4) * 0.5;
          if (this.twistsTotal <= 2) {
            dd += 0.3 * twistsTotal;
          } else {
            dd += 0.3 * 2 + 0.4 * (twistsTotal - 2);
          }
          if (this.shape == "<") {
            dd += 0.2;
          } else if (this.shape == "/") {
            dd += 0.4;
          }
          if (!this.backward) {
            dd += 0.3;
          }
          dd = dd * 3;
        } else {
          dd = Math.floor(this.quarterFlips / 4) * 0.5;
          if (this.shape == "<") {
            dd += 0.3;
          }
          if (!this.backward) {
            dd += 0.1 * Math.floor(this.quarterFlips / 4);
          }
          dd = dd * Math.floor(this.quarterFlips / 4);
        }
      }
    } else {
      throw "Invalid event (how did this even happen)";
    }
    return Math.round(dd * 10) / 10;
  }

  printInfo() {
    console.log("DDString: " + this.ddStringPermanent);
    console.log("Shape: " + this.shape);
    console.log("Backward: " + this.backward);
    console.log("Event: " + this.event);
    console.log("QuarterFlips: " + this.quarterFlips);
    console.log("Twists: " + this.twistsArr);
  }
}

const skillsArr = [
  ["^", 0, "Whip"],
  ["(", 0, "Roundoff"],
  ["f", 0, "Back Handspring"],
  ["h", 0, "Front Handspring"],
  ["4-", 1, "Back", "Front"],
  ["41", 1, "Barani", "Back half"],
  ["42", 0, "Back Full", "Front Full"],
  ["43", 0, "Rudi", "Back 3/2"],
  ["44", 0, "Double Full", "Double front full"],
  ["45", 0, "Randi", "Back 5/2"],
  ["46", 0, "Triple Full", "Triple front Full"],
  ["47", 0, "Adolf", "Back 7/2"],
  ["48", 0, "Quadruple Full", "Quadruple front full"],
  ["8--", 1, "Double", "Double front"],
  ["81-", 1, "Half-in", "Arabian Double Front"],
  ["8-1", 1, "Half-out", "Biles"],
  ["82-", 1, "Full-in", "Front full-in"],
  ["8-2", 1, "Full-out", "Front full-out"],
  ["821", 1, "Full-half", "Full-in Half-out"],
  ["812", 1, "Half-full", "Half-full"],
  ["811", 1, "Half-half", "Front half-half"],
  ["822", 1, "Full-Full", "Front full-full"],
  ["83-", 1, "Rudi-in", "3/2-in back"],
  ["8-3", 1, "Rudi-out", "3/2-out back"],
  ["8-4", 1, "Double full out", "Front double full out"],
  ["813", 1, "Half-rudi"],
  ["831", 1, "Full-full"],
  ["84-", 1, "Double full in", "Front double full in"],
  ["85-", 1, "Randi-in", "5/2-in back"],
  ["841", 1, "Full-rudi", "Full-3/2"],
  ["832", 1, "Full-rudi", "Full-3/3"],
  ["823", 1, "Full-rudi", "Full-3/4"],
  ["814", 1, "Full-rudi", "Full-3/5"],
  ["8-5", 1, "Randi-out", "5/2-out back"],
  ["815", 1, "Half-randi"],
  ["824", 1, "Miller", "Front miller"],
  ["833", 1, "Miller", "Front miller"],
  ["842", 1, "Miller", "Front miller"],
  ["851", 1, "Miller", "Front miller"],
  ["825", 1, "Full-randi", "Vachon"],
  ["834", 1, "Full-randi", "Vachon"],
  ["843", 1, "Full-randi", "Vachon"],
  ["852", 1, "Full-randi", "Vachon"],
  ["826", 1, "Miller Plus", "Front Miller Plus"],
  ["835", 1, "Miller Plus", "Front Miller Plus"],
  ["844", 1, "Miller Plus", "Front Miller Plus"],
  ["853", 1, "Miller Plus", "Front Miller Plus"],
  ["862", 1, "Miller Plus", "Front Miller Plus"],
  ["855", 1, "Miller Plus Plus", "Front Miller Plus Plus"],
  ["12---", 1, "Triple", "Triple front"],
  ["121--", 1, "Half-in triple", "Arabian Triple Front"],
  ["12-1-", 1, "Fliffus-in "],
  ["12--1", 1, "Triff", "Triple back half-out"],
  ["1211-", 1, "Half-half-in"],
  ["121-1", 1, "Half-triff"],
  ["12-11", 1, "Half-half-out"],
  ["122--", 1, "Full-in triple", "Full-in triple front"],
  ["12-2-", 1, "Back-full-back"],
  ["12-21", 1, "Front-full-half"],
  ["12--2", 1, "Full-out triple"],
  ["12--3", 1, "Triff Rudi-out"],
  ["122-1", 1, "Full-front-half", "Full-in triple half out"],
  ["12111", 1, "Half-half-half"],
  ["1221-", 1, "Full-half-in"],
  ["1222-", 1, "Full-full-in"],
  ["122-2", 1, "Full-back-full"],
  ["12-22", 1, "Full-full-out"],
  ["121-3", 1, "Half-triff-rudi"],
  ["123-1", 1, "3/2-in triff"],
  ["122-3", 1, "Full-front-rudi"],
  ["12-23", 1, "Front-full-rudi"],
  ["12--5", 1, "Triff-randi"],
  ["12221", 1, "Full-full-half"],
  ["12222", 1, "Full-full-full"],
  ["16----", 1, "Quadruple", "Quadruple front"],
  ["16---1", 1, "Quadriffus"],
  ["16---3", 1, "Quadriffus-rudi"],
  ["162--1", 1, "Full-front-front-half"],
  ["162---", 1, "Full-in quadruple"],
  ["161---1", 1, "Half-qaudriffus"],
];

var getDD = function () {
  document.getElementById("skillName").style.display = "block";
  document.getElementById("skillName").innerHTML = "";
  console.log("showing title");
  mySkill = new Skill(
    document.getElementById("FigIN").value,
    document.querySelector('input[name="event"]:checked').id
  );
  document.getElementById("ddOutput").innerHTML =
    "DD: <strong>" + mySkill.calculateDD().toFixed(1) + "</strong>";
  document.getElementById("skillFIG").innerHTML =
    document.getElementById("FigIN").value;
  if (mySkill.discipline == "TUM") {
    try {
      if (mySkill.guessedBackwards != mySkill.backward) {
        document.getElementById("skillName").innerHTML = skillsArr.find(
          (element) =>
            mySkill.ddString.includes(element[0]) &&
            mySkill.ddString.length - element[0].length == 1
        )[3];
      } else {
        document.getElementById("skillName").innerHTML = skillsArr.find(
          (element) =>
            mySkill.ddString.includes(element[0]) &&
            mySkill.ddString.length - element[0].length == 1
        )[2];
      }
    } catch (err) {
      document.getElementById("skillName").style.display = "none";
      console.log("hiding title");
    }

    try {
      if (
        skillsArr.find((element) => mySkill.ddString.includes(element[0]))[1] ==
        1
      ) {
        document.getElementById("skillName").innerHTML +=
          " " + shapeToString(mySkill.shape);
      } else {
        if ("^(hf".includes(mySkill.ddString)) {
          mySkill.shape = "n/a";
        } else {
          mySkill.shape = "/";
        }
      }
    } catch (error) {
      document.getElementById("skillName").style.display = "none";
      //  console.log("hiding title");
    }
  } else {
    try {
      if (mySkill.guessedBackwards != mySkill.backward) {
        document.getElementById("skillName").innerHTML = skillsArr.find(
          (element) =>
            mySkill.ddStringPermanent.includes(element[0]) &&
            mySkill.ddStringPermanent.length - element[0].length == 1
        )[3];
      } else {
        document.getElementById("skillName").innerHTML = skillsArr.find(
          (element) =>
            mySkill.ddStringPermanent.includes(element[0]) &&
            mySkill.ddStringPermanent.length - element[0].length == 1
        )[2];
      }
    } catch (err) {
      document.getElementById("skillName").style.display = "none";
      console.log("hiding title");
    }

    try {
      if (
        skillsArr.find((element) =>
          mySkill.ddStringPermanent.includes(element[0])
        )[1] == 1
      ) {
        document.getElementById("skillName").innerHTML +=
          " " + shapeToString(mySkill.shape);
      } else {
        mySkill.shape = "/";
      }
    } catch (error) {
      document.getElementById("skillName").style.display = "none";
      //  console.log("hiding title");
    }
  }
  document.getElementById("flipsOutput").innerHTML =
    "Flips: <strong>" + mySkill.quarterFlips / 4 + "</strong>";
  document.getElementById("twistsOutput").innerHTML =
    "Twists: <strong>" + mySkill.twistsTotal / 2 + "</strong>";
  document.getElementById("shapeOutput").innerHTML =
    "Shape: <strong>" + shapeToString(mySkill.shape) + "</strong>";
  document.getElementById("directionOutput").innerHTML =
    "Direction: <strong>" +
    (mySkill.backward ? "backward" : "forward") +
    "</strong>";
};

var shapeToString = function (shape) {
  if (shape == "o") {
    return "tuck";
  } else if (shape == "<") {
    return "pike";
  } else if (shape == "/") {
    return "layout";
  } else {
    // throw("????");
    return "n/a";
  }
};

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    getDD();
  }
});

document.addEventListener("click", function (event) {
  updateColors();
});

function updateColors() {
  var selected = document.querySelector('input[name="event"]:checked').id;
  var r = document.querySelector(":root");
  if (selected == "TRI") {
    r.style.setProperty("--cur", "#f23573");
    r.style.setProperty("--light-cur", "#f5a9d6");
    r.style.setProperty("--dark-cur", "#45082c");
  } else if (selected == "DMT") {
    r.style.setProperty("--cur", "#3597f2");
    r.style.setProperty("--light-cur", "#a9dbf5");
    r.style.setProperty("--dark-cur", "#082f42");
  } else {
    r.style.setProperty("--cur", "#7e3cdb");
    r.style.setProperty("--light-cur", "#b4a4de");
    r.style.setProperty("--dark-cur", "#12082e");
  }
}
