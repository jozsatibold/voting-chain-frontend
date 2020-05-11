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

const getUserStatus = createSelector(
  getGlobalState,
  state => (state.user ? state.user.status : null)
);

const getSessions = createSelector(
  getGlobalState,
  state => state.sessions
);

const getCurrentSession = createSelector(
  getGlobalState,
  state => state.currentSession
);

const getCurrentSessionId = createSelector(
  getGlobalState,
  state => state.currentSession.session.id
);

const getSessionById = (id: string) =>
  createSelector(
    getGlobalState,
    state => state.sessions && state.sessions.find(session => session.id === id)
  );

export const GlobalSelectors = {
  getUser,
  getUserId,
  getUserStatus,
  isUserAuthenticated,
  getSessions,
  getSessionById,
  getCurrentSession,
  getCurrentSessionId
};
