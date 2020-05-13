import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../modules/global/services/form.service";
import {error} from "@angular/compiler/src/util";
import {VCForm} from "../../../modules/global/entities";

@Component({
  selector: "vc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
            error: 'LBL_INPUT_ERROR.REQUIRED',
            validator: Validators.required
          },
          {
            error: 'LBL_INPUT_ERROR.EMAIL',
            validator: Validators.email
          }]
      }, {
        name: 'password',
        value: '',
        validators: [{
          error: 'LBL_INPUT_ERROR.REQUIRED',
          validator: Validators.required
        }]
      }]);
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy(): void {
  }
}
