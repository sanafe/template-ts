import { ClockController } from "./clock-controller";
import "../index.css";

// Define the ClockView class for managing the UI
export class ClockView {
  private elementId: string;
  private controller: ClockController;
  private incrementButton: HTMLElement;
  private container: HTMLElement;
  private timeElement: HTMLElement;

  constructor(elementId: string) {
    this.elementId = elementId;
    this.createClockElement();
    this.createButtonsElement();
  }

  updateTimeInElement(timeString: string) {
    // Explicitly specifying the type as string
    if (this.timeElement) {
      this.timeElement.textContent = timeString;
    }
  }

  displayTime(time: Date) {
    this.updateTimeInElement(time.toLocaleTimeString());
  }

  createClockElement() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", this.elementId);
    const mainContainer = document.querySelector("#main-container");
    mainContainer.appendChild(this.container);
  }
  createButtonsElement() {
    this.timeElement = document.createElement("div");
    this.container.appendChild(this.timeElement);
    const buttons = document.createElement("div");
    this.container.appendChild(buttons);

    const modeButton = document.createElement("button");
    this.incrementButton = document.createElement("button");
    const toggleTheme = document.createElement("button");
    const resetButton = document.createElement("button");
    resetButton.addEventListener("click",()=>{
      console.log("reset button clicked!")
      this.controller.handleResetTime();
    });
    toggleTheme.textContent = "Toggle Theme";
    resetButton.textContent="Reset"
    toggleTheme.addEventListener("click", () => {
      console.log("theme clicked");
      this.controller.handleToggleTheme();
    });
    toggleTheme.classList.add("light-off");
    this.incrementButton.setAttribute("disabled", "");
    modeButton.textContent = "Mode";
    this.incrementButton.textContent = "Increment";
    modeButton.addEventListener("click", () => {
      this.controller.handleModeClicked();
    });
    this.incrementButton.addEventListener("click", () => {
      this.controller.handleIncrement();
    });
    buttons.appendChild(modeButton);
    buttons.appendChild(this.incrementButton);
    buttons.appendChild(toggleTheme);
    buttons.appendChild(resetButton);
  }

  changeIncrementButton(mode: 0 | 1 | 2) {
    if (mode !== 0) {
      this.incrementButton.removeAttribute("disabled");
    }
    if (mode == 1) {
      this.incrementButton.textContent = "Increment Hour";
    }
    if (mode == 2) {
      this.incrementButton.textContent = "Increment Minute";
    }
    if (mode == 0) {
      this.incrementButton.textContent = "Increment";
      this.incrementButton.setAttribute("disabled", "");
    }
  }
  toggleTheme(light: boolean): void {
    const element = document.getElementById(this.elementId);
    if (light) {
      element.classList.remove("light-off");
      element.classList.add("light-on");
    } else {
      element.classList.remove("light-on");
      element.classList.add("light-off");
    }
  }
  setId(id: string): void {
    this.elementId = id;
    const div = document.getElementById(this.elementId);
    if (div) {
      div.setAttribute("id", this.elementId);
    }
  }
  setController(controller: ClockController): void {
    this.controller = controller;
  }
}
