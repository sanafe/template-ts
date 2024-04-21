// Define the ClockView class for managing the UI
export class ClockView {

  private elementId: string = "clock";

  constructor() {
    const container = document.querySelector("#clock-container");
    const div = document.createElement("div");
    div.setAttribute("id", this.elementId);
    container.appendChild(div);
  }

  updateTimeInElement(timeString: string) { // Explicitly specifying the type as string
    document.getElementById(this.elementId).textContent = timeString;
  }

  displayTime(time: Date) { 
    this.updateTimeInElement(time.toLocaleTimeString());
  }

}
