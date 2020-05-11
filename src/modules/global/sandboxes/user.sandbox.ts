import { Injectable } from "@angular/core";
import { Status, User } from "../entities";
import { Observable, of, ReplaySubject, Subject } from "rxjs";
import { GlobalStateRef } from "../+state/global.reducer";
import { GlobalSelectors } from "../+state/global.selectors";
import {
  ClearGlobalState,
  ClearUserStatus,
  LoadUser,
  ReloadUser,
  SetLoginStatus,
  SetUserStatus
} from "../+state/global.actions";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import { filter, switchMap, takeUntil, tap } from "rxjs/operators";
import { SocketSandbox } from "./socket.sandbox";

// TODO: create better flow for the * signed methods

@Injectable({
  providedIn: "root"
})
export class UserSandbox {
  destroy$ = new Subject();
  private userImage = new ReplaySubject<string>(1);

  constructor(
    private store: Store<GlobalStateRef>,
    private userService: UserService,
    private socketSandbox: SocketSandbox
  ) {}

  loadUsersStatus(data: Status) {
    this.store.dispatch(new SetUserStatus(data));
  }

  clearUser() {
    this.store.dispatch(new ClearGlobalState());
  }

  subscribeToStatusSocket(): Observable<any> {
    return this.socketSandbox.isConnected().pipe(
      filter((isConnected: boolean) => isConnected),
      switchMap(() => this.socketSandbox.on("users")),
      filter(response => response.eventType === "status_changed"),
      takeUntil(this.destroy$)
    );
  }

  setUserStatus = (data: Status) =>
    this.getUserId().pipe(
      switchMap(userId => this.userService.setUserStatus(userId, data)),
      tap(() => this.store.dispatch(new SetUserStatus(data)))
    );

  getUserStatus = (): Observable<Status> =>
    this.store.select(GlobalSelectors.getUserStatus);

  clearStatus = (): Observable<any> =>
    this.getUserId().pipe(
      switchMap(userId => this.userService.clearUserStatus(userId)),
      tap(() => this.store.dispatch(new ClearUserStatus()))
    );

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

  //Todo refactor this when we have correct image upload
  getUserImage(): Observable<any> {
    return of("");
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

  getUserId = (): Observable<string> =>
    this.store.select(GlobalSelectors.getUserId);

  getUser = (): Observable<User> => this.store.select(GlobalSelectors.getUser);

  reloadUser() {
    this.store.dispatch(new ReloadUser());
  }

  getUsers(filters: {
    search?: string;
    excludeWorkspaceMembers?: boolean;
  }): Observable<any> {
    return this.userService.getUsers(filters);
  }

  createUser = data => this.userService.createUser(data);

  updateUser = data => this.userService.updateUser(data);

  uploadProfileImage = data => this.userService.uploadProfileImage(data);
}
