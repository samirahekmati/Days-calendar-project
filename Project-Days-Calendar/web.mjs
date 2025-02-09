// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };


// let date11 = new Date();
// let day11 = date11.getDate();
// let month11 = date11.getMonth() + 1;
// let year11 = date11.getFullYear();
// console.log(date11);
// console.log(day11);
// console.log(month11);
// console.log(year11);
// let firstDay11 = day11 - (day11 - 1);
// console.log(firstDay11);
// console.log((new Date(`${month11}/${1}/${year11}`)))

function findEventDate (daysData, year, month, day){

        if(month == 10){
            
                let firstDayOfOctober = new Date(year, 9, 1).getDay(); // Get first day of October
                let firstTuesday = (firstDayOfOctober <= 2) ? (3 - firstDayOfOctober) + 1 : (10 - firstDayOfOctober) + 1;
                let secondTuesday = firstTuesday + 6; // Second Tuesday
                if(secondTuesday == day){return `${secondTuesday} ${daysData[0].name}`}
                
                let lastDayOfOctober = new Date(year, 9, 31).getDay(); // Get the weekday of October 31
                let lastFriday = 31 - ((lastDayOfOctober - 5 + 7) % 7); // Find last Friday
                if (lastFriday === day) {return `${lastFriday} ${daysData[4].name}`}
                else{return day}
         
        }
        else if(month == 5){
                let firstDayOfMay = new Date(year, 4, 1).getDay(); // May 1st
                let firstSaturday = 1 + ((6 - firstDayOfMay + 7) % 7); // Find first Saturday
                let secondSaturday = firstSaturday + 7; // Second Saturday

                if (secondSaturday === day) { return `${secondSaturday} ${daysData[1].name}`;}
                else {return day}
        }
        else if(month === 9) { // September (Month index 8)
        
                let firstDayOfSeptember = new Date(year, 8, 1).getDay(); // September 1st
                let firstSaturday = 1 + ((6 - firstDayOfSeptember + 7) % 7); // Find first Saturday
        
                if (firstSaturday === day) {
                    return `${firstSaturday} ${daysData[2].name}`;
                }
            
                let thirdSaturday = firstSaturday + 14; // Third Saturday
                if (thirdSaturday === day) {
                    return `${thirdSaturday} ${daysData[3].name}`;
                }
                else{return day}
        }
        else{return day}
       
}

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
    let date = new Date();
    let day = date.getDate(); 
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Find first day of the month and its weekday
    let firstDayInWeek = new Date(year, month - 1, 1).getDay(); 
    console.log(firstDayInWeek + "  " + "Find first day of the month and its weekday"); 
    let totalDaysInMonth = new Date(year, month, 0).getDate(); 
    console.log(totalDaysInMonth + "  " + "totalDaysInMonth");

    // Weekday names starting from Monday
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
    let adjustedFirstDay = firstDayInWeek === 0 ? 6 : firstDayInWeek - 1;

    // Add empty cells before the first day
    for (let i = 0; i < adjustedFirstDay; i++) {
        let emptyCell = document.createElement("td");
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
