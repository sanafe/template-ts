import { Clock } from "./clock";
import { ClockController } from "./clock-controller";
import "../index.css"

// Define the ClockView class for managing the UI
export class ClockView {

  private elementId: string;
  private controller: ClockController;
  private incrementButton: HTMLElement ;

  constructor(elementId: string) {
    this.elementId = elementId;
    this.createClockElement();
    this.createButtonsElement();
  }

  updateTimeInElement(timeString: string) { // Explicitly specifying the type as string
    const element = document.getElementById(this.elementId);
    if (element){
      element.textContent = timeString;
    }
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
    const toggleTheme = document.createElement("button");
    toggleTheme.setAttribute("id", "toggleTheme");
    toggleTheme.textContent = "Toggle Theme";
    toggleTheme.addEventListener("click",()=>{
      console.log("theme clicked");
      this.controller.handleToggleTheme();
    });
    toggleTheme.classList.add("light-off");
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
      this.controller.handleIncrement();
    });
    buttons.appendChild(mode);
    buttons.appendChild(this.incrementButton);
    buttons.appendChild(toggleTheme);
  }

  changeIncrementButton(mode:0 | 1 | 2){
    if (mode !== 0){
      this.incrementButton.removeAttribute("disabled");
    }
    if (mode == 1){
      this.incrementButton.textContent='Increment Hour';
    }
    if (mode == 2){
      this.incrementButton.textContent='Increment Minute';
    }
    if (mode == 0){
      this.incrementButton.textContent='Increment';
      this.incrementButton.setAttribute("disabled", "");
    }
  }
  toggleTheme(light:boolean):void{
    const element = document.getElementById(this.elementId);
    if (light){
      element.classList.remove("light-off");
      element.classList.add("light-on");
    }
    else{
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
