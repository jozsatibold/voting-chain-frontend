import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export class VCForm {

  _form: FormGroup;
  _errors: Array<{ name: string, errors: Array<{ type: string, error: string }> }>;

  constructor(form: FormGroup, errors: Array<{ name: string, errors: Array<{ type: string, error: string }> }>) {
    this._form = form;
    this._errors = errors;
  }

  valueChange = () => this._form.valueChanges;

  statusChange = () => this._form.statusChanges;

  get(name: string): VCFormControl {
    const control = this._form.get(name);
    const errors = this._errors.find(error => error.name === name);
    return new VCFormControl(control, errors.errors);
  }

  form(): FormGroup {
    return this._form;
  }

  valid(): boolean {
    return this._form && this._form.valid;
  }

  value(): any {
    return this._form ? this._form.value : null;
  }
}

export interface VCFormControlBuilder {
  name: string;
  value: string | number | boolean | Date
  validators: Array<VcFormValidator>
}

export interface VcFormValidator {
  validator: ValidatorFn | [ValidatorFn, string];
  error: string;
}

export class VCFormControl {
  control: AbstractControl;
  errors: Array<{ type: string, error: string }>;

  constructor(control: AbstractControl, errors: Array<{ type: string, error: string }>) {
    this.control = control;
    this.errors = errors;
  }

  getError(name = null) {
    const errorName = name || this.hasError();
    if (errorName) {
      const error = this.errors.find(error => error.type === errorName);
      return error ? error.error : null;
    }
    return null;
  }

  hasError() {
    const errors = this.control.errors;
    if (!!errors) {
      return Object.keys(errors)[0];
    }
    return false;
  }
}
