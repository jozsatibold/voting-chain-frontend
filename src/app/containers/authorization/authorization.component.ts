import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.scss"]
})
export class AuthorizationComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
