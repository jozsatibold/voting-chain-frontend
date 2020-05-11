import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "app-dialog-wrapper",
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <h3 mat-dialog-title class="d-inline mt-1 mb-0">
          <span>{{ title | translate: { value: titleValue } }}</span>
          <span *ngIf="subTitle">
            | <b>{{ subTitle | translate: { value: subTitleValue } }}</b></span
          >
        </h3>
        <div
          (click)="closeEvent()"
          class="dialog__header__close svg-icon"
          mat-ripple
        >
          <svg-icon
            src="/assets/images/icons/mini-x-1.svg"
            [applyCss]="true"
          ></svg-icon>
        </div>
      </div>
      <perfect-scrollbar class="dialog__content">
        <ng-content></ng-content>
      </perfect-scrollbar>
      <div [class]="'dialog__footer dialog__footer--' + buttonAlign">
        <app-button
          type="secondary"
          *ngIf="secondaryButtonText"
          (click)="onConfirm(false)"
          [disabled]="secondaryButtonDisabled"
          [text]="secondaryButtonText"
        ></app-button>
        <app-button
          *ngIf="buttonText"
          [disabled]="buttonDisabled"
          (click)="onConfirm(true)"
          [text]="buttonText"
        ></app-button>
      </div>
    </div>
  `,
  styleUrls: ["./dialog-wrapper.component.scss"]
})
export class DialogWrapperComponent {
  @Input() title;
  @Input() titleValue;
  @Input() subTitle;
  @Input() subTitleValue;
  @Input() buttonText: string;
  @Input() buttonAlign: "left" | "right" | "center" = "center";
  @Input() buttonDisabled = false;
  @Input() secondaryButtonText: string;
  @Input() secondaryButtonDisabled = false;
  @Output() buttonEvent = new EventEmitter();
  @Output() close = new EventEmitter();

  @HostListener("document:keydown.escape")
  closeEvent() {
    this.close.emit();
  }

  onConfirm(value: boolean) {
    this.buttonEvent.emit(value);
  }
}
