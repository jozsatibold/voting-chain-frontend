import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {FetchSelectedGroup, GroupsActionType, LoadGroups, LoadSelectedGroup} from './groups.actions';
import {map, switchMap} from 'rxjs/operators';
import {GroupService} from "../services/group.service";

@Injectable()
export class GroupsEffects {
  constructor(private groupService: GroupService, private actions$: Actions) {}

  @Effect()
  FetchGroups = this.actions$.pipe(
    ofType(GroupsActionType.FetchGroupsAction),
    switchMap(() => this.groupService.getAdminGroups()),
    map(groups => new LoadGroups(groups))
  );

  @Effect()
  ReloadGroups = this.actions$.pipe(
    ofType(GroupsActionType.ReloadGroupsAction),
    switchMap(() => this.groupService.getAdminGroups()),
    map(groups => new LoadGroups(groups))
  );

  @Effect()
  FetchSelectedGroup = this.actions$.pipe(
    ofType(GroupsActionType.FetchSelectedGroup),
    switchMap((action: FetchSelectedGroup) => this.groupService.getGroup(action.id)),
    map(group => new LoadSelectedGroup(group))
  );
}
