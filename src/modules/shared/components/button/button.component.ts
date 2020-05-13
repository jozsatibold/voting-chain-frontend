import {Component, Input} from "@angular/core";
import {ButtonType} from "../../../global/entities/general.entity";

@Component({
  selector: "vc-button",
  template: `
    <button
      class="vc-btn"
      mat-button
      [disabled]="disabled"
      [class.vc-btn--primary]="type === 'primary'"
      [class.vc-btn--secondary]="type === 'secondary'">
      {{ text | translate }}
    </button>`
})
export class ButtonComponent {
  @Input() type: ButtonType = "primary";
  @Input() text = "";
  @Input() disabled = false;
}
