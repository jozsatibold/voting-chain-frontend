import {Validators} from "@angular/forms";
import customValidator from "@global/custom-functions/validation.functions";

export const registrationFormConfig = [
  {
    name: 'email',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      },
      {
        error: 'LBL_INPUT.ERROR.EMAIL',
        validator: Validators.email
      }]
  },
  {
    name: 'name',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      },
      {
        error: 'LBL_INPUT.ERROR.EMAIL',
        validator: customValidator.username
      }]
  },
  {
    name: 'birthDate',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      },
      {
        error: 'LBL_INPUT.ERROR.ADULT',
        validator: customValidator.adult
      }]
  },
  {
    name: 'sex',
    value: '',
    validators: [{
      error: 'LBL_INPUT.ERROR.REQUIRED',
      validator: Validators.required
    }]
  },
  {
    name: 'pin',
    value: '',
    validators: [{
      error: 'LBL_INPUT.ERROR.REQUIRED',
      validator: Validators.required
    }]
  },
  {
    name: 'pinVerification',
    value: '',
    validators: [{
      error: 'LBL_INPUT.ERROR.REQUIRED',
      validator: Validators.required
    }]
  }
];
