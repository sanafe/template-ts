import { Clock } from "./clock";
import { ClockView } from "./clock-view";
import { ClockController } from "./clock-controller";

export class ClockManager {
/**
 * Creates a new clock instance with a specified time zone offset.
 * This method initializes a new clock view and its corresponding clock model and controller,
 * assigning a unique ID to each clock based on the current timestamp. The new clock's view is linked to its controller.
 * It then logs the ID of the newly created clock to the console for tracking purposes.
 *
 * @param timeZoneOffset The offset, in hours, from UTC for the new clock.
 */
  createClock(timeZoneOffset: number): void {
    const clockId = this.generateClockId();
    const newClockView = new ClockView(clockId);
    const newClock = new Clock(newClockView, timeZoneOffset);
    const newClockController = new ClockController(newClock);
    newClockView.setController(newClockController);
    console.log("New clock added with ID:", clockId);
  }

  // generate a unique ID for each clock based on the current timestamp
  generateClockId(): string {
    return `clock-${Date.now()}`;
  }
}
