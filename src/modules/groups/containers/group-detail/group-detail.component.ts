import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, EMPTY, Observable, Subject} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {Group} from "@global/entities";
import {GroupMember} from "@groups/entities/group-users.entity";
import {DialogService} from "@shared/services/dialog.service";
import {NewMemberComponentDialog} from "@groups/containers/new-member-dialog/new-member-component-dialog.component";
import {NotificationService} from "@global/services";

@Component({
  selector: 'vc-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {

  group$: Observable<Group>;
  members$: Observable<Array<GroupMember>>;

  private destroy$ = new Subject();

  private isLoading = false;

  private groupId$ = new BehaviorSubject<number>(null);

  constructor(private groupSandbox: GroupSandbox,
              private notificationService: NotificationService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.group$ = this.groupSandbox.getSelectedGroup().pipe(
      filter(group => !!group),
      tap(group => this.groupId$.next(group.id))
    );
    this.members$ = this.groupId$.pipe(
      filter(groupId => !!groupId),
      switchMap(groupId => this.groupSandbox.groupMembers(groupId))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  deleteMember(member: GroupMember) {
      if(!member || !this.groupId$.getValue() || this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.groupSandbox.deleteGroupMember(this.groupId$.getValue(), member.userId).subscribe(
        () => {
          this.notificationService.showNotification('LBL_ACTION.DELETE', 'success');
          this.groupId$.next(this.groupId$.getValue());
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  openNewMemberDialog(): void {
    const dialogRef = this.dialogService.open(NewMemberComponentDialog, {}, {data: {groupId: this.groupId$.getValue()}});
    dialogRef
      .afterClosed()
      .pipe(
        switchMap(member => !!member ? this.groupSandbox.addMember(this.groupId$.getValue(), member.userId) : EMPTY),
        takeUntil(this.destroy$))
      .subscribe(resp => {
        if (resp) {
          this.groupId$.next(this.groupId$.getValue());
          this.notificationService.showNotification('LBL_ACTION.INVITED', 'success');
        }
      });
  }
}
