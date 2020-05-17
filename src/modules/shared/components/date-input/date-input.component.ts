import {Component, Input} from "@angular/core";
import {VCFormControl} from "@global/entities";

@Component({
  selector: "vc-date-input",
  template: `
    <mat-form-field class="vc-text-input">
      <mat-label *ngIf="label">{{label | translate}}</mat-label>
      <input matInput [formControl]="control.control"
             [matDatepicker]="picker"
             [min]="min"
             [max]="max"
             [placeholder]="placeholder | translate"
             [disabled]="disabled"
             autocomplete="off">
      <mat-error *ngIf="control.hasError()">
        {{control.getError() | translate}}
      </mat-error>
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>`
})
export class DateInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() min: Date;
  @Input() max: Date;
  @Input() control: VCFormControl;
  @Input() disabled = false;

}
