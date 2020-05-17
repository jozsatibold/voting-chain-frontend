import {Component, OnInit} from "@angular/core";
import {UiService} from "@global/services";
import {Observable} from "rxjs";
import {User} from "@global/entities";
import {UserSandbox} from "@global/sandboxes";

@Component({
  selector: "vc-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  user$: Observable<User>;
  constructor(private uiService: UiService,
              private userSandbox: UserSandbox) {
  }

  ngOnInit() {
    this.user$ = this.userSandbox.getUser();
  }

  openMenu() {
    this.uiService.toggleMenu();
  }
}
