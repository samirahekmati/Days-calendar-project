import { findEventDate } from "./common.mjs";

describe("findEventDate", () => {
  const daysData = [
    { name: "Ada Lovelace Day" }, // Second Tuesday of October
    { name: "International Binturong Day" }, // Second Saturday of May
    { name: "International Vulture Awareness Day" }, // First Saturday of September
    { name: "International Red Panda Day" }, // Third Saturday of September
    { name: "World Lemur Day" }, // Last Friday of October
  ];

  test("should return event name for Ada Lovelace Day (Second Tuesday in October)", () => {
    expect(findEventDate(daysData, 2023, 10, 10)).toBe("10 Ada Lovelace Day");
  });

  test("should return event name for World Lemur Day (Last Friday in October)", () => {
    expect(findEventDate(daysData, 2023, 10, 27)).toBe("27 World Lemur Day");
  });

  test("should return event name for International Binturong Day (Second Saturday in May)", () => {
    expect(findEventDate(daysData, 2023, 5, 13)).toBe(
      "13 International Binturong Day"
    );
  });

  test("should return event name for International Vulture Awareness Day (First Saturday in September)", () => {
    expect(findEventDate(daysData, 2023, 9, 2)).toBe(
      "2 International Vulture Awareness Day"
    );
  });

  test("should return event name for International Red Panda Day (Third Saturday in September)", () => {
    expect(findEventDate(daysData, 2023, 9, 16)).toBe(
      "16 International Red Panda Day"
    );
  });

  test("should return only the day if no special event matches", () => {
    expect(findEventDate(daysData, 2023, 7, 15)).toBe(15); // A date without a special event
  });
});
