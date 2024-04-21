import { Clock } from "./clock";
import { ClockController } from "./clock-controller";

// Define the ClockView class for managing the UI
export class ClockView {

  private elementId: string = "clock";
  private controller: ClockController;
  private incrementButton: HTMLElement ;

  constructor() {
    this.createClockElement();
    this.createButtonsElement();
    this.controller = new ClockController(this);
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
    this.incrementButton=document.createElement("button");
    mode.setAttribute("id", "mode");
    this.incrementButton.setAttribute("id", "increment");
    this.incrementButton.setAttribute("disabled", "");
    mode.textContent = 'Mode';
    this.incrementButton.textContent='Increment';
    mode.addEventListener('click', () => {
      // This function will be called when the button is clicked
      console.log('Button clicked!');
      this.controller.handleModeClicked();
    });
    this.incrementButton.addEventListener('click',()=>{
      console.log('increment clicked!');
    });
    buttons.appendChild(mode);
    buttons.appendChild(this.incrementButton);
  }

  changeIncrementButton(mode:0 | 1 | 2){
    if (mode !== 0){
      this.incrementButton.removeAttribute("disabled");
    }
    if (mode == 1){
      this.incrementButton.textContent='Increment Minute';
    }
    if (mode == 2){
      this.incrementButton.textContent='Increment Hour';
    }
    if (mode == 0){
      this.incrementButton.textContent='Increment';
      this.incrementButton.setAttribute("disabled", "");
    }
    
  }
}
