import {GroupsStateRef} from "../+state/groups.reducer";
import {GroupService} from "../services/group.service";
import {ClearGroups, ClearSelectedGroup, FetchGroups, FetchSelectedGroup, ReloadGroups} from "../+state/groups.actions";
import {Group, GroupLite} from "@global/entities/group.entity";
import {GroupsSelectors} from "../+state/groups.selectors";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GroupSandbox {
  constructor(private store: Store<GroupsStateRef>, private groupService: GroupService) {}

  fetchGroups() {
    this.store.dispatch(new FetchGroups());
  }

  reloadGroups() {
    this.store.dispatch(new ReloadGroups());
  }

  groups$: Observable<Array<GroupLite>> = this.store.select(GroupsSelectors.getGroups);

  getSelectedGroup = (): Observable<Group> => this.store.select(GroupsSelectors.getSelectedGroup);

  getSelectedId = (): Observable<number> => this.store.select(GroupsSelectors.getSelectedId);

  selectGroup(id: number) {
    this.store.dispatch(new FetchSelectedGroup(id));
  }

  clearGroups(): void {
    this.store.dispatch(new ClearGroups());
  }

  clearSelectedGroup(): void {
    this.store.dispatch(new ClearSelectedGroup());
  }

  update = (groupId: number, group) => this.groupService.updateGroup(groupId, group);

  create = (group) => this.groupService.createGroup(group);

  delete = (groupId) => this.groupService.deleteGroup(groupId);

  groupMembers = (groupId) => this.groupService.groupMembers(groupId);

  deleteGroupMember = (groupId, memberId) => this.groupService.deleteGroupMember(groupId, memberId);

  searchMember = (groupId, search) => this.groupService.searchMember(groupId, search);

  addMember  = (groupId, memberId) => this.groupService.addMember(groupId, memberId);
}
