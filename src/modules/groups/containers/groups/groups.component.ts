import {Component, OnDestroy} from "@angular/core";
import {UiService} from "@global/services";

@Component({
  selector: "Vc-groups",
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnDestroy {

  constructor(private uiService: UiService) {}

  ngOnDestroy(): void {
    this.uiService.setTitle('');
  }
}
