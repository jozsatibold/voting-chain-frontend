import { GlobalActions, GlobalActionTypes } from "./global.actions";
import {User } from "../entities";

export interface GlobalStateRef {
  global: GlobalState;
}

export interface GlobalState {
  isAuthenticated: boolean;
  user: User;
}

export const initialState: GlobalState = {
  isAuthenticated: false,
  user: null
};

export function globalReducer(
  state = initialState,
  action: GlobalActions
): GlobalState {
  switch (action.type) {
    case GlobalActionTypes.SetLoginStatus:
      return { ...state, isAuthenticated: action.isAuthenticated };
    case GlobalActionTypes.LoadUser:
      return { ...state, user: { ...state.user, ...action.user } };
    case GlobalActionTypes.ClearGlobalState:
      return { ...initialState };
    default:
      return state;
  }
}
