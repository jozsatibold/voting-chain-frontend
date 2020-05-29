import {Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Subject} from "rxjs";
import {VoteSandbox} from "../../sandboxes/vote.sandbox";
import {filter, map, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'vc-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private uiService: UiService,
              private router: ActivatedRoute,
              private voteSandbox: VoteSandbox) {
  }

  ngOnInit(): void {
    this.router.params
      .pipe(
        map(params => params['id']),
        filter(id => !!id),
      takeUntil(this.destroy$))
      .subscribe(id => this.voteSandbox.selectVote(id));
    this.voteSandbox.getSelectedVote$.pipe(
      filter(vote => !!vote),
      takeUntil(this.destroy$)
    ).subscribe(group => this.uiService.setTitle(group.title));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
