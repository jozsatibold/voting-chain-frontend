import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { GlobalStateRef } from "../+state/global.reducer";
import { GlobalSelectors } from "../+state/global.selectors";
import {
  ClearGlobalState,
  LoadUser,
  ReloadUser,
  SetLoginStatus,
} from "../+state/global.actions";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import {User} from "../entities";

// TODO: create better flow for the * signed methods

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



  //*
  setUserImage(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.userImage.next(reader.result.toString());
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setLoginStatus(val: boolean): void {
    this.store.dispatch(new SetLoginStatus(val));
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.store.select(GlobalSelectors.isUserAuthenticated);
  }

  loadUser(user: User) {
    this.store.dispatch(new LoadUser(user));
    this.setLoginStatus(true);
  }

  getUserId = (): Observable<number> =>
    this.store.select(GlobalSelectors.getUserId);

  getUser = (): Observable<User> => this.store.select(GlobalSelectors.getUser);

  reloadUser() {
    this.store.dispatch(new ReloadUser());
  }

  //
  // createUser = data => this.userService.createUser(data);
  //
  // updateUser = data => this.userService.updateUser(data);
}
