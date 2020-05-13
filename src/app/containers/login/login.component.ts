import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "vc-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
