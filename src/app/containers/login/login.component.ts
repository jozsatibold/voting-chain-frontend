import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";
import {Validators} from "@angular/forms";
import {FormService} from "@global/services/form.service";
import {VCForm} from "@global/entities";

@Component({
  selector: "vc-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {

  loginForm: VCForm;

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formService.buildForm([
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
      }, {
        name: 'pin',
        value: '',
        validators: [{
          error: 'LBL_INPUT.ERROR.REQUIRED',
          validator: Validators.required
        }]
      }]);
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy(): void {
  }
}
