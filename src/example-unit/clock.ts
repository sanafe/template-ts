import { ClockView } from './clock-view';

// Define the Clock class that includes the clock functionalities

export class Clock {

  private clockView: ClockView;
  private time: Date;
  private mode: 0 | 1 | 2;
  private modes:string[];

  constructor(clockView: ClockView) {
    this.clockView = clockView;
    this.setTime(new Date());
    this.setMode(0);
    this.modes = ['inactive', 'increaseMinutes', 'increaseHours'];
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
  setMode(mode: 0 | 1 | 2 ) {
    this.mode=mode;
  }
}
