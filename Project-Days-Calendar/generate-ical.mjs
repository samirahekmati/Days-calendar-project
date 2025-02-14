// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

//import daysData from "./days.json" with { type: "json" };
const daysData = JSON.parse(fs.readFileSync("./days.json", "utf8"));
console.log(` there are ${daysData.length} known days`);

import fs from "fs"; //  imports the File System (fs) module in Node.js.

import { createEvents } from "ics";
import { findEventDate } from "./common.mjs";


  
function generateICSEvents(startYear, endYear, daysData) {
    let events = [];
  
    for (let year = startYear; year <= endYear; year++) {
      for (let dayData of daysData) {
        const { name, monthName, descriptionURL } = dayData;
  
        // Convert month name to number (January = 1, ..., December = 12)
        const month = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
  
        // Find the correct event date for this year and month
        let correctDay = null;
        for (let day = 1; day <= 31; day++) {
          let eventResult = findEventDate(daysData, year, month, day);
  
          if (typeof eventResult === "string" && eventResult.includes(name)) {
            correctDay = day;
            break; // ✅ Stop after finding the first correct date
          }
        }
  
        if (correctDay !== null) {
          console.log(`✅ Adding Event: ${name} on ${year}-${month}-${correctDay}`);
  
          events.push({
            title: name,
            start: [year, month, correctDay],
            duration: { hours: 24 },
            description: `More info: ${descriptionURL}`,
          });
        }
      }
    }
  
    createEvents(events, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }
      fs.writeFileSync("events.ics", value);
      console.log("✅ ICS file generated: events.ics");
    });
  }

  generateICSEvents(2020, 2030,daysData);
  
  export { generateICSEvents };