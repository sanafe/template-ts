import { ClockManager } from "./example-unit/clock-manager";

// main container for all clocks
const container = document.createElement("div");
container.setAttribute("id", "main-container");

// dropdown for time zone selection
const timeZoneSelect = document.createElement("select");
timeZoneSelect.setAttribute("id", "time-zone-select");

// some common time zone options
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

timeZones.forEach(timeZone => {
    const option = document.createElement("option");
    option.textContent = timeZone.label;
    option.value = timeZone.value.toString();
    timeZoneSelect.appendChild(option);
});

container.appendChild(timeZoneSelect);
timeZoneSelect.selectedIndex = 14;
// Create a button to add clocks
const addButton = document.createElement("button");
addButton.textContent = "Add Clock";
addButton.addEventListener("click", () => {
    const clockManager = new ClockManager();
    const selectedTimeZoneOffset = parseInt(timeZoneSelect.value, 10);
    clockManager.createClock(selectedTimeZoneOffset);
});
container.appendChild(addButton);

// Append the container to the document body
document.body.appendChild(container);
