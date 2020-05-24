import {Component, OnDestroy, OnInit} from "@angular/core";
import {SelectOption, VCForm} from "@global/entities";
import {FormService} from "@global/services/form.service";
import {registrationFormConfig} from "./registration-form.config";
import {AuthSandbox} from "@global/sandboxes";
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {NotificationService} from "@global/services";
import * as _ from 'lodash';

@Component({
  selector: "vc-registration",
  templateUrl: "./registration.component.html"
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: VCForm;
  maxDate: Date;
  minDate: Date;
  sexOptions: Array<SelectOption> = [{key: 'M', value: 'LBL_INPUT.VALUE.MALE'}, {
    key: 'F',
    value: 'LBL_INPUT.VALUE.FEMALE'
  }];
  isPinInvalid$ = new BehaviorSubject<boolean>(false);
  isLoading$ = new BehaviorSubject<boolean>(false);

  private destroy$ = new Subject();

  constructor(private formService: FormService,
              private authSandbox: AuthSandbox,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.minDate.setFullYear(this.minDate.getFullYear() - 120);
    this.registrationForm = this.formService.buildForm(registrationFormConfig);
    combineLatest([this.registrationForm.get('pin').control.valueChanges, this.registrationForm.get('pinVerification').control.valueChanges])
      .pipe(
        filter(([pin, pinVerification]) => !!pin && !!pinVerification),
        takeUntil(this.destroy$))
      .subscribe(([pin, pinVerification]) => this.isPinInvalid$.next(pin !== pinVerification));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  registerUser(): void {
    if (!this.registrationForm.valid()) {
      return;
    }
    const data = this.registrationForm.value();
    if (data.pin !== data.pinVerification) {
      this.isPinInvalid$.next(true);
      return;
    }
    this.isLoading$.next(true);
    this.authSandbox.createUser({..._.omit (data, ['pinVerification']), birthDate: new Date(data.birthDate).getTime()})
      .subscribe(() => {
      this.notificationService.showNotification('LBL_AUTHORIZATION.REGISTRATION_SUCCESS', 'success');
      this.router.navigate(['']);
      this.isLoading$.next(false);
    },
        () => this.isLoading$.next(false));
  }
}
