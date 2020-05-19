import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AuthSandbox, UserSandbox} from "@global/sandboxes";
import {MatSidenav} from "@angular/material/sidenav";
import {Subject} from "rxjs";
import {catchError, takeUntil} from "rxjs/operators";
import {UiService} from "@global/services";
import {MediaMatcher} from "@angular/cdk/layout";
import {menuItems} from "./home-menu.config";
import {Router} from "@angular/router";

@Component({
  selector: "vc-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  menuItems = menuItems;

  @ViewChild('vcSidenav', {static: true}) public sidenav: MatSidenav;

  private destroy$ = new Subject();
  private _mobileQueryListener: () => void;

  constructor(private userSandbox: UserSandbox,
              private authSandbox: AuthSandbox,
              private uiService: UiService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher) {
  }

  ngOnInit(): void {
    if (window.innerWidth >= 600) {
      this.sidenav.toggle(true);
    }
    this.userSandbox.setLoginStatus(true);
    this.uiService.toggleMenu$.pipe(takeUntil(this.destroy$)).subscribe(() => this.sidenav && this.sidenav.toggle());
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      if (window.innerWidth >= 600) {
        this.sidenav.toggle(true);
      }
      this.changeDetectorRef.detectChanges();
    }
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  actionEvent(action: string): void {
    if (action === 'sign_out') {
      this.authSandbox.logout().subscribe()
    }
  }
}
