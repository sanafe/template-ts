import { ClockView } from "./clock-view";

// Define the Clock class that includes the clock functionalities

export class Clock {
  private clockView: ClockView;
  private time: Date;
  private mode: 0 | 1 | 2;
  private light: boolean;
  private timeZoneOffset: number = 0; // default to UTC
  private timer: NodeJS.Timer;
  private hour12Format: boolean;

  constructor(clockView: ClockView) {
    this.clockView = clockView;
    this.mode = 0;
    this.timer = null;
    this.hour12Format = true; // AM / PM 
    this.setTime(new Date());
    this.setTimeZone(this.timeZoneOffset);
  }

  setTime(time: Date): void {
    this.time = time;

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    // Update time every second
    if (this.timer === null) {
      this.timer = setInterval(() => {
        this.time = new Date(this.time);
        this.time.setSeconds(this.time.getSeconds() + 1);
        this.clockView.displayTime(this.time, this.hour12Format);
      }, 1000);
    }
  }
  setTimeZone(offset: number): void {
    // Calculate the difference in minutes between the new offset and the current offset
    const offsetDifference = (offset - this.timeZoneOffset) * 60;
    this.timeZoneOffset = offset; // Update the stored time zone offset
    // Update the current time by adding the offset difference
    this.time = new Date(this.time.getTime() + offsetDifference * 60000); // 60000 ms per minute
    this.clockView.displayTime(this.time, this.hour12Format);
    console.log(`Time zone set to UTC${offset >= 0 ? "+" : ""}${offset}, current time updated.`);
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
    this.setTime(this.time);
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
    this.time = new Date();
    this.setTimeZone(this.timeZoneOffset);
  }
  toggleHour12Format(): void {
    this.hour12Format = !this.hour12Format;
    this.clockView.displayTime(this.time, this.hour12Format);
  }
}
