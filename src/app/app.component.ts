import { Component, OnDestroy, HostListener, OnInit } from "@angular/core";
import {LanguageService} from "../modules/global/services";

@Component({
  selector: "app-root",
  template: `
    <vc-notification class="notification"></vc-notification>
    <vc-main></vc-main>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private languageService: LanguageService,) {}

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.ngOnDestroy();
  }

  ngOnInit(): void {
    this.languageService.loadLanguages();
  }

  ngOnDestroy(): void {}
}
