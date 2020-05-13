import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "vc-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
