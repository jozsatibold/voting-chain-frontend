import {Component, OnDestroy, OnInit} from "@angular/core";
import {UserSandbox} from "@global/sandboxes";
import {FormService, NotificationService} from "@global/services";
import {SelectOption, VCForm} from "@global/entities";
import {registrationFormConfig} from "../registration/registration-form.config";
import * as _ from 'lodash';
import {filter, map, switchMap, takeUntil} from "rxjs/operators";
import {EMPTY, Subject} from "rxjs";
import {passwordFormConfig, profileFormConfig} from "./profile-form.config";

@Component({
  selector: "vc-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: VCForm;
  passwordForm: VCForm;

  maxDate: Date;
  minDate: Date;
  sexOptions: Array<SelectOption> = [{key: 'M', value: 'LBL_INPUT.VALUE.MALE'}, {
    key: 'F',
    value: 'LBL_INPUT.VALUE.FEMALE'
  }];

  private destroy$ = new Subject();

  constructor(private userSandbox: UserSandbox,
              private formService: FormService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.profileForm = this.formService.buildForm(profileFormConfig);
    this.passwordForm = this.formService.buildForm(passwordFormConfig);
    this.userSandbox.getUser()
      .pipe(
        filter(isUser => !!isUser),
        map(user => ({
          name: user.name,
          email: user.email,
          birthDate: new Date(user.birthDate),
          sex: user.sex,
        })),
        takeUntil(this.destroy$))
      .subscribe(user => this.profileForm.form().setValue(user));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  updateUser() {
    if (!this.profileForm.valid()) {
      return;
    }
    const value = this.profileForm.value();
    this.userSandbox.updateUser({...value, birthDate: new Date(value.birthDate).getTime()})
      .subscribe(() => {
        console.log('Updated');
        this.userSandbox.reloadUser();
        this.notificationService.showNotification('LBL_ACTION.UPDATED', "success");
      });
  }

  updatePassword() {
    if (!this.passwordForm.valid()) {
      return;
    }
    const value = this.passwordForm.value();
    this.userSandbox.updatePassword(value)
      .subscribe(() => {
        this.profileForm.get('pin').control.setValue('');
        this.profileForm.get('pinVerification').control.setValue('');
        this.notificationService.showNotification('LBL_ACTION.PASSWORD_UPDATED', "success");
      });
  }
}
