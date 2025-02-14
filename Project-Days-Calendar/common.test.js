import { findEventDate } from "./common.mjs";

describe("findEventDate", () => {
  const daysData = [
    {
      name: "Ada Lovelace Day",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/ada.txt",
    },
    {
      name: "International Binturong Day",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt",
    },
    {
      name: "International Vulture Awareness Day",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/vultures.txt",
    },
    {
      name: "International Red Panda Day",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/red-pandas.txt",
    },
    {
      name: "World Lemur Day",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt",
    },
  ];

  test("should return correct object - Second Tuesday in October ", () => {
    const result = findEventDate(daysData, 2023, 10, 10);
    expect(result).toEqual({
      day1: 10,
      eventName: "Ada Lovelace Day",
      url: "https://codeyourfuture.github.io/The-Piscine/days/ada.txt",
    });
  });

  test("should return correct object - Last Friday in October ", () => {
    const result = findEventDate(daysData, 2023, 10, 27);
    expect(result).toEqual({
      day1: 27,
      eventName: "World Lemur Day",
      url: "https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt",
    });
  });

  test("should return correct object which is Second Saturday in May", () => {
    const result = findEventDate(daysData, 2023, 5, 13);
    expect(result).toEqual({
      day1: 13,
      eventName: "International Binturong Day",
      url: "https://codeyourfuture.github.io/The-Piscine/days/binturongs.txt",
    });
  });

  test("should return correct object (First Saturday in September)", () => {
    const result = findEventDate(daysData, 2023, 9, 2);
    expect(result).toEqual({
      day1: 2,
      eventName: "International Vulture Awareness Day",
      url: "https://codeyourfuture.github.io/The-Piscine/days/vultures.txt",
    });
  });

  test("should return correct object ==>For Third Saturday in September", () => {
    const result = findEventDate(daysData, 2023, 9, 16);
    expect(result).toEqual({
      day1: 16,
      eventName: "International Red Panda Day",
      url: "https://codeyourfuture.github.io/The-Piscine/days/red-pandas.txt",
    });
  });

  test("should return an object with only the day if no special event matches", () => {
    const result = findEventDate(daysData, 2023, 7, 15);
    expect(result).toEqual({
      day1: 15,
      eventName: "",
      url: "",
    });
  });
});
