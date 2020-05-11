import { Component, Input } from "@angular/core";
import { ButtonType } from "../../../global/entities/general.entity";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() type: ButtonType = "primary";
  @Input() text = "";
  @Input() disabled = false;
}
