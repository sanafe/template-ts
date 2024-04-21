import { ClockController } from "./clock-controller";

// Define the ClockView class for managing the UI
export class ClockView {

  private elementId: string = "clock";
  private viewController: ClockController;

  constructor() {
    this.createClockElement();
    this.createButtonsElement();
  }

  updateTimeInElement(timeString: string) { // Explicitly specifying the type as string
    document.getElementById(this.elementId).textContent = timeString;
  }

  displayTime(time: Date) { 
    this.updateTimeInElement(time.toLocaleTimeString());
  }

  createClockElement(){
    const container = document.querySelector("#clock-container");
    const div = document.createElement("div");
    div.setAttribute("id", this.elementId);
    container.appendChild(div);
  }
  createButtonsElement(){
    const buttons = document.querySelector("#buttons");
    const mode=document.createElement("button");
    mode.setAttribute("id", "mode");
    mode.textContent = 'Mode';
    mode.addEventListener('click', () => {
      // This function will be called when the button is clicked
      console.log('Button clicked!');
    });
    buttons.appendChild(mode);
  }



}
