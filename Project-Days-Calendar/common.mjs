export function findEventDate(daysData, year, month, day) {
  if (month == 10) {
    const firstDayOfOctober = new Date(year, 9, 1).getDay(); // Get first day of October
    const firstTuesday =
      firstDayOfOctober <= 2
        ? 3 - firstDayOfOctober + 1
        : 10 - firstDayOfOctober + 1;
    const secondTuesday = firstTuesday + 6; // Second Tuesday

    if (secondTuesday == day) {
      const result = {
        day1: secondTuesday,
        eventName: daysData[0].name,
        url: daysData[0].descriptionURL,
      };
      return result;
    }

    const lastDayOfOctober = new Date(year, 9, 31).getDay(); // Get the weekday of October 31
    const lastFriday = 31 - ((lastDayOfOctober - 5 + 7) % 7); // Find last Friday
    if (lastFriday === day) {
      const result = {
        day1: lastFriday,
        eventName: daysData[4].name,
        url: daysData[4].descriptionURL,
      };
      return result;
    } //`${lastFriday} ${daysData[4].name}`
    else {
      const result = {
        day1: day,
        eventName: "",
        url: "",
      };

      return result;
    }
  } else if (month == 5) {
    const firstDayOfMay = new Date(year, 4, 1).getDay(); // May 1st
    const firstSaturday = 1 + ((6 - firstDayOfMay + 7) % 7); // Find first Saturday
    const secondSaturday = firstSaturday + 7; // Second Saturday

    if (secondSaturday === day) {
      const result = {
        day1: secondSaturday,
        eventName: daysData[1].name,
        url: daysData[1].descriptionURL,
      };
      return result;
    } else {
      const result = {
        day1: day,
        eventName: "",
        url: "",
      };
      return result;
    }
  } else if (month === 9) {
    // September (Month index 8)

    const firstDayOfSeptember = new Date(year, 8, 1).getDay(); // September 1st
    const firstSaturday = 1 + ((6 - firstDayOfSeptember + 7) % 7); // Find first Saturday

    if (firstSaturday === day) {
      const result = {
        day1: firstSaturday,
        eventName: daysData[2].name,
        url: daysData[2].descriptionURL
      };
      return result;
    }

    const thirdSaturday = firstSaturday + 14; // Third Saturday
    if (thirdSaturday === day) {
      const result = {
        day1: thirdSaturday,
        eventName: daysData[3].name,
        url: daysData[3].descriptionURL,
      };
      return result;
    } else {
      const result = {
        day1: day,
        eventName: "",
        url: "",
      };
      return result;
    }
  } else {
    const result = {
      day1: day,
      eventName: "",
      url: "",
    };
    return result;
  }
}
