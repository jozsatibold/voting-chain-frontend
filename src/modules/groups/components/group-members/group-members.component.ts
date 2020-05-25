import {Component, EventEmitter, Input, Output} from "@angular/core";
import {GroupMember} from "@groups/entities/group-users.entity";

@Component({
  selector: 'vc-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss']
})
export class GroupMembersComponent {

  @Input() members: Array<GroupMember> = null;

  @Output() delete = new EventEmitter<GroupMember>();

}
