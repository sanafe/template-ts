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
    this.createButtons();
  }

  updateTimeInElement(timeString: string) {
    // Explicitly specifying the type as string
    if (this.timeElement) {
      this.timeElement.textContent = timeString;
    }
  }

  displayTime(time: Date, hour12Format: boolean = true) {
    this.updateTimeInElement(time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: hour12Format 
    }));
  }

  createClockElement() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", this.elementId);
    this.container.classList.add("clock");
    const mainContainer = document.querySelector("#main-container");
    mainContainer.appendChild(this.container);
  }
  private createButton(text: string, clickHandler: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  private createModeButton(): void {
    const modeButton = this.createButton("Mode", () => {
      this.controller.handleModeClicked();
    });
    this.container.appendChild(modeButton);
  }

  private createIncrementButton(): void {
    this.incrementButton = this.createButton("Increment", () => {
      this.controller.handleIncrement();
    });
    this.incrementButton.setAttribute("disabled", "");
    this.container.appendChild(this.incrementButton);
  }

  private createToggleThemeButton(): void {
    const toggleThemeButton = this.createButton("Toggle Theme", () => {
      this.controller.handleToggleTheme();
    });
    toggleThemeButton.classList.add("light-off");
    this.container.appendChild(toggleThemeButton);
  }

  private createResetButton(): void {
    const resetButton = this.createButton("Reset", () => {
      this.controller.handleResetTime();
    });
    this.container.appendChild(resetButton);
  }

  private createToggleHour12Button(): void {
    const toggleHour12Button = this.createButton("Toggle Format", () => {
      this.controller.handleToggleHour12Format();
    });
    this.container.appendChild(toggleHour12Button);
  }

  private createButtons(): void {
    this.timeElement = document.createElement("div");
    this.container.appendChild(this.timeElement);

    this.createModeButton();
    this.createIncrementButton();
    this.createToggleThemeButton();
    this.createResetButton();
    this.createToggleHour12Button();
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
