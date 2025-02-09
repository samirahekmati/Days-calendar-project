// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

console.log(`{getGreeting()} - there are ${daysData.length} known days`);

let date1 = new Date();
let day = date1.getDate();
let month = date1.getMonth() + 1;
let year = date1.getFullYear();
let lengthMonth = (year, month) => new Date(year, month, 0).getDate();
let firstDay = (new Date(`${month}/${1}/${year}`));
let strFirstDay = firstDay.toString();
let startDayName = strFirstDay.slice(0,3);
console.log(date1);
console.log(day);
console.log(month);
console.log(year);
console.log(day - (day - 1));
console.log(firstDay.toString())
console.log(typeof(strFirstDay))
console.log(lengthMonth(year, month));
console.log(startDayName);
console.log(new Date(year, 9, 31).getDay())


