import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "vc-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
