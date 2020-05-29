import {Component, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Observable} from "rxjs";
import {VoteSandbox} from "../../sandboxes/vote.sandbox";
import {GroupList} from "@global/entities/group.entity";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {VoteLite} from "@global/entities";

@Component({
  selector: "vc-vote-list",
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.scss']
})
export class VoteListComponent implements OnInit {

  upcomingVotes$: Observable<Array<VoteLite>>;
  finishedVotes$: Observable<Array<VoteLite>>;

  isEmpty = {
    upcoming: false,
    finished: false
  };

  constructor(private uiService: UiService,
              private voteSandbox: VoteSandbox,
              private router: Router) {
  }

  ngOnInit(): void {
    this.upcomingVotes$ = this.voteSandbox.upcomingVotes$.pipe(
      tap(votes => {
        if (votes === null) {
          this.voteSandbox.fetchUpcomingVotes();
        }
        this.isEmpty.upcoming = !votes || !votes.length;
      })
    );
    this.finishedVotes$ = this.voteSandbox.finishedVotes$.pipe(
      tap(votes => {
        if (votes === null) {
          this.voteSandbox.fetchFinishedVotes();
        }
        this.isEmpty.finished = !votes || !votes.length;
      })
    );
    this.uiService.setTitle('LBL_PAGE.VOTES');
  }

  openVote(voteId: number): void {
    if (!voteId) {
      return;
    }
    this.voteSandbox.clearSelectedVote();
    this.router.navigate(['votes', voteId]);
  }
}
