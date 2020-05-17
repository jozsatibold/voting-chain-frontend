import { Injectable } from "@angular/core";
import { AuthService } from "../services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  ClearGlobalState,
  GlobalActionTypes,
  LoadUser,
  SetLoginStatus
} from "./global.actions";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";

@Injectable()
export class GlobalEffects {
  constructor(
    private auth: AuthService,
    private actions$: Actions
  ) {}

  @Effect()
  FetchUser = this.actions$.pipe(
    ofType(GlobalActionTypes.SetLoginStatus),
    switchMap((action: SetLoginStatus) => {
      return action.isAuthenticated
        ? this.auth.loadUser()
        : of(false);
    }),
    map(user => (user ? new LoadUser(user) : new ClearGlobalState()))
  );

  @Effect()
  ReloadUser = this.actions$.pipe(
    ofType(GlobalActionTypes.ReloadUser),
    switchMap(() =>
      this.auth.loadUser().pipe(map(response => response["user"]))
    ),
    map(user => (user ? new LoadUser(user) : new ClearGlobalState()))
  );
}
