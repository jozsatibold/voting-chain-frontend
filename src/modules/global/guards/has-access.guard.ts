import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { UserSandbox } from "../sandboxes";

@Injectable({
  providedIn: "root"
})
export class HasAccessGuard implements CanActivate {
  constructor(private userSandbox: UserSandbox, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const roles = route.data["roles"];
    const redirectUrl = route.data["redirect"];
    return this.userSandbox.getUser().pipe(
      filter(user => !!user),
      map(user => {
        const canActivate = roles.includes(user.role);
        if (!canActivate && redirectUrl) {
          this.router.navigate([redirectUrl]);
        }
        return canActivate;
      })
    );
  }
}
