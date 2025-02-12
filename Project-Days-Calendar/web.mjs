import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { findEventDate } from "./common.mjs";

// Month and Year selectors
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const goButton = document.getElementById("go-button");

// Populate Month Select
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

monthNames.forEach((month, index) => {
  let option = document.createElement("option");
  option.value = index + 1;
  option.textContent = month;
  monthSelect.appendChild(option);
});

// Populate Year Select
let currentYear = new Date().getFullYear();
for (let i = currentYear - 10; i <= currentYear + 10; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

// Track Current Month and Year
let currentMonth = new Date().getMonth();
console.log("current month", currentMonth);
console.log("current year", currentYear);

monthSelect.addEventListener("change", () => {
  currentMonth = parseInt(monthSelect.value);
  generateTable(currentYear, currentMonth);
});

yearSelect.addEventListener("change", () => {
  currentYear = parseInt(yearSelect.value);
  generateTable(currentYear, currentMonth);
});



//create previous month and next month buttons

//previous button
const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", () => {
  if (currentMonth === 1) {
    currentMonth = 12;
    currentYear--; // move to previous year
  } else {
    currentMonth--;
  }
  // Update dropdown values
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  console.log("current month previous button", currentMonth);
  generateTable(currentYear, currentMonth);
});



function generateTable(selectedYear, selectedMonth) {
  let calContainer = document.getElementById("table-container");

  // Clear previous table if exists
  calContainer.innerHTML = "";

  // Create table and body
  let table = document.createElement("table");
  table.border = "1";
  let tblBody = document.createElement("tbody");

  // Get date details
  const firstDayInWeek = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  const totalDaysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  // Create header
  let header = document.createElement("h3");
  header.innerHTML = `${monthNames[selectedMonth - 1]} ${selectedYear}`;
  calContainer.appendChild(header);

  // Weekday names
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let daysNameRow = document.createElement("tr");
  for (let i = 0; i < weekDays.length; i++) {
    let cell = document.createElement("th");
    cell.innerText = weekDays[i];
    daysNameRow.appendChild(cell);
  }
  tblBody.appendChild(daysNameRow);

  // Adjust first day
  let dayCount = 1;
  let weekRow = document.createElement("tr");
  const adjustedFirstDay = firstDayInWeek === 0 ? 6 : firstDayInWeek - 1;

  for (let i = 0; i < adjustedFirstDay; i++) {
    let emptyCell = document.createElement("td");
    weekRow.appendChild(emptyCell);
  }

  for (let i = adjustedFirstDay; i < 7; i++) {
    let cell = document.createElement("td");
    cell.innerText = findEventDate(
      daysData,
      selectedYear,
      selectedMonth,
      dayCount
    );
    weekRow.appendChild(cell);
    dayCount++;
  }
  tblBody.appendChild(weekRow);

  // Create remaining rows
  while (dayCount <= totalDaysInMonth) {
    let row = document.createElement("tr");
    for (let i = 0; i < 7 && dayCount <= totalDaysInMonth; i++) {
      let cell = document.createElement("td");
      cell.innerText = findEventDate(
        daysData,
        selectedYear,
        selectedMonth,
        dayCount
      );
      row.appendChild(cell);
      dayCount++;
    }
    tblBody.appendChild(row);
  }

  table.appendChild(tblBody);
  calContainer.appendChild(table);
}

// Update table when clicking "Go" button
goButton.addEventListener("click", () => {
  const selectedYear = parseInt(yearSelect.value);
  const selectedMonth = parseInt(monthSelect.value);
  generateTable(selectedYear, selectedMonth);
});

// Generate initial table
window.onload = function () {
  generateTable(currentYear, new Date().getMonth() + 1);
};
