import {Action} from '@ngrx/store';
import {Group, GroupLite} from "@global/entities/group.entity";

export enum GroupsActionType {
  FetchGroupsAction = '[Groups] fetch groups',
  LoadGroupsAction = '[Groups] load groups',
  ReloadGroupsAction = '[Groups] reload groups',
  ClearGroupsAction = '[Groups] clear groups',
  FetchSelectedGroup = '[Groups] fetch selected group',
  LoadSelectedGroup = '[Group] load selected group',
  ClearSelectedGroup = '[Group] clear selected group'
}

export class FetchGroups implements Action {
  readonly type = GroupsActionType.FetchGroupsAction;

  constructor() {}
}

export class LoadGroups implements Action {
  readonly type = GroupsActionType.LoadGroupsAction;

  constructor(readonly groups: Array<GroupLite>) {}
}

export class ReloadGroups implements Action {
  readonly type = GroupsActionType.ReloadGroupsAction;

  constructor() {}
}

export class ClearGroups implements Action {
  readonly type = GroupsActionType.ClearGroupsAction;

  constructor() {}
}

export class FetchSelectedGroup implements Action {
  readonly type = GroupsActionType.FetchSelectedGroup;

  constructor(readonly id: number) {}
}

export class LoadSelectedGroup implements Action {
  readonly type = GroupsActionType.LoadSelectedGroup;
  constructor(readonly group: Group) {
  }
}

export class ClearSelectedGroup implements Action {
  readonly type = GroupsActionType.ClearSelectedGroup;
  constructor() {
  }
}

export type GroupsActions =
  LoadGroups |
  FetchGroups |
  ReloadGroups |
  ClearGroups |
  FetchSelectedGroup |
  LoadSelectedGroup |
  ClearSelectedGroup;
