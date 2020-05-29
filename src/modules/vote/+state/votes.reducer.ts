import {VotesActions, VotesActionType} from './votes.actions';
import {Vote, VoteLite} from "@global/entities";

export interface VotesStateRef {
  votes: VotesState;
}

export interface VotesState {
  upcoming: Array<VoteLite>;
  finished: Array<VoteLite>;
  selectedId: number;
  selectedVote: Vote;
}

export const initialState: VotesState = {
  upcoming: null,
  finished: null,
  selectedId: null,
  selectedVote: null
};

export function votesReducer(state = initialState, action: VotesActions): VotesState {
  switch (action.type) {
    case VotesActionType.LoadUpcomingVotesAction:
      return {...state, upcoming: action.votes};
    case VotesActionType.LoadFinishedVotesAction:
      return {...state, finished: action.votes};
    case VotesActionType.ClearVotesAction:
      return {...initialState};
    case VotesActionType.LoadSelectedVote:
      return {...state, selectedVote: action.vote};
    case VotesActionType.FetchSelectedVote:
      return {...state, selectedId: action.id};
    case VotesActionType.ClearSelectedVote:
      return {...state, selectedVote: initialState.selectedVote, selectedId: initialState.selectedId};
    default:
      return state;
  }
}
