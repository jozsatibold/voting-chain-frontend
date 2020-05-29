import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VotesState} from './votes.reducer';

const getVoteState = createFeatureSelector<VotesState>('votes');

const getUpcomingVotes = createSelector(
  getVoteState,
  state => state.upcoming
);

const getFinishedVotes = createSelector(
  getVoteState,
  state => state.finished
);

const getSelectedVote = createSelector(
  getVoteState,
  state => state.selectedVote
);

const getSelectedId = createSelector(
  getVoteState,
  state => state.selectedId
);

export const VotesSelectors = {getUpcomingVotes, getFinishedVotes, getSelectedVote, getSelectedId};
