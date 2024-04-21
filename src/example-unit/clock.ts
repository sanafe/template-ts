import { ClockView } from './clock-view';

// Define the Clock class that includes the clock functionalities

export class Clock {

  private clockView: ClockView;
  private time: Date;

  constructor(clockView: ClockView) {
    this.clockView = clockView;
    this.setTime(new Date());
  }

  setTime(time: Date): void {
    this.time = time;
    // Update time every second
    setInterval(() => {
      this.time = new Date(this.time);
      this.time.setSeconds(this.time.getSeconds() + 1);
      this.clockView.displayTime(this.time);
    }, 1000);
  }
}
