// Imports the ClockController class to manage clock logic and includes the main stylesheet for styling.
import { ClockController } from "./clock-controller";
import "../index.css";

// Define the ClockView class for managing the user interface of the clock application.
export class ClockView {
  private elementId: string; // Id for the HTML element containing the clock.
  private controller: ClockController; // Instance of ClockController to handle interactions.
  private incrementButton: HTMLElement; // Button for incrementing clock time.
  private container: HTMLElement; // Container element for the clock components.
  private timeElement: HTMLElement; // HTML element to display the time.

  // Constructor initializes the clock view with an element ID and creates its HTML components.
  constructor(elementId: string) {
    this.elementId = elementId;
    this.createClockElement();
    this.createButtons();
  }

  // Updates the display of the clock time in the designated HTML element.
  updateTimeInElement(timeString: string) {
    if (this.timeElement) {
      this.timeElement.textContent = timeString;
    }
  }

  // Formats and displays the time based on the provided Date object and format preference.
  displayTime(time: Date, hour12Format: boolean = true) {
    this.updateTimeInElement(time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: hour12Format 
    }));
  }

  // Constructs the primary visual structure of the clock on the webpage.
  createClockElement() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", this.elementId);
    this.container.classList.add("clock");
    const mainContainer = document.querySelector("#main-container");
    this.timeElement = document.createElement("div");
    this.container.appendChild(this.timeElement);
    mainContainer.appendChild(this.container);
  }

  // Helper method to create a button element with specified text and an event listener.
  private createButton(text: string, clickHandler: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  // Creates and appends a mode-switching button to the main clock container.
  private createModeButton(): void {
    const modeButton = this.createButton("Mode", () => {
      this.controller.handleModeClicked();
    });
    this.container.appendChild(modeButton);
  }

  // Creates and appends an increment button that is initially disabled.
  private createIncrementButton(): void {
    this.incrementButton = this.createButton("Increment", () => {
      this.controller.handleIncrement();
    });
    this.incrementButton.setAttribute("disabled", "");
    this.container.appendChild(this.incrementButton);
  }

  // Creates and appends a theme toggle button.
  private createToggleThemeButton(): void {
    const toggleThemeButton = this.createButton("Toggle Theme", () => {
      this.controller.handleToggleTheme();
    });
    this.container.appendChild(toggleThemeButton);
  }

  // Creates and appends a reset button to clear current time settings.
  private createResetButton(): void {
    const resetButton = this.createButton("Reset", () => {
      this.controller.handleResetTime();
    });
    this.container.appendChild(resetButton);
  }

  // Creates and appends a button to toggle between 12-hour and 24-hour time formats.
  private createToggleHour12Button(): void {
    const toggleHour12Button = this.createButton("Toggle Format", () => {
      this.controller.handleToggleHour12Format();
    });
    this.container.appendChild(toggleHour12Button);
  }

  // Assembles all buttons and places them into the clock's interface.
  private createButtons(): void {
    this.createModeButton();
    this.createIncrementButton();
    this.createToggleThemeButton();
    this.createResetButton();
    this.createToggleHour12Button();
  }

  // Adjusts the increment button's state based on the selected mode.
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

  // Toggles the theme between light and dark based on the given boolean value.
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

  // Sets a new ID for the clock's main HTML element.
  setId(id: string): void {
    this.elementId = id;
    const div = document.getElementById(this.elementId);
    if (div) {
      div.setAttribute("id", this.elementId);
    }
  }

  // Assigns a controller to manage this view's interactions.
  setController(controller: ClockController): void {
    this.controller = controller;
  }
}
