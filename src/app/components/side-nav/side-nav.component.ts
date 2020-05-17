import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UiService} from "@global/services";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MediaMatcher} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: "vc-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.scss"]
})
export class SideNavComponent implements OnInit, OnDestroy {

  @ViewChild('vcSidenav') public sidenav: MatSidenav;

  private destroy$ = new Subject();
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private uiService: UiService,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
  }

  ngOnInit() {
    this.uiService.toggleMenu$.pipe(takeUntil(this.destroy$)).subscribe(() => this.sidenav.toggle());
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
