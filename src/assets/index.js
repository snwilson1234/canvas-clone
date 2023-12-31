import dayjs from "dayjs";
import "./styles.css";
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const TODAY = dayjs().format("ddd, MMM DD, YYYY");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;


const daysOfWeekElement = document.getElementById("calendarheader");

WEEKDAYS.forEach((weekday) => {
  const weekDayElement = document.createElement("div");
  weekDayElement.classList.add("calendar-grid-header-item")
  daysOfWeekElement.appendChild(weekDayElement);
  weekDayElement.innerText = weekday;
});

// initialize calendar
createCalendar();
displayEventsOnCalendar();

// initialize selectors
initMonthSelectors();


/* Calendar creation/helper functions */

function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
  const calendarDaysElement = document.getElementById("mycalendar");

  document.getElementById("selected-month").innerText = dayjs(
    new Date(year, month - 1)
  ).format("MMMM YYYY");

  removeAllDayElements(calendarDaysElement);

  currentMonthDays = createDaysForCurrentMonth(
    year,
    month,
    dayjs(`${year}-${month}-01`).daysInMonth()
  );

  previousMonthDays = createDaysForPreviousMonth(year, month);

  nextMonthDays = createDaysForNextMonth(year, month);

  const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  days.forEach((day) => {
    appendDay(day, calendarDaysElement);
  });
  
}

function appendDay(day, calendarDaysElement) {
  const dayElement = document.createElement("div");
  const dayElementClassList = dayElement.classList;
  dayElementClassList.add("calendar-grid-item");
  const dayOfMonthElement = document.createElement("h4");

  dayOfMonthElement.classList.add("bold-font");
  dayElement.setAttribute("day-id",day.date);
  dayElement.setAttribute("weekday",day.weekday);
  dayElement.setAttribute("short-date",day.shortDate);
  dayElement.setAttribute("week-of-month",day.weekOfMonth);
  dayOfMonthElement.innerText = day.dayOfMonth;
  dayElement.appendChild(dayOfMonthElement);
  calendarDaysElement.appendChild(dayElement);

  if (!day.isCurrentMonth) {
    dayElementClassList.add("calendar-day--not-current");
  }

  if (day.date === TODAY) {
    dayElementClassList.add("calendar-day--today");
  }
}

function removeAllDayElements(calendarDaysElement) {
  let first = calendarDaysElement.firstElementChild;

  while (first) {
    first.remove();
    first = calendarDaysElement.firstElementChild;
  }
}

function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
  return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
    return {
      date: dayjs(`${year}-${month}-${index + 1}`).format("ddd, MMM DD, YYYY"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
      weekday: dayjs(`${year}-${month}-${index + 1}`).format("dddd"),
      shortDate: dayjs(`${year}-${month}-${index + 1}`).format("MMMM DD"),
      weekOfMonth: getWeekOfMonth(dayjs(`${year}-${month}-${index + 1}`)),
    };
  });
}

function getWeekOfMonth(date) {
  // Get the first day of the month
  const firstDayOfMonth = dayjs(date).startOf('month');

  // Get the ISO week numbers for the first day of the month and the target date
  const weekNumberFirstDay = firstDayOfMonth.week();
  const weekNumberTargetDate = dayjs(date).week();

  // Calculate the week number within the month
  const weekOfMonth = weekNumberTargetDate - weekNumberFirstDay + 1;

  return weekOfMonth;
}

function createDaysForPreviousMonth(year, month) {
  const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("ddd, MMM DD, YYYY"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false,
      weekday: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("dddd"),
      shortDate: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("MMMM DD"),
      weekOfMonth: getWeekOfMonth(dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`)),
    };
  });
}

function createDaysForNextMonth(year, month) {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${currentMonthDays.length}`
  );

  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("ddd, MMM DD, YYYY"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
      weekday: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("dddd"),
      shortDate: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("MMMM DD"),
      weekOfMonth: getWeekOfMonth(dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      )),
    };
  });
}

function getWeekday(date) {
  return dayjs(date).weekday();
}

