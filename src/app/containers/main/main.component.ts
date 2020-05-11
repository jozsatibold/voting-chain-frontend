import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
