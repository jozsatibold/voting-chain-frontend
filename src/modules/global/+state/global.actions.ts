import { Action } from "@ngrx/store";
import { Session, Status, User } from "../entities";

export enum GlobalActionTypes {
  SetLoginStatus = "[Global] set user LoginStatus",
  SetUserStatus = "[Global] set user status",
  LoadUser = "[Global User] load User",
  LoadUserImage = "[Global User] load User profile picture",
  ReloadUser = "[Global] Reload user data",
  LoadSessions = "[Global] Load user sessions",
  CurrentSession = "[Global] Current user sessions",
  ClearCurrentSession = "[Global] Clear current user sessions",
  ClearSessions = "[Global] Clear user sessions",
  ClearUserStatus = "[Global] Clear user status",
  ClearGlobalState = "[Global User] clear User"
}

export class SetLoginStatus implements Action {
  readonly type = GlobalActionTypes.SetLoginStatus;

  constructor(readonly isAuthenticated: boolean) {}
}

export class SetUserStatus implements Action {
  readonly type = GlobalActionTypes.SetUserStatus;

  constructor(readonly status: Status) {}
}

export class LoadUser implements Action {
  readonly type = GlobalActionTypes.LoadUser;

  constructor(readonly user: User) {}
}

export class LoadUserImage implements Action {
  readonly type = GlobalActionTypes.LoadUserImage;

  constructor(readonly image: any) {}
}

export class ClearGlobalState {
  readonly type = GlobalActionTypes.ClearGlobalState;

  constructor() {}
}

export class ReloadUser implements Action {
  readonly type = GlobalActionTypes.ReloadUser;
}

export class LoadSessions {
  readonly type = GlobalActionTypes.LoadSessions;

  constructor(readonly sessions: any[]) {}
}

export class CurrentSession {
  readonly type = GlobalActionTypes.CurrentSession;

  constructor(readonly session: Session, readonly token: string) {}
}

export class ClearCurrentSession {
  readonly type = GlobalActionTypes.ClearCurrentSession;

  constructor() {}
}

export class ClearSessions {
  readonly type = GlobalActionTypes.ClearSessions;

  constructor() {}
}

export class ClearUserStatus {
  readonly type = GlobalActionTypes.ClearUserStatus;

  constructor() {}
}

export type GlobalActions =
  | LoadUser
  | LoadUserImage
  | SetLoginStatus
  | SetUserStatus
  | ReloadUser
  | LoadSessions
  | ClearSessions
  | CurrentSession
  | ClearCurrentSession
  | ClearUserStatus
  | ClearGlobalState;
