import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";
import {Validators} from "@angular/forms";
import {FormService} from "@global/services/form.service";
import {VCForm} from "@global/entities";
import {BehaviorSubject} from "rxjs";
import {AuthSandbox, UserSandbox} from "@global/sandboxes";
import {Router} from "@angular/router";

@Component({
  selector: "vc-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  loginForm: VCForm;
  verificationForm: VCForm;
  isLoginSuccess$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private formService: FormService,
              private authSandbox: AuthSandbox,
              private userSandbox: UserSandbox,
              private router: Router) {
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
    this.verificationForm = this.formService.buildForm([{
      name: 'token',
      value: '',
      validators: [{
        error: 'LBL_INPUT.ERROR.REQUIRED',
        validator: Validators.required
      }, {
        error: 'LBL_INPUT.ERROR.TEN_CHAR',
        validator: [Validators.minLength(10), 'minlength']
      }, {
        error: 'LBL_INPUT.ERROR.TEN_CHAR',
        validator: [Validators.maxLength(10), 'maxlength']
      }]
    }]);
  }

  login() {
    if (!this.loginForm.valid()) {
      return;
    }
    const data = this.loginForm.value();
    this.isLoading$.next(true);
    this.authSandbox.login(data.email, data.pin).subscribe(
      () => {
        this.isLoginSuccess$.next(true);
        this.isLoading$.next(false);
      },
      () => this.isLoading$.next(false));
  }

  verifyToken() {
    if (!this.loginForm.valid() || !this.verificationForm.valid()) {
      return;
    }
    this.isLoading$.next(true);
    this.authSandbox.loginWithToken(this.loginForm.value().email, this.verificationForm.value().token)
      .subscribe(() => {
        this.isLoading$.next(false);
        this.userSandbox.setLoginStatus(true);
        this.router.navigate(['']);
      },
        () => this.isLoading$.next(false));
  }
}
