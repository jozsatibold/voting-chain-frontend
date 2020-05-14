import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Observable, Subject} from "rxjs";

@Component({
  selector: "vc-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy, AfterViewChecked {
  private destroy$ = new Subject();

  showHeader$: Observable<boolean>;
  constructor(private uiService: UiService) {
  }

  ngOnInit(): void {
    this.uiService.initTheme();
    this.showHeader$ = this.uiService.showHeader$;
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
