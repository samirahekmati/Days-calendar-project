
import { findEventDate } from "./common.mjs";
import fs from "fs";
import fetch from "node-fetch";

const daysData = JSON.parse(fs.readFileSync("./days.json"));

async function fetchDescription(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return "No description available";
    }
}

async function generateICS() {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Custom Events//EN";
    
    for (let year = 2020; year <= 2030; year++) {
        for (let month = 1; month <= 12; month++) {
            for (let day = 1; day <= 31; day++) {
                const event = findEventDate(daysData, year, month, day);
                if (event.eventName) {
                    let eventDate = new Date(year, month - 1, event.day1);
                    let dateString = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                    let description = event.url ? await fetchDescription(event.url) : "No description available";
                    
                    icsContent += `\nBEGIN:VEVENT\nSUMMARY:${event.eventName}\nDTSTART:${dateString}\nDTEND:${dateString}\nDESCRIPTION:${description}\nEND:VEVENT`;
                }
            }
        }
    }
    
    icsContent += "\nEND:VCALENDAR";
    
    fs.writeFileSync("events.ics", icsContent);
    console.log("ICS file created: events.ics");
}

generateICS();