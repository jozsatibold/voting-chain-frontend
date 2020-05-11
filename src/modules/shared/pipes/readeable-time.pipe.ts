import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "readableTime",
  pure: false
})
export class ReadeableTimePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: string | Date): string {
    return this.convertReadableDate(value);
  }

  convertReadableDate(value): string {
    const now = new Date();
    const date = new Date(value);
    const difference = now.getTime() - date.getTime();
    const seconds = Math.round(difference / 1000);
    if (seconds < 10) {
      return this.translate.instant("LBL_TIME.NOW");
    }
    if (seconds < 40) {
      return this.translate.instant("LBL_TIME.FEW_SEC");
    }
    const min = +Math.floor(seconds / 60).toFixed(0);
    if (min <= 1) {
      return this.translate.instant("LBL_TIME.MIN_AGO", { min: min || 1 });
    }

    if (min < 60) {
      return this.translate.instant("LBL_TIME.MINS_AGO", { min: min || 1 });
    }

    const hours = +Math.floor(min / 60).toFixed();
    if (hours === 1) {
      return this.translate.instant("LBL_TIME.HOUR_AGO");
    }
    if (hours < 10) {
      return this.translate.instant("LBL_TIME.HOURS_AGO", { hour: hours || 1 });
    }
    const mins = min % 60;
    if (hours < 24 && date.getDate() === now.getDate()) {
      const hoursString = hours < 9 ? `0${hours}` : hours;
      const minsStrng = mins < 9 ? `0${mins}` : mins;
      return `${hoursString}:${minsStrng}`;
    }

    const days = +Math.floor(hours / 24).toFixed();
    if (days <= 1) {
      return this.translate.instant("LBL_TIME.DAY_AGO");
    }
    if (days < 7) {
      return this.translate.instant("LBL_TIME.DAYS_AGO", { day: days });
    }

    const monthLbl = `LBL_TIME.MONTH_${date.getMonth()}`;
    if (date.getFullYear() === now.getFullYear()) {
      return `${date.getDate()} ${this.translate.instant(monthLbl)}`;
    }
    return `${date.getDate()} ${this.translate.instant(
      monthLbl
    )} ${date.getFullYear()}`;
  }
}
