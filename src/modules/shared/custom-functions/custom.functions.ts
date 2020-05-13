import * as _ from "lodash";

export function secondsToHours(seconds: number) {
  return seconds > 0 ? _.round(seconds / 3600, 1) : _.floor(seconds / 3600, 1);
}

export function hoursToSeconds(hours: number) {
  return hours * 3600;
}
