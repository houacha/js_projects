function setCss() {
  var css = document.createElement("link");
  css.setAttribute("id", "css");
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("href", "calendar.css");
  document.head.appendChild(css);
}

function setCal() {
  setCss();
  var calender =
    "<table border='2px' id='cal'><thead id='calHead'><tr colspan='7'><th colspan='7'><div id='mYContainer' style='position: relative' ></div><div id='nLContainer'></div></th></tr></thead><tbody id='calendarDays'></tbody></table>";
  document.getElementById("calendar").innerHTML = calender;
}

var calendar = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  xCoor: 0,
  yCoor: 0,
  convertMonth: function (monthnum) {
    switch (monthnum) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  },
  makeCal: function (monthNum = this.month, year = this.year) {
    document.getElementById("cal").scrollLeft = this.xCoor;
    document.getElementById("cal").scrollTop = this.yCoor;
    this.month = monthNum;
    this.year = year;
    var month = this.convertMonth(monthNum);
    document.getElementById("mYContainer").innerHTML =
      "<span id='mY' class='pointer' onclick='chooseMY()'><text>" +
      month +
      " </text><text>" +
      year +
      "</text></span>";
    document.getElementById("nLContainer").innerHTML =
      "<span style='padding-left:47px'><text onclick='pre()' class='pointer'> < </text><text onclick='next()' class='pointer'> > </text></span><span class='currentClick' style='float: right; padding-right:5px' onclick='current()'><text>Today</text></span>";
    document.getElementById("calendarDays").innerHTML = this.days(
      monthNum,
      year
    );
    checkDraggable();
  },
  days: function (month, year) {
    var firstDayOfMnth = new Date(year, month, 1).getDay();
    var numOfDays = new Date(year, month + 1, 0).getDate();
    var dayCounter = 1;
    var IsFirst = true;
    var daysOfWeek =
      "<tr><td class='day box'>Sun</td><td class='day box'>Mon</td><td class='day box'>Tues</td><td class='day box'>Wed</td><td class='day box'>Thurs</td><td class='day box'>Fri</td><td class='day box'>Sat</td></tr>";
    var newWeek = "";
    for (var i = 0; i < 6; i++) {
      newWeek += "<tr id='week" + i + "'>";
      for (var k = 0; k < 7; k++) {
        if (k == firstDayOfMnth && IsFirst == true && i == 0) {
          IsFirst = false;
          newWeek +=
            '<td class="content box" id="cell' +
            dayCounter +
            '" onclick="makeSchedule(' +
            dayCounter +
            ')">' +
            dayCounter +
            "</td>";
          dayCounter++;
        } else if (IsFirst == false) {
          if (dayCounter > numOfDays) {
            IsFirst = true;
            dayCounter = 1;
            newWeek +=
              '<td class="box" style="background-color:gray; opacity:.4"></td>';
          } else {
            newWeek +=
              '<td class="content box" id="cell' +
              dayCounter +
              '" onclick="makeSchedule(' +
              dayCounter +
              ')">' +
              dayCounter +
              "</td>";
            dayCounter++;
          }
        } else {
          newWeek +=
            '<td class="box" style="background-color:gray; opacity:.4"></td>';
        }
      }
      newWeek += "</tr>";
    }
    return daysOfWeek + newWeek;
  },
};

function current() {
  calendar.makeCal(new Date().getMonth(), new Date().getFullYear());
}

function makeSchedule(day) {
  //need to work on
  if (document.getElementById("schedule") == undefined) {
    var schedule = document.createElement("div");
    schedule.setAttribute("id", "schedule");
    document.getElementById("calendar").appendChild(schedule);
  }
  document.getElementById("schedule").innerHTML =
    "<form><input type='month'></input><input type='button'></input></form>";
}

function chooseMY() {
  if (document.getElementById("mChoice") == undefined) {
    var mYChoice = document.createElement("div");
    mYChoice.setAttribute("id", "mChoice");
    mYChoice.style.zIndex =
      Number(document.getElementById("cal").style.zIndex) + 1;
    mYChoice.style.position = "absolute";
    document.getElementById("mYContainer").appendChild(mYChoice);
  }
  var months =
    "<table class='mYChoice shadow' id='months'><tbody id='mtChoice'></tbody></table>";
  var tblStr = "";
  document.getElementById("mChoice").innerHTML = months;
  var count = 0;
  for (let index = 0; index < 12; index++) {
    if (count == 4) {
      tblStr += "</tr>";
      count = 0;
    } else if (count == 0) {
      tblStr += "<tr>";
    }
    var month = calendar.convertMonth(index).substr(0, 3);
    tblStr +=
      "<td class='pointer choices' onclick='chooseYr(" +
      index +
      ")'>" +
      month +
      "</td>";
    count++;
  }
  document.getElementById("mtChoice").innerHTML = tblStr;
  document.onmousedown = mouseClick;
  function mouseClick(e) {
    var mChoices = document.getElementById("mChoice").getBoundingClientRect();
    if (
      e.clientX < mChoices.left ||
      e.clientX > mChoices.right ||
      e.clientY < mChoices.top ||
      e.clientY > mChoices.bottom
    ) {
      document.getElementById("mChoice").innerHTML = "";
    }
  }
}

