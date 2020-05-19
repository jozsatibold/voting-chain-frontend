import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { GlobalStateRef } from "../+state/global.reducer";
import { GlobalSelectors } from "../+state/global.selectors";
import {
  ClearGlobalState,
  ReloadUser,
  SetLoginStatus,
} from "../+state/global.actions";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import {User} from "../entities";

@Injectable({
  providedIn: "root"
})
export class UserSandbox {
  private userImage = new ReplaySubject<string>(1);

  constructor(
    private store: Store<GlobalStateRef>,
    private userService: UserService,
  ) {}


  clearUser() {
    this.store.dispatch(new ClearGlobalState());
  }

  setLoginStatus(val: boolean): void {
    this.store.dispatch(new SetLoginStatus(val));
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.store.select(GlobalSelectors.isUserAuthenticated);
  }

  getUserId = (): Observable<number> =>
    this.store.select(GlobalSelectors.getUserId);

  getUser = (): Observable<User> => this.store.select(GlobalSelectors.getUser);

  reloadUser() {
    this.store.dispatch(new ReloadUser());
  }

  updateUser = data => this.userService.updateUser(data);

  updatePassword = object => this.userService.updatePassword(object);
}
