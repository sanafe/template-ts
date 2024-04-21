import { Clock } from "./clock";
import { ClockView } from "./clock-view";

// Define the ClockController class that acts as the mediator
export class ClockController {
  private clock: Clock;
  constructor(clock: Clock) {
    this.clock = clock;
  }
  handleModeClicked() {
    this.clock.changeMode();
  }
  handleIncrement() {
    this.clock.increment();
  }
  handleToggleTheme() {
    this.clock.toggleTheme();
  }
}
