// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
    return "Hello";
}

export function findEventDate(daysData, year, month, day){

    if(month == 10){
        
            const firstDayOfOctober = new Date(year, 9, 1).getDay(); // Get first day of October
            const firstTuesday = (firstDayOfOctober <= 2) ? (3 - firstDayOfOctober) + 1 : (10 - firstDayOfOctober) + 1;
            const secondTuesday = firstTuesday + 6; // Second Tuesday
            if(secondTuesday == day){return `${secondTuesday} ${daysData[0].name}`}
            
            const lastDayOfOctober = new Date(year, 9, 31).getDay(); // Get the weekday of October 31
            const lastFriday = 31 - ((lastDayOfOctober - 5 + 7) % 7); // Find last Friday
            if (lastFriday === day) {return `${lastFriday} ${daysData[4].name}`}
            else{return day}
     
    }
    else if(month == 5){
            const firstDayOfMay = new Date(year, 4, 1).getDay(); // May 1st
            const firstSaturday = 1 + ((6 - firstDayOfMay + 7) % 7); // Find first Saturday
            const secondSaturday = firstSaturday + 7; // Second Saturday

            if (secondSaturday === day) { return `${secondSaturday} ${daysData[1].name}`;}
            else {return day}
    }
    else if(month === 9) { // September (Month index 8)
    
            const firstDayOfSeptember = new Date(year, 8, 1).getDay(); // September 1st
            const firstSaturday = 1 + ((6 - firstDayOfSeptember + 7) % 7); // Find first Saturday
    
            if (firstSaturday === day) {
                return `${firstSaturday} ${daysData[2].name}`;
            }
        
            const thirdSaturday = firstSaturday + 14; // Third Saturday
            if (thirdSaturday === day) {
                return `${thirdSaturday} ${daysData[3].name}`;
            }
            else{return day}
    }
    else{return day}
   
}
