import {GlobalActions, GlobalActionTypes} from "./global.actions";
import {User} from "../entities";
import {Type} from "@global/entities/type.entiry";

export interface GlobalStateRef {
  global: GlobalState;
}

export interface GlobalState {
  isAuthenticated: boolean;
  user: User;
  types: Array<Type>;
}

export const initialState: GlobalState = {
  isAuthenticated: false,
  user: null,
  types: null
};

export function globalReducer(state = initialState, action: GlobalActions): GlobalState {
  switch (action.type) {
    case GlobalActionTypes.SetLoginStatus:
      return {...state, isAuthenticated: action.isAuthenticated, user: null};
    case GlobalActionTypes.LoadUser:
      return {...state, user: {...state.user, ...action.user}};
    case GlobalActionTypes.LoadType:
      return {...state, types: [...(state.types || []), ...action.types]};
    case GlobalActionTypes.ClearGlobalState:
      return {...initialState};
    default:
      return state;
  }
}
