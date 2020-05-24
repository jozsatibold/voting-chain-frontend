import {GroupsActions, GroupsActionType} from './groups.actions';
import {Group, GroupLite} from "@global/entities/group.entity";

export interface GroupsStateRef {
  groups: GroupsState;
}

export interface GroupsState {
  groups: Array<GroupLite>;
  selectedGroup: Group;
  selectedId: number;
}

export const initialState: GroupsState = {
  groups: null,
  selectedGroup: null,
  selectedId: 0
};

export function groupsReducer(state = initialState, action: GroupsActions): GroupsState {
  switch (action.type) {
    case GroupsActionType.LoadGroupsAction:
      return {...state, groups: action.groups};
    case GroupsActionType.ClearGroupsAction:
      return {...initialState};
    case GroupsActionType.LoadSelectedGroup:
      return {...state, selectedGroup: action.group};
    case GroupsActionType.FetchSelectedGroup:
      return {...state, selectedId: action.id};
    case GroupsActionType.ClearSelectedGroup:
      return {...state, selectedGroup: initialState.selectedGroup, selectedId: initialState.selectedId};
    default:
      return state;
  }
}
