import {Injectable, Renderer2, RendererFactory2} from "@angular/core";
import {Theme, themes} from "../enums";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator} from "@angular/forms";
import {VCForm, VCFormControl, VCFormControlBuilder} from "../entities";

@Injectable({
  providedIn: "root"
})
export class FormService {

  constructor(private fb: FormBuilder) {
  }

  buildForm(controls: Array<VCFormControlBuilder>): VCForm {
    const form =  this.fb.group({});
    controls.forEach(control => form.addControl(control.name, this.fb.control(control.value, control.validators.map(validator => validator.validator))))
    const errors = controls.map(control => ({
      name: control.name,
      errors: control.validators.map(validator => ({type: validator.validator.name, error: validator.error}))
    }))
    return new VCForm(form, errors);
  }
}

