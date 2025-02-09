// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { findEventDate } from "./common.mjs";




function generateTable(){
    console.log(daysData);
    let divContainer = document.getElementById("table-container");

    // Clear previous table if exists
    divContainer.innerHTML = "";

    // Create table and body
    let table = document.createElement("table");
    table.border = "1"; // Add border for visibility
    let tblBody = document.createElement("tbody");

    // Get current date details
    const date = new Date();
    const day = date.getDate(); 
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Find first day of the month and its weekday
    const firstDayInWeek = new Date(year, month - 1, 1).getDay(); 
    console.log(firstDayInWeek + "  " + "Find first day of the month and its weekday"); 
    const totalDaysInMonth = new Date(year, month, 0).getDate(); 
    console.log(totalDaysInMonth + "  " + "totalDaysInMonth");

    // Weekday names starting from Monday
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Create table row for week day names
    let daysNameRow = document.createElement("tr");
    for (let i = 0; i < weekDays.length; i++) {
        let cell = document.createElement("th");
        cell.innerText = weekDays[i];
        daysNameRow.appendChild(cell);
    }
    tblBody.appendChild(daysNameRow);

    // Create rows for the days of the month
    let dayCount = 1;
    let weekRow = document.createElement("tr");

    // Adjust first day (make Monday first column)
    const adjustedFirstDay = firstDayInWeek === 0 ? 6 : firstDayInWeek - 1;

    // Add empty cells before the first day
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyCell = document.createElement("td");
        weekRow.appendChild(emptyCell);
    }

    // Fill in the calendar days
    for (let i = adjustedFirstDay; i < 7; i++) {
        let cell = document.createElement("td");
        cell.innerText = findEventDate(daysData, year, month, dayCount);//dayCount
        weekRow.appendChild(cell);
        dayCount++;
    }
    tblBody.appendChild(weekRow);

    // Create remaining rows
    while (dayCount <= totalDaysInMonth) {
        let row = document.createElement("tr");
        for (let i = 0; i < 7 && dayCount <= totalDaysInMonth; i++) {
            let cell = document.createElement("td");
            cell.innerText = findEventDate(daysData, year, month, dayCount);
            row.appendChild(cell);
            dayCount++;
        }
        tblBody.appendChild(row);
    }

    // Append table body and add to container
    table.appendChild(tblBody);
    divContainer.appendChild(table);

    


}

window.onload = function() {
    generateTable();
    // document.querySelector("body").innerText = `${getGreeting()} - there are ${daysData.length} known days`;
}
