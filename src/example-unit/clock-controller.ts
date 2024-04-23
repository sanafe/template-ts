// Import the Clock class from the "clock" module
import { Clock } from "./clock";

// Define the ClockController class to manage Clock instance interactions
export class ClockController {
  private clock: Clock; // Declare a private Clock type property to hold the Clock instance
  
  // Constructor to initialize the ClockController with a Clock instance
  constructor(clock: Clock) {
    this.clock = clock;
  }
  
  // Method to handle mode change action
  handleModeClicked() {
    this.clock.changeMode(); // Call changeMode method on the clock instance
  }

  // Method to handle increment action
  handleIncrement() {
    this.clock.increment(); // Call increment method on the clock instance
  }

  // Method to handle theme toggle action
  handleToggleTheme() {
    this.clock.toggleTheme(); // Call toggleTheme method on the clock instance
  }

  // Method to handle time reset action
  handleResetTime() {
    this.clock.resetTime(); // Call resetTime method on the clock instance
  }

  // Method to handle 12-hour format toggle action
  handleToggleHour12Format() {
    this.clock.toggleHour12Format(); // Call toggleHour12Format method on the clock instance
  }
}

