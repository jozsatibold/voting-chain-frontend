import {Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Subject} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {filter, map, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'vc-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private uiService: UiService,
              private router: ActivatedRoute,
              private groupSandbox: GroupSandbox) {
  }

  ngOnInit(): void {
    this.router.params
      .pipe(
        map(params => params['id']),
        filter(id => !!id),
      takeUntil(this.destroy$))
      .subscribe(id => this.groupSandbox.selectGroup(id));
    this.groupSandbox.getSelectedGroup().pipe(
      filter(group => !!group),
      takeUntil(this.destroy$)
    ).subscribe(group => this.uiService.setTitle(group.name));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
