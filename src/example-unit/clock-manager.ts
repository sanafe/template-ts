// clock-manager.ts
import { Clock } from './clock';
import { ClockView } from './clock-view';
import { ClockController } from './clock-controller';

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
        // newClockView.setId(clockId); // Set the ID for the view
        const newClock = new Clock(newClockView);
        const newClockController = new ClockController(newClock);
        newClockView.setController(newClockController);
        
        // Generate a unique ID, here using a simple timestamp-based method for demonstration
        newClock.setTimeZone(timeZoneOffset); // Set the timezone offset
        
        // Store the clock and its view in the maps
        this.clocks.set(clockId, newClock);
        this.clockViews.set(clockId, newClockView);

        console.log("New clock added with ID:", clockId);
        return newClock;
    }

    // Example method to remove a clock by ID
    removeClock(clockId: string): void {
        if (this.clocks.has(clockId)) {
            this.clocks.delete(clockId);
            this.clockViews.delete(clockId);
            console.log("Clock removed with ID:", clockId);
        }
    }
}
