// Import the ClockManager class
import { ClockManager } from "./example-unit/clock-manager";

// Create the main container div to hold the clocks and other UI elements
const container = document.createElement("div");
container.setAttribute("id", "main-container");

// Create a select element for choosing time zones
const timeZoneSelect = document.createElement("select");
timeZoneSelect.setAttribute("id", "time-zone-select");

// Define common time zones with labels and corresponding UTC offsets
const timeZones = [
    { label: "UTC-12", value: -12 },
    { label: "UTC-11", value: -11 },
    { label: "UTC-10", value: -10 },
    { label: "UTC-9", value: -9 },
    { label: "UTC-8", value: -8 },
    { label: "UTC-7", value: -7 },
    { label: "UTC-6", value: -6 },
    { label: "UTC-5", value: -5 },
    { label: "UTC-4", value: -4 },
    { label: "UTC-3", value: -3 },
    { label: "UTC-2", value: -2 },
    { label: "UTC-1", value: -1 },
    { label: "UTC", value: 0 },
    { label: "UTC+1", value: 1 },
    { label: "UTC+2", value: 2 },
    { label: "UTC+3", value: 3 },
    { label: "UTC+4", value: 4 },
    { label: "UTC+5", value: 5 },
    { label: "UTC+6", value: 6 },
    { label: "UTC+7", value: 7 },
    { label: "UTC+8", value: 8 },
    { label: "UTC+9", value: 9 },
    { label: "UTC+10", value: 10 },
    { label: "UTC+11", value: 11 },
    { label: "UTC+12", value: 12 },
];

// Fill the time zone dropdown with options from the 'timeZones' array.
timeZones.forEach(timeZone => {
    const option = document.createElement("option");
    option.textContent = timeZone.label; // Set display text
    option.value = timeZone.value.toString(); // Set the value of the option
    timeZoneSelect.appendChild(option); // Add the option to the select element
});

// Add the dropdown to the main container
container.appendChild(timeZoneSelect);

// Set the default selected time zone to UTC
timeZoneSelect.selectedIndex = 14; // UTC (index 14 in the array)

// Create a button for adding new clocks
const addButton = document.createElement("button");
addButton.textContent = "Add Clock"; // Set button text
addButton.addEventListener("click", () => {
    // Create an instance of ClockManager when button is clicked
    const clockManager = new ClockManager();
    // Retrieve the selected time zone offset from the dropdown
    const selectedTimeZoneOffset = parseInt(timeZoneSelect.value, 10);
    // Use ClockManager to create a clock with the selected time zone
    clockManager.createClock(selectedTimeZoneOffset);
});
// Add the add clock button to the container
container.appendChild(addButton);

// Append the main container to the document body
document.body.appendChild(container);
