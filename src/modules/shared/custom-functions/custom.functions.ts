import * as _ from "lodash";

export function secondsToHours(seconds: number) {
  return seconds > 0 ? _.round(seconds / 3600, 1) : _.floor(seconds / 3600, 1);
}

export function hoursToSeconds(hours: number) {
  return hours * 3600;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomColorBetween(minColor: number, maxColor: number) {
  if (minColor > maxColor) {
    const col = minColor;
    minColor = maxColor;
    maxColor = col;
  }
  const color =
    minColor + Math.floor(Math.random() * (maxColor - minColor + 1));
  return `#${color.toString(16)}`;
}

export function isEven(n) {
  return n % 2 === 0;
}

export function isOdd(n) {
  return Math.abs(n % 2) === 1;
}

// Cheap UUID generator for temporary usage
export function generateUUID() {
  return (Math.random() * 10000).toFixed(0).toString();
}

export function generateMonogram(word: string) {
  const words = word.split(" ").map(w => w.substring(0, 1));
  return words.join("");
}
