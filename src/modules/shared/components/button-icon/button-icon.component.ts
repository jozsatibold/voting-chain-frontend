import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  selector: "vc-button-icon",
  template: `
    <div class="vc-btn vc-btn--icon" [class.btn--dark]="darkBackground" matRipple>
      <mat-icon>{{ icon }}</mat-icon>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonIconComponent {
  @Input() icon;
  @Input() darkBackground = false;
}
