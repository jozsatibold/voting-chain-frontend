import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  FetchSelectedVote,
  LoadFinishedVotes, LoadSelectedVote, LoadUpcomingVotes,
  VotesActionType
} from './votes.actions';
import {map, switchMap} from 'rxjs/operators';
import {VoteService} from "../services/vote.service";

@Injectable()
export class VotesEffects {
  constructor(private voteService: VoteService, private actions$: Actions) {}

  @Effect()
  FetchUpcomingVote = this.actions$.pipe(
    ofType(VotesActionType.FetchUpcomingVotesAction),
    switchMap(() => this.voteService.getAdminUpcomingVotes()),
    map(votes => new LoadUpcomingVotes(votes))
  );

  @Effect()
  FetchFinishedVote = this.actions$.pipe(
    ofType(VotesActionType.FetchFinishedVotesAction),
    switchMap(() => this.voteService.getAdminFinishedVotes()),
    map(votes => new LoadFinishedVotes(votes))
  );

  @Effect()
  FetchSelectedVote = this.actions$.pipe(
    ofType(VotesActionType.FetchSelectedVote),
    switchMap((action: FetchSelectedVote) => this.voteService.getVote(action.id)),
    map(vote => new LoadSelectedVote(vote))
  );
}
