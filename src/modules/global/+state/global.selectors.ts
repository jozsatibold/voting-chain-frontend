import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "./global.reducer";

const getGlobalState = createFeatureSelector<GlobalState>("global");

const getUser = createSelector(
  getGlobalState,
  state => state.user
);
const isUserAuthenticated = createSelector(
  getGlobalState,
  state => state.isAuthenticated
);

const getUserId = createSelector(
  getGlobalState,
  state => (state.user ? state.user.id : null)
);

export const GlobalSelectors = {
  getUser,
  getUserId,
  isUserAuthenticated
};
