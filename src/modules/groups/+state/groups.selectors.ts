import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GroupsState} from './groups.reducer';

const getGroupState = createFeatureSelector<GroupsState>('groups');

const getGroups = createSelector(
  getGroupState,
  state => state.groups
);

const getSelectedGroup = createSelector(
  getGroupState,
  state => state.selectedGroup
);

const getSelectedId = createSelector(
  getGroupState,
  state => state.selectedId
);

export const GroupsSelectors = {getGroups, getSelectedGroup, getSelectedId};
