import {Action} from '@ngrx/store';
import {Vote, VoteLite} from "@global/entities";

export enum VotesActionType {
  FetchUpcomingVotesAction = '[Votes] fetch Upcoming Votes',
  FetchFinishedVotesAction = '[Votes] fetch Finished Votes',
  LoadUpcomingVotesAction = '[Votes] load Upcoming Votes',
  LoadFinishedVotesAction = '[Votes] load Finished Votes',
  ClearVotesAction = '[Votes] clear Votes',
  FetchSelectedVote = '[Vote] fetch selected vote',
  LoadSelectedVote = '[Vote] load selected vote',
  ClearSelectedVote = '[Vote] clear selected vote'
}

export class FetchUpcomingVotes implements Action {
  readonly type = VotesActionType.FetchUpcomingVotesAction;

  constructor() {}
}

export class FetchFinishedVotes implements Action {
  readonly type = VotesActionType.FetchFinishedVotesAction;

  constructor() {}
}

export class LoadUpcomingVotes implements Action {
  readonly type = VotesActionType.LoadUpcomingVotesAction;

  constructor(readonly votes: Array<VoteLite>) {}
}

export class LoadFinishedVotes implements Action {
  readonly type = VotesActionType.LoadFinishedVotesAction;

  constructor(readonly votes: Array<VoteLite>) {}
}

export class ClearVotes implements Action {
  readonly type = VotesActionType.ClearVotesAction;

  constructor() {}
}

export class FetchSelectedVote implements Action {
  readonly type = VotesActionType.FetchSelectedVote;

  constructor(readonly id: number) {}
}

export class LoadSelectedVote implements Action {
  readonly type = VotesActionType.LoadSelectedVote;

  constructor(readonly vote: Vote) {}
}

export class ClearSelectedVote implements Action {
  readonly type = VotesActionType.ClearSelectedVote;

  constructor() {}
}

export type VotesActions =
  FetchUpcomingVotes |
  FetchFinishedVotes |
  LoadUpcomingVotes |
  LoadFinishedVotes |
  ClearVotes |
  FetchSelectedVote |
  LoadSelectedVote |
  ClearSelectedVote;
