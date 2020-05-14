import {AbstractControl} from "@angular/forms";

const username = (control: AbstractControl): { [key: string]: any } | null => {
  const forbidden = /^[A-Z][a-z]{1-50}[.-]?([ ][A-Z][a-z]{1-50}[-]){1,5}/.test(control.value);
  return forbidden ? {'username': {value: control.value}} : null;
};
const adult = (control: AbstractControl): { [key: string]: any } | null => {
  const date = new Date();
  date.setFullYear(date.getDate() - 18);
  const selectedDate = new Date(control.value);
  return !selectedDate || selectedDate.getTime() > date.getTime() ? {'mature': {value: control.value}} : null;
};

export default {
  username,
  adult
}
