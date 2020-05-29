import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {VoteSandbox} from "@vote/sandboxes/vote.sandbox";

@Injectable({ providedIn: 'root' })
export class StoreEraseResolver implements Resolve<any> {
  constructor(private sandbox: VoteSandbox) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.sandbox.clearSelectedVote();
    return of(null);
  }
}
