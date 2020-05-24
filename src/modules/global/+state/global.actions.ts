import { Action } from "@ngrx/store";
import { User } from "../entities";
import {Type} from "@global/entities/type.entiry";

export enum GlobalActionTypes {
  SetLoginStatus = "[Global] set user LoginStatus",
  LoadUser = "[Global User] load User",
  ReloadUser = "[Global] Reload user data",
  ClearGlobalState = "[Global User] clear User",
  LoadType = "[Global Type] Load Type",
  FetchType = "[Global Type] Fetch Type"
}

export class SetLoginStatus implements Action {
  readonly type = GlobalActionTypes.SetLoginStatus;

  constructor(readonly isAuthenticated: boolean) {}
}

export class LoadTypes implements Action {
  readonly type = GlobalActionTypes.LoadType;

  constructor(readonly types: Array<Type>) {
  }
}

export class FetchType implements Action {

  readonly type = GlobalActionTypes.FetchType;

  constructor() {}
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
  | LoadTypes
  | FetchType
  | SetLoginStatus
  | ReloadUser
  | ClearGlobalState;
