import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { UserSandbox } from "../../global/sandboxes";

@Directive({
  selector: "[appHasAccess]"
})
export class HasAccessDirective implements OnInit, OnDestroy {
  destroy$ = new Subject();
  @Input() appHasAccess: string | Array<string>;
  @Input() reverse = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userSandbox: UserSandbox
  ) {}

  ngOnInit() {
    this.userSandbox
      .getUser()
      .pipe(
        distinctUntilChanged(
          (prev, next) => prev && next && prev.role === next.role
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        if (!user) {
          this.changeViewVisibility(this.reverse);
        } else if (!this.appHasAccess) {
          this.changeViewVisibility(!this.reverse);
        } else if (
          this.appHasAccess instanceof Array &&
          !this.appHasAccess.includes(user.role)
        ) {
          this.changeViewVisibility(this.reverse);
        } else if (
          this.appHasAccess instanceof String &&
          this.appHasAccess !== user.role
        ) {
          this.changeViewVisibility(this.reverse);
        } else {
          this.changeViewVisibility(!this.reverse);
        }
      });
  }

  changeViewVisibility(show: boolean) {
    if (show) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
