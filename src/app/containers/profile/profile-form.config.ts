import {Validators} from "@angular/forms";
import customValidator from "@global/custom-functions/validation.functions";
import {VCFormControlBuilder} from "@global/entities";

export const profileFormConfig: Array<VCFormControlBuilder> = [
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
  }
];

export const passwordFormConfig: Array<VCFormControlBuilder> = [
  {
    name: 'oldPin',
    value: '',
    validators: [{
      error: 'LBL_INPUT.ERROR.REQUIRED',
      validator: Validators.required
    }, {
      error: 'LBL_INPUT.ERROR.SIX_CHAR',
      validator: [Validators.minLength(6), 'minlength']
    }, {
      error: 'LBL_INPUT.ERROR.SIX_CHAR',
      validator: [Validators.maxLength(6), 'maxlength']
    }]
  },
  {
    name: 'newPin',
    value: '',
    validators: [{
      error: 'LBL_INPUT.ERROR.REQUIRED',
      validator: Validators.required
    }, {
      error: 'LBL_INPUT.ERROR.SIX_CHAR',
      validator: [Validators.minLength(6), 'minlength']
    }, {
      error: 'LBL_INPUT.ERROR.SIX_CHAR',
      validator: [Validators.maxLength(6), 'maxlength']
    }]
  }
];
