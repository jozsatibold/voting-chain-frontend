import {Component, Input} from "@angular/core";
import {InputType} from "@global/enums";
import {VCFormControl} from "@global/entities";

@Component({
  selector: "vc-text-input",
  template: `
    <mat-form-field class="vc-text-input">
      <mat-label *ngIf="label">{{label | translate}}</mat-label>
      <input matInput [formControl]="control.control"
             [type]="inputType"
             [placeholder]="placeholder | translate"
             [disabled]="disabled"
      [autocomplete]="!disableAutocomplete ? 'off' : null">
      <mat-error *ngIf="control.hasError()">
        {{control.getError() | translate}}
      </mat-error>
    </mat-form-field>`
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputType: InputType = "text";
  @Input() control: VCFormControl;
  @Input() disabled = false;
  @Input() disableAutocomplete = false;

}
