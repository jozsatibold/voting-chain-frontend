import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {UiService} from "@global/services";
import {Observable, of, Subject} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {GroupMember} from "@groups/entities/group-users.entity";
import {FormControl} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VCFormControl} from "@global/entities";

@Component({
  selector: 'vc-new-members-dialog',
  templateUrl: './new-member-component-dialog.component.html',
  styleUrls: ['./new-member-component-dialog.component.scss']
})
export class NewMemberComponentDialog implements OnInit {

  searchControl = new VCFormControl(new FormControl(), []);
  result$: Observable<Array<GroupMember>>;
  constructor(private dialogRef: MatDialogRef<NewMemberComponentDialog>, @Inject(MAT_DIALOG_DATA) public data: {groupId: number},
              private groupSandbox: GroupSandbox) {
  }

  ngOnInit(): void {
    this.result$ = this.searchControl.control.valueChanges
      .pipe(switchMap(value => value && value.length > 2 ? this.groupSandbox.searchMember(this.data.groupId, value) : of([])));
  }

  addMember(member) {
    this.dialogRef.close(member);
  }

  close() {
    this.dialogRef.close();
  }
}
