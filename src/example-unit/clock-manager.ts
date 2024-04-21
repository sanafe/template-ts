// clock-manager.ts
import { Clock } from "./clock";
import { ClockView } from "./clock-view";
import { ClockController } from "./clock-controller";

export class ClockManager {
  private clocks: Map<string, Clock>;
  private clockViews: Map<string, ClockView>;

  constructor() {
    this.clocks = new Map();
    this.clockViews = new Map();
  }

  createClock(timeZoneOffset: number): Clock {
    const clockId = `clock-${Date.now()}`;
    const newClockView = new ClockView(clockId);
    const newClock = new Clock(newClockView);
    const newClockController = new ClockController(newClock);
    newClockView.setController(newClockController);
    newClock.setTimeZone(timeZoneOffset); 
    this.clocks.set(clockId, newClock);
    this.clockViews.set(clockId, newClockView);

    console.log("New clock added with ID:", clockId);
    return newClock;
  }
}
