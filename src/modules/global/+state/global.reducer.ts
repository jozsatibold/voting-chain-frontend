import { GlobalActions, GlobalActionTypes } from "./global.actions";
import { Session, User } from "../entities";

export interface GlobalStateRef {
  global: GlobalState;
}

export interface GlobalState {
  isAuthenticated: boolean;
  user: User;
  sessions: Session[];
  currentSession: { session: Session; token: string };
}

export const initialState: GlobalState = {
  isAuthenticated: false,
  user: null,
  sessions: null,
  currentSession: null
};

export function globalReducer(
  state = initialState,
  action: GlobalActions
): GlobalState {
  switch (action.type) {
    case GlobalActionTypes.SetLoginStatus:
      return { ...state, isAuthenticated: action.isAuthenticated };
    case GlobalActionTypes.SetUserStatus:
      return { ...state, user: { ...state.user, status: action.status } };
    case GlobalActionTypes.LoadUser:
      return { ...state, user: { ...state.user, ...action.user } };
    case GlobalActionTypes.LoadUserImage:
      return {
        ...state,
        user: { ...state.user, profileImg: action.image || "" }
      };
    case GlobalActionTypes.LoadSessions:
      return { ...state, sessions: action.sessions };
    case GlobalActionTypes.CurrentSession:
      return {
        ...state,
        currentSession: { session: action.session, token: action.token }
      };
    case GlobalActionTypes.ClearCurrentSession:
      return { ...state, currentSession: null };
    case GlobalActionTypes.ClearSessions:
      return { ...state, sessions: initialState.sessions };
    case GlobalActionTypes.ClearUserStatus:
      return { ...state, user: { ...state.user, status: null } };
    case GlobalActionTypes.ClearGlobalState:
      return { ...initialState };
    default:
      return state;
  }
}
