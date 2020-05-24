import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {GroupSandbox} from "@groups/sandboxes/group.sandbox";
import {Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class StoreEraseResolver implements Resolve<any> {
  constructor(private sandbox: GroupSandbox) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.sandbox.clearSelectedGroup();
    return of(null);
  }
}
