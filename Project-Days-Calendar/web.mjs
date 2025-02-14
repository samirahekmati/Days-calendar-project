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
const startingDate = 1900;
const endingDate = 2050;
let currentYear = new Date().getFullYear();
for (let i = startingDate; i <= endingDate; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}

// Set current month and year as selected
monthSelect.value = new Date().getMonth() + 1;
yearSelect.value = new Date().getFullYear();

// Track Current Month and Year
let currentMonth = new Date().getMonth();
console.log("current month", currentMonth);
console.log("current year", currentYear);

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
  console.log("current month previous button", currentMonth);
  // Update dropdown values
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;

  generateTable(currentYear, currentMonth);
});

//next button
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  if (currentMonth === 12) {
    currentMonth = 1;
    currentYear++; // move to next year
  } else {
    currentMonth++;
  }
  console.log("current month next button", currentMonth);

  // Update dropdown values
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;

  generateTable(currentYear, currentMonth);
});

function fetchDescription(url) { 
  if (!url) return;             
  fetch(url)                   
    .then(r => r.text())       
    .then(t => {               
      document.getElementById("description-content").textContent = t; 
      document.getElementById("description-modal").hidden = false;   
    })                              
}                              

// Close button hides the modal
document.getElementById("close-desc-btn").addEventListener("click", () => { 
  document.getElementById("description-modal").hidden = true;              
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
    const tryVar = findEventDate(
      daysData,
      selectedYear,
      selectedMonth,
      dayCount
    );
    console.log("new variable-->", tryVar);

    if (tryVar.eventName) {                                     
      cell.innerText = tryVar.day1 + " ";                       
      let btn = document.createElement("button");               
      btn.textContent = tryVar.eventName;                     
      btn.addEventListener("click", () => fetchDescription(tryVar.url));
      cell.appendChild(btn);                                 
    } else {
      cell.innerText = tryVar.day1;
    }

    weekRow.appendChild(cell);
    dayCount++;
  }
  tblBody.appendChild(weekRow);

  // Create remaining rows
  while (dayCount <= totalDaysInMonth) {
    let row = document.createElement("tr");
    for (let i = 0; i < 7 && dayCount <= totalDaysInMonth; i++) {
      let cell = document.createElement("td");
      const tryVar = findEventDate(
        daysData,
        selectedYear,
        selectedMonth,
        dayCount
      );
      console.log("new variable-->", tryVar);

      if (tryVar.eventName) {                                   
        cell.innerText = tryVar.day1 + " ";                     
        let btn = document.createElement("button");             
        btn.textContent = tryVar.eventName;                    
        btn.addEventListener("click", () => fetchDescription(tryVar.url)); 
        cell.appendChild(btn);                                
      } else {
        cell.innerText = tryVar.day1;
      }

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
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  // Set default values for dropdowns
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  generateTable(currentYear, currentMonth);
};
