import {Component, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {combineLatest, Observable} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {GroupList} from "@global/entities/group.entity";
import {filter, map, tap} from "rxjs/operators";
import {TypeSandbox} from "@global/sandboxes";
import {Type} from "@global/entities";
import {Router} from "@angular/router";

@Component({
  selector: "vc-group-list",
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups$: Observable<Array<GroupList>>;

  private types$: Observable<Array<Type>>;

  constructor(private uiService: UiService,
              private groupSandbox: GroupSandbox,
              private typeSandbox: TypeSandbox,
              private router: Router) {
  }

  ngOnInit(): void {
    this.types$ = this.typeSandbox.getTypes().pipe(filter(types => !!types));
    this.groups$ = combineLatest([this.groupSandbox.groups$, this.types$]).pipe(
      tap(([groups, _]) => {
        if (groups === null) {
          this.groupSandbox.fetchGroups();
        }
      }),
      map(([groups, types]) => groups ? (groups || []).map(group => ({
        name: group.name,
        type: (types || []).find(type => type.name === group.type) || (types || []).find(type => type.name === 'OTHER'),
        id: group.id
      })) : null)
    );
    this.uiService.setTitle('LBL_PAGE.GROUPS');
  }

  openGroup(groupId: number): void {
    if (!groupId) {
      return;
    }
    this.groupSandbox.clearSelectedGroup();
    this.router.navigate(['groups', groupId]);
  }
}
