import {Validators} from "@angular/forms";

export const voteForm = [
  {
    name: 'title',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  },
  {
    name: 'description',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  },
  {
    name: 'beginning',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  },
  {
    name: 'end',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  },
  {
    name: 'type',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  },
  {
    name: 'groupId',
    value: '',
    validators: [
      {
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }]
  }];
