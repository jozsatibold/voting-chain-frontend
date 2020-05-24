import {Component, OnDestroy, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Subject} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";

@Component({
  selector: 'vc-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  date = new Date();
  constructor(private uiService: UiService,
              private groupSandbox: GroupSandbox) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
