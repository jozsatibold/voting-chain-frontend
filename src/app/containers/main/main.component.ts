import {Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Observable, Subject} from "rxjs";
import {AuthSandbox, UserSandbox} from "@global/sandboxes";
import {map} from "rxjs/operators";

@Component({
  selector: "vc-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  showHeader$: Observable<boolean>;
  contentSize$: Observable<string>;
  constructor(private uiService: UiService,
              private authSandbox: AuthSandbox,
              private userSandbox: UserSandbox) {
  }

  ngOnInit(): void {
    this.showHeader$ = this.uiService.showHeader$;
    this.contentSize$ = this.uiService.showHeader$.pipe(map(visible => visible ? 'calc(100vh - 3.25rem)' : '100vh'));
    this.uiService.initTheme();
    this.authSandbox.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
