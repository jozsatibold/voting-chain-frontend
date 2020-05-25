import {Component, EventEmitter, Input, Output} from "@angular/core";
import {GroupMember} from "@groups/entities/group-users.entity";

@Component({
  selector: 'vc-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss']
})
export class GroupMemberComponent {

  @Input() member: GroupMember = null;
  @Input() deletable = true;

  @Output() delete = new EventEmitter<GroupMember>();

}
