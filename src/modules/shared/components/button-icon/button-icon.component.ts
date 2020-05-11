import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-button-icon",
  templateUrl: "./button-icon.component.html",
  styleUrls: ["./button-icon.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonIconComponent {
  @Input() svgSrc;
  @Input() materialIcon;
  @Input() darkBackground = false;
  @Input() defaultSize = true;
}