function initMonthSelectors() {
  document
    .getElementById("previous-month-seek")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).subtract(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      displayEventsOnCalendar();
    });

  document
    .getElementById("next-month-seek")
    .addEventListener("click", function () {
      selectedMonth = dayjs(selectedMonth).add(1, "month");
      createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
      displayEventsOnCalendar();
    });
}

function displayEventsOnCalendar() {
  const scheduledEvents = userScheduledEvents;
  scheduledEvents.forEach((scheduledEvent) => {
    
    const scheduleDate = document.querySelector("[day-id='" + scheduledEvent.date + "']");
    if (scheduleDate) {
      const fullTimeStr = scheduledEvent.fromTime;
      
      
      const hour = fullTimeStr.substring(0,fullTimeStr.indexOf(':'));
      const minute = fullTimeStr.substring(fullTimeStr.indexOf(':')+1,fullTimeStr.indexOf(':')+3);
      const aOrP = fullTimeStr.substring(fullTimeStr.length-2, fullTimeStr.length);
      
      let shortTime = "";
      
      if (minute === "00") {
        shortTime = hour + aOrP[0].toLowerCase();
      }
      else {
        shortTime = hour + ":" + minute + aOrP[0].toLowerCase();
      }

      var eventElement = document.createElement("div");
      var eventStartTimeElement = document.createElement("h4");
      var eventTitleElement = document.createElement("h4");
      
      eventStartTimeElement.innerText = shortTime;
      eventTitleElement.innerText = scheduledEvent.title;

      eventStartTimeElement.style.fontWeight = "800";
      eventStartTimeElement.style.display = "inline-block";
      
      eventTitleElement.style.display = "inline-block";
      eventTitleElement.style.fontWeight = "400";

      eventElement.style.display = "flex";
      eventElement.style.flexDirection = "row";
      eventElement.style.gap = "3px";
      eventElement.style.padding = "2px";

      let dayElementId = scheduledEvent.date.replace(/ /g, "-").replace(/,/g,"").toLowerCase();

      eventElement.setAttribute('event-date-id', dayElementId);
      eventElement.setAttribute('event-title-id', scheduledEvent.title.replace(/ /g, "-").toLowerCase());

      styleEventDiv(eventElement);

      eventElement.appendChild(eventStartTimeElement);
      eventElement.appendChild(eventTitleElement);
      
      scheduleDate.appendChild(eventElement);
      createCalendarEventPopUp(eventElement,scheduledEvent);
    }
  })
}

function styleEventDiv(elem) {
  var randomInteger = Math.floor(Math.random() * 205) + 50;
  var randomInteger2 = Math.floor(Math.random() * 50) + 50;
  var randomInteger3 = Math.floor(Math.random() * 205) + 50;

  const color = "rgb(" + randomInteger + "," + randomInteger2 + "," + randomInteger3 + ")";
  elem.style.border = "solid 1px " + color;// + color;
  elem.style.color = color;
  elem.style.fontSize = "14px";
  elem.style.borderRadius = "3px";

  elem.classList.add('calendar-event-item');
}

function createCalendarEventPopUp(calendarEventElement,dbEventObject) {
  
  
  var popupElement = document.createElement("div");
 
  popupElement.setAttribute("id",calendarEventElement.getAttribute('event-title-id') + "-" + calendarEventElement.getAttribute('event-date-id'));
  popupElement.innerHTML = `
                  
  <div class="event-popup-inner-container">
    <a><h2>${dbEventObject.title}</h2></a>
    <h4>From: ${dbEventObject.fromTime}</h4>
    <h4>To: ${dbEventObject.toTime}</h4>
    <h4>Location: ${dbEventObject.location}</h4>
    <h4>Date: ${dbEventObject.date}</h4>
  </div>

  `;


  popupElement.classList.add("event-detail-popup");
  
  const rect = calendarEventElement.getBoundingClientRect();
  // popupElement.style.marginBottom = "100px";
  popupElement.style.top = rect.top - popupElement.offsetHeight-110 + "px";
  calendarEventElement.appendChild(popupElement);
}