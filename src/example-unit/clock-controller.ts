import { Clock } from "./clock";
import { ClockView } from "./clock-view";

// Define the ClockController class that acts as the mediator
export class ClockController {
  private clock: Clock;
  private clockView: ClockView;

  constructor(clockView: ClockView) {
    this.clockView = clockView;
    this.clock = new Clock(clockView);
  }
  handleModeClicked(){
    this.clock.changeMode();
}
handleIncrement(){
  this.clock.increment();
};
handleToggleTheme(){
  this.clock.toggleTheme();
};
}