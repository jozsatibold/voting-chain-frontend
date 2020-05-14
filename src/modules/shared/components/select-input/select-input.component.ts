import {Component, Input} from "@angular/core";
import {SelectOption, VCFormControl} from "@global/entities";

@Component({
  selector: "vc-select-input",
  template: `
    <mat-form-field class="vc-text-input">
      <mat-label *ngIf="label">{{label | translate}}</mat-label>
      <mat-select [placeholder]="placeholder | translate" [formControl]="control.control">
        <mat-option *ngFor="let option of options" [value]="option.key">
          {{option.value | translate}}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="control.hasError()">
        {{control.getError() | translate}}
      </mat-error>
    </mat-form-field>`
})
export class SelectInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: VCFormControl;
  @Input() disabled = false;
  @Input() options: Array<SelectOption> = [];
}
