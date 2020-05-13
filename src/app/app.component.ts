import { Component, OnDestroy, HostListener, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <vc-notification class="notification"></vc-notification>
    <vc-main></vc-main>
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