function chooseYr(monthChoice) {
  mYPicker.yrChoice(monthChoice);
}

var mYPicker = {
  yrMin: 0,
  yrMax: 0,
  yrChoice: function (monthChoice) {
    this.setMinMax();
    var months =
      "<table><tbody><tr><td><div class='mYChoice shadow' id='months'><table id='yChoice'></table></div></td></tr></tbody></table>";
    document.getElementById("mChoice").innerHTML = months;
    var yrStr = "";
    var count = 0;
    for (let index = this.yrMin; index > 0; index--) {
      if (count == 4) {
        yrStr += "</tr>";
        count = 0;
      } else if (count == 0) {
        yrStr += "<tr>";
      }
      yrStr +=
        "<td class='pointer choices' onclick='confirmChoice(" +
        monthChoice +
        "," +
        (calendar.year - index) +
        ")'>" +
        (calendar.year - index) +
        "</td>";
      count++;
    }
    for (let index = 0; index < this.yrMax; index++) {
      if (count == 4) {
        yrStr += "</tr>";
        count = 0;
      } else if (count == 0) {
        yrStr += "<tr>";
      }
      yrStr +=
        "<td class='pointer choices' onclick='confirmChoice(" +
        monthChoice +
        "," +
        (calendar.year + index) +
        ")'>" +
        (calendar.year + index) +
        "</td>";
      count++;
    }
    document.getElementById("yChoice").innerHTML = yrStr;
    var x = document.getElementById("yChoice");
    if (document.getElementById("yChoice").scrollHeight > 121) {
      document.getElementById("months").classList.add("scrollit");
    }
  },
  setMinMax: function () {
    var el = document.getElementById("calendar").attributes;
    if (el.getNamedItem("yrRange") !== null) {
      var yrSpan = Number(el.getNamedItem("yrRange").value) - 1;
      this.yrMin = Math.floor(Number(yrSpan) / 2);
      this.yrMax = Math.ceil(Number(yrSpan) / 2) + 1;
    }
    if (el.getNamedItem("yrMin") !== null) {
      this.yrMin = Number(el.getNamedItem("yrMin").value);
      if (el.getNamedItem("yrRange") !== undefined) {
        this.yrMax = Number(el.getNamedItem("yrRange").value) - this.yrMin;
      }
    }
    if (el.getNamedItem("yrMax") !== null) {
      this.yrMax = Number(el.getNamedItem("yrMax").value) + 1;
      if (el.getNamedItem("yrRange") !== undefined) {
        this.yrMin = Number(el.getNamedItem("yrRange").value) - this.yrMax;
      }
    }
    if (
      el.getNamedItem("yrMax") !== null &&
      el.getNamedItem("yrMin") !== null
    ) {
      this.yrMax = Number(el.getNamedItem("yrMax").value) + 1;
      this.yrMin = Number(el.getNamedItem("yrMin").value);
    }
  },
};

function confirmChoice(mtChoice, yrChoice) {
  calendar.makeCal(mtChoice, yrChoice);
}

function next() {
  var currentMonth = calendar.month;
  var currentYear = calendar.year;
  if (Number(currentMonth) + 1 > 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  for (var i = 0; i < 5; i++) {
    document.getElementById("week" + i).innerHTML = "";
  }
  calendar.makeCal(Number(currentMonth), currentYear);
}

function pre() {
  var currentMonth = calendar.month;
  var currentYear = calendar.year;
  if (Number(currentMonth) - 1 < 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  for (var i = 0; i < 5; i++) {
    document.getElementById("week" + i).innerHTML = "";
  }
  calendar.makeCal(Number(currentMonth), currentYear);
}

function dragElement(el) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(el.id + "Head")) {
    document.getElementById(el.id + "Head").style.cursor = "grab";
    document.getElementById(el.id + "Head").onmousedown = dragMouseDown;
  } else {
    document.getElementById(el.id + "Head").style.cursor = "grab";
    el.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    document.getElementById(el.id + "Head").style.cursor = "grabbing";
    e = e || window.Event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.Event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    document.getElementById(el.id + "Head").style.cursor = "grab";
    calendar.xCoor = el.scrollLeft;
    calendar.yCoor = el.scrollTop;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function checkDraggable() {
  if (document.getElementById("calendar").className.includes("draggable")) {
    document.getElementById("cal").classList.add("drag");
    dragElement(document.getElementById("cal"));
  }
}

setCal();
calendar.makeCal();
