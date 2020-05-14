import {Component, OnInit} from "@angular/core";
import {SelectOption, VCForm} from "@global/entities";
import {FormService} from "@global/services/form.service";
import {registrationFormConfig} from "./registration-form.config";

@Component({
  selector: "vc-registration",
  templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit {
  loginForm: VCForm;
  maxDate: Date;
  minDate: Date;
  sexOptions: Array<SelectOption> = [{key: 'M', value: 'LBL_INPUT.VALUE.MALE'}, {
    key: 'F',
    value: 'LBL_INPUT.VALUE.FEMALE'
  }];

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate.setFullYear(this.minDate.getFullYear() - 120);
    this.loginForm = this.formService.buildForm(registrationFormConfig);
  }
}
