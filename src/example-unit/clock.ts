import { ClockView } from "./clock-view";

// Define the Clock class that includes the clock functionalities

export class Clock {
  private clockView: ClockView;
  private time: Date;
  private mode: 0 | 1 | 2;
  private light: boolean;
  private timeZoneOffset: number;
  private timer: NodeJS.Timer;
  private hour12Format: boolean;

  constructor(clockView: ClockView, timeZoneOffset?: number) {
    this.clockView = clockView;
    this.mode = 0;
    this.timer = null;
    this.hour12Format = true; // AM / PM
    this.light = true;
    this.setTimeZone(timeZoneOffset || 1); // UTC+1 Paris Time
  }

  setTime(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    // Update time every second
    if (this.timer === null) {
      const updateTime = () => {
        this.time.setSeconds(this.time.getSeconds() + 1);
        this.clockView.displayTime(this.time, this.hour12Format);
      };
      // show time immediately
      updateTime();
      this.timer = setInterval(updateTime, 1000);
    }
  }
  setTimeZone(offset: number): void {
    this.timeZoneOffset = offset; // Update the stored time zone offset
    this.updateTimeForCurrentTimezone();
  }
  updateTimeForCurrentTimezone(): void {
    if (this.timeZoneOffset === undefined) {
      return;
    }
    // Update the current time by adding the offset difference
    const utcDate = this.getUtcTime();
    this.time = new Date(utcDate.getTime() + this.timeZoneOffset * 60 * 60000); // 60 minutes per hour, 60000 ms per minute
    this.setTime();
    console.log(`Time zone set to UTC${this.timeZoneOffset >= 0 ? "+" : ""}${this.timeZoneOffset}, current time updated.`);
  }

  getUtcTime(): Date {
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return utcTime;
  }
  
  changeMode(): void {
    this.mode++;
    if (this.mode > 2) {
      this.mode = 0;
    }
    console.log(this.mode);
    this.clockView.changeIncrementButton(this.mode as 0 | 1 | 2);
  }
  increment(): void {
    if (this.mode === 1) {
      this.incrementHour();
    }
    if (this.mode === 2) {
      this.incrementMinute();
    }
    this.setTime();
  }
  incrementHour(): void {
    this.time.setHours(this.time.getHours() + 1);
  }

  incrementMinute(): void {
    this.time.setMinutes(this.time.getMinutes() + 1);
  }
  toggleTheme(): void {
    this.light = !this.light;
    this.clockView.toggleTheme(this.light);
  }
  resetTime(): void {
    this.updateTimeForCurrentTimezone();
  }
  toggleHour12Format(): void {
    this.hour12Format = !this.hour12Format;
    this.clockView.displayTime(this.time, this.hour12Format);
  }
}
