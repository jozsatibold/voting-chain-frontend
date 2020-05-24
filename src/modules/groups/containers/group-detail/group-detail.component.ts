import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {filter} from "rxjs/operators";
import {Group} from "@global/entities";

@Component({
  selector: 'vc-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  group$: Observable<Group>;

  constructor(private groupSandbox: GroupSandbox) {
  }

  ngOnInit(): void {
    this.group$ = this.groupSandbox.getSelectedGroup().pipe(filter(group => !!group));
  }
}
