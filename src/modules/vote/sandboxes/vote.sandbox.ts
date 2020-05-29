import {VotesStateRef} from "../+state/votes.reducer";
import {VoteService} from "../services/vote.service";
import {
  ClearSelectedVote,
  ClearVotes,
  FetchFinishedVotes,
  FetchSelectedVote,
  FetchUpcomingVotes,
} from "../+state/votes.actions";
import {VotesSelectors} from "../+state/votes.selectors";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {Vote, VoteLite} from "@global/entities";

@Injectable({
  providedIn: 'root'
})
export class VoteSandbox {

  constructor(private store: Store<VotesStateRef>, private voteService: VoteService) {
  }

  fetchUpcomingVotes() {
    this.store.dispatch(new FetchUpcomingVotes());
  }

  fetchFinishedVotes() {
    this.store.dispatch(new FetchFinishedVotes());
  }

  upcomingVotes$: Observable<Array<VoteLite>> = this.store.select(VotesSelectors.getUpcomingVotes);

  finishedVotes$: Observable<Array<VoteLite>> = this.store.select(VotesSelectors.getFinishedVotes);

  getSelectedVote$: Observable<Vote> = this.store.select(VotesSelectors.getSelectedVote);

  getSelectedId = (): Observable<number> => this.store.select(VotesSelectors.getSelectedId);

  selectVote(id: number) {
    this.store.dispatch(new FetchSelectedVote(id));
  }

  clearVotes(): void {
    this.store.dispatch(new ClearVotes());
  }

  clearSelectedVote(): void {
    this.store.dispatch(new ClearSelectedVote());
  }
}
