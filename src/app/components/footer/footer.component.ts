import {Component, OnDestroy, OnInit} from "@angular/core";
import {LanguageService, UiService} from "@global/services";
import {SelectOption, VCFormControl} from "@global/entities";
import {FormControl} from "@angular/forms";
import {Subject} from "rxjs";
import {distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {Theme} from "@global/enums";

@Component({
  selector: "vc-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit, OnDestroy {

  languages = [
    {
      key: 'en-US',
      value: `LBL_LANGUAGE.EN-US`
    },
    {
      key: 'hu',
      value: `LBL_LANGUAGE.HU`
    }];
  themes: Array<SelectOption> = [
    {
      key: false,
      value: `LBL_THEME.${Theme.LIGHT}`
    },
    {
      key: true,
      value: `LBL_THEME.${Theme.DARK}`
    }];
  formControlTheme = new VCFormControl(new FormControl(''), []);
  formControlLanguage = new VCFormControl(new FormControl(''), []);

  private destroy$ = new Subject();

  constructor(private languageService: LanguageService, private uiService: UiService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.languageService.getCurrentLanguage().pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((language) => this.formControlLanguage.control.setValue(language));
    this.uiService.darkMode$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((theme) => {
      this.formControlTheme.control.setValue(theme);
    });
    this.formControlTheme.control.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(theme => this.uiService.setDarkMode(theme));
    this.formControlLanguage.control.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(language => this.languageService.setCurrentLanguage(language));
  }

}
