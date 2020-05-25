import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from "@angular/core";
import {ButtonAlign} from "@global/enums";

@Component({
  selector: "vc-dialog-wrapper",
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h2 mat-dialog-title>{{ title | translate }}</h2>
        <div
          (click)="closeDialog()"
          class="dialog__header__close svg-icon"
          mat-ripple
        >
          <mat-icon>close</mat-icon>
        </div>
      </div>
      <perfect-scrollbar class="dialog__content">
        <ng-content></ng-content>
      </perfect-scrollbar>
      <div [class]="'dialog__footer dialog__footer--' + buttonAlign">
        <vc-button
          type="secondary"
          *ngIf="secondaryButtonText"
          (click)="onConfirm(false)"
          [disabled]="secondaryButtonDisabled"
          [text]="secondaryButtonText"
        ></vc-button>
        <vc-button
          *ngIf="buttonText"
          [disabled]="buttonDisabled"
          (click)="onConfirm(true)"
          [text]="buttonText"
        ></vc-button>
      </div>
    </div>
  `,
  styleUrls: ["./dialog-wrapper.component.scss"]
})
export class DialogWrapperComponent {
  @Input() title;
  @Input() buttonText: string;
  @Input() buttonAlign: ButtonAlign = "center";
  @Input() buttonDisabled = false;
  @Input() secondaryButtonText: string;
  @Input() secondaryButtonDisabled = false;
  @Output() buttonEvent = new EventEmitter();
  @Output() close = new EventEmitter();

  @HostListener("document:keydown.escape", ['$event'])
  closeEvent($event) {
    $event.preventDefault();
    this.closeDialog();
  }

  closeDialog() {
    this.close.emit();
  }

  onConfirm(value: boolean) {
    this.buttonEvent.emit(value);
  }
}
