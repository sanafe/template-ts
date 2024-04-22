// clock-manager.ts
import { Clock } from "./clock";
import { ClockView } from "./clock-view";
import { ClockController } from "./clock-controller";

export class ClockManager {

  createClock(timeZoneOffset: number): void {
    const clockId = `clock-${Date.now()}`;
    const newClockView = new ClockView(clockId);
    const newClock = new Clock(newClockView, timeZoneOffset);
    const newClockController = new ClockController(newClock);
    newClockView.setController(newClockController);
    console.log("New clock added with ID:", clockId);
  }
}
