import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, combineLatest, of, Subject} from "rxjs";
import {UiService} from "@global/services";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, takeUntil, tap} from "rxjs/operators";

@Component({
  selector: "vc-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.scss"]
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  isLogin$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject();

  constructor(private uiService: UiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.uiService.showHeader(false);
    combineLatest([this.router.events, of(this.route.firstChild.routeConfig.path)])
      .pipe(
        filter(([evt, _]) => (evt instanceof NavigationEnd || !evt) && ['login', 'registration'].includes(this.route.firstChild.routeConfig.path)),
        map(() => this.route.firstChild.routeConfig.path === 'login')
      ).subscribe(value => this.isLogin$.next(value));
    const path = this.route.firstChild.routeConfig.path;
    const index = ['registration', 'login' ].indexOf(path);
    this.isLogin$.next(index !== 0);
    this.isLogin$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLogin => !isLogin ? 'LBL_PAGE.REGISTRATION' : 'LBL_PAGE.LOGIN');
  }

  ngOnDestroy(): void {
    this.uiService.showHeader(true);
    this.destroy$.next();
  }
}
