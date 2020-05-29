import {Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {VoteSandbox} from "../../sandboxes/vote.sandbox";
import {filter, tap} from "rxjs/operators";
import {Vote} from "@global/entities";

@Component({
  selector: 'vc-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.scss']
})
export class VoteDetailComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  vote$: Observable<Vote>;

  private voteResults: Array<any>;
  selectedDate$ = new BehaviorSubject<Date>(null);

  constructor(private voteSandbox: VoteSandbox,
              private uiService: UiService) {
  }

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData;

  ngOnInit(): void {
    this.vote$ = this.voteSandbox.getSelectedVote$.pipe(
      filter(vote => !!vote),
      tap(vote => {
        this.voteResults = vote.results;
        if (this.voteResults) {
          this.barChartData = vote.results[0].items.map(item => ({label: item.label, data: [item.value]}));
          this.selectedDate$.next(new Date(this.voteResults[0].title));
        }
        this.uiService.setTitle(vote.title);
      }));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  valueChanged(index: number) {
    if (this.voteResults) {
      this.selectedDate$.next(new Date(this.voteResults[index].title));
      this.barChartData = this.voteResults[index].items.map(item => ({label: item.label, data: [item.value]}));
    }
  }
}
