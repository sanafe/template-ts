import { ClockManager } from "./example-unit/clock-manager";

// main container for all clocks
const container = document.createElement("div");
container.setAttribute("id", "main-container");
const addButton = document.createElement("button");
addButton.textContent = "Add Clock";
addButton.addEventListener("click", () => {
  const clockManager = new ClockManager();
  const timeZoneOffset = 0;
  clockManager.createClock(timeZoneOffset);
});
container.appendChild(addButton);
document.body.appendChild(container);
