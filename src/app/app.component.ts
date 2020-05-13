import { Component, OnDestroy, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-notification class="notification"></app-notification>
    <app-main></app-main>
  `,
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.ngOnDestroy();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
