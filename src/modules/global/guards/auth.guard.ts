import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthSandbox } from "../sandboxes";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authSandbox: AuthSandbox, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthorized = this.authSandbox.hasToken();
    const unauthorizedMode = next.data.unauthorizedMode;
    if (unauthorizedMode) {
      if (isAuthorized) {
        this.router.navigate([""]);
      }
      return !isAuthorized;
    }
    if (!isAuthorized) {
      this.router.navigate(["/authorization"], {
        queryParams: { returnUrl: state.url }
      });
    }
    return isAuthorized;
  }
}
