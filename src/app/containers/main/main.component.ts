import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "../../../modules/global/services";
import {Subject} from "rxjs";
import {distinctUntilChanged, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: "vc-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy, AfterViewChecked {
  private destroy$ = new Subject();

  constructor(private uiService: UiService) {
  }

  ngOnInit(): void {
    this.uiService.initTheme();
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
