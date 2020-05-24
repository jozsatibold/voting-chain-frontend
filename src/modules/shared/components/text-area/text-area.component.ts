import {Component, Input} from "@angular/core";
import {InputType} from "@global/enums";
import {VCFormControl} from "@global/entities";

@Component({
  selector: "vc-text-area",
  template: `
    <mat-form-field *ngIf="control" class="vc-text-input">
      <mat-label *ngIf="label">{{label | translate}}</mat-label>
      <textarea matInput [formControl]="control.control"
                [type]="inputType"
                [placeholder]="placeholder | translate"
                [disabled]="disabled"></textarea>
      <mat-error *ngIf="control.hasError()">
        {{control.getError() | translate}}
      </mat-error>
    </mat-form-field>`
})
export class TextAreaComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputType: InputType = "text";
  @Input() control: VCFormControl;
  @Input() disabled = false;
}
