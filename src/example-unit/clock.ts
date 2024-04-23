// Import ClockView class
import { ClockView } from "./clock-view";

// Define the Clock class
export class Clock {
  private clockView: ClockView; // Instance of ClockView to manage visual display
  private time: Date; // Current time
  private mode: 0 | 1 | 2; // Current mode of the clock (0: disable, 1: increment hour, 2: increment minute)
  private light: boolean; // Theme of the clock (light or dark) Default to light
  private timeZoneOffset: number; // Time zone offset from UTC
  private timer: NodeJS.Timer; // Timer object for clock updates
  private hour12Format: boolean; // Format of the clock (12-hour or 24-hour)

  constructor(clockView: ClockView, timeZoneOffset?: number) {
    this.clockView = clockView; // Set the clock view
    this.mode = 0; // Default mode
    this.timer = null; // Timer is initially not set
    this.hour12Format = true; // Default to 12-hour format
    this.light = true; // Default to light theme
    this.setTimeZone(timeZoneOffset || 1); // Set default or provided time zone
  }

  // Method to set the clock time updates
  private setTime(): void {
    if (this.timer !== null) {
      clearInterval(this.timer); // Clear the existing timer
      this.timer = null; // Reset timer variable
    }
    if (this.timer === null) {
      const updateTime = () => {
        this.time.setSeconds(this.time.getSeconds() + 1); // Increment time by one second
        this.clockView.displayTime(this.time, this.hour12Format); // Update display
      };
      updateTime(); // Display time immediately
      this.timer = setInterval(updateTime, 1000); // Set interval for continuous updates
    }
  }

  // Method to set the clock's time zone
  private setTimeZone(offset: number): void {
    this.timeZoneOffset = offset; // Store the offset
    this.updateTimeForCurrentTimezone(); // Update the clock's time to the new time zone
  }

  // Helper method to update the time for the current time zone
  private updateTimeForCurrentTimezone(): void {
    if (this.timeZoneOffset === undefined) return;
    const utcDate = this.getUtcTime(); // Calculate current UTC time
    this.time = new Date(utcDate.getTime() + this.timeZoneOffset * 60 * 60000); // Adjust time according to the offset
    this.setTime(); // Update the display
    console.log(`Time zone set to UTC${this.timeZoneOffset >= 0 ? "+" : ""}${this.timeZoneOffset}, current time updated.`);
  }

  // Retrieve the current UTC time
  private getUtcTime(): Date {
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return utcTime;
  }

  // Method to change the clock mode
  changeMode(): void {
    this.mode++;
    if (this.mode > 2) {
      this.mode = 0;
    }
    console.log(this.mode);
    this.clockView.changeIncrementButton(this.mode as 0 | 1 | 2);
  }

  // Method to increment time based on current mode
  increment(): void {
    if (this.mode === 1) {
      this.incrementHour();
    }
    if (this.mode === 2) {
      this.incrementMinute();
    }
    this.setTime();
  }

  // Helper method to increment hour
  private incrementHour(): void {
    this.time.setHours(this.time.getHours() + 1);
  }

  // Helper method to increment minute
  private incrementMinute(): void {
    this.time.setMinutes(this.time.getMinutes() + 1);
  }

  // Toggle the light/dark theme
  toggleTheme(): void {
    this.light = !this.light;
    this.clockView.toggleTheme(this.light);
  }

  // Reset the clock to the current time zone time
  resetTime(): void {
    this.updateTimeForCurrentTimezone();
  }

  // Toggle between 12-hour and 24-hour formats
  toggleHour12Format(): void {
    this.hour12Format = !this.hour12Format;
    this.clockView.displayTime(this.time, this.hour12Format);
  }
}
