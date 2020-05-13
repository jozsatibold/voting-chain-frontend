import { Action } from "@ngrx/store";
import { User } from "../entities";

export enum GlobalActionTypes {
  SetLoginStatus = "[Global] set user LoginStatus",
  LoadUser = "[Global User] load User",
  ReloadUser = "[Global] Reload user data",
  ClearGlobalState = "[Global User] clear User"
}

export class SetLoginStatus implements Action {
  readonly type = GlobalActionTypes.SetLoginStatus;

  constructor(readonly isAuthenticated: boolean) {}
}


export class LoadUser implements Action {
  readonly type = GlobalActionTypes.LoadUser;

  constructor(readonly user: User) {}
}

export class ClearGlobalState {
  readonly type = GlobalActionTypes.ClearGlobalState;

  constructor() {}
}

export class ReloadUser implements Action {
  readonly type = GlobalActionTypes.ReloadUser;
}

export type GlobalActions =
  | LoadUser
  | SetLoginStatus
  | ReloadUser
  | ClearGlobalState;
