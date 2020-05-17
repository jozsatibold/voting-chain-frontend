import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";
import {UserSandbox} from "@global/sandboxes";

@Component({
  selector: "vc-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor(private userSandbox: UserSandbox) {}

  ngOnInit(): void {
    this.userSandbox.setLoginStatus(true);
  }

  ngAfterViewChecked() {}

  ngOnDestroy(): void {}
}
