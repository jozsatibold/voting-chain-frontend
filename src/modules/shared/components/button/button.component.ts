import {Component, Input} from "@angular/core";
import {ButtonInputType, ButtonType} from "@global/enums/general.enum";

@Component({
  selector: "vc-button",
  template: `
    <button
      class="vc-btn"
      matRipple
      [type]="inputType"
      [disabled]="disabled"
      [class.vc-btn--primary]="type === 'primary'"
      [class.vc-btn--secondary]="type === 'secondary'">
      {{ text | translate }}
    </button>`
})
export class ButtonComponent {
  @Input() type: ButtonType = "primary";
  @Input() inputType: ButtonInputType = "button";
  @Input() text = "";
  @Input() disabled = false;
}
