import {Component, Input} from "@angular/core";
import {VCFormControl} from "@global/entities";

@Component({
  selector: "vc-date-time-input",
  template: `
    <mat-form-field class="vc-text-input">
      <mat-label *ngIf="label">{{label | translate}}</mat-label>

      <input matInput [ngxMatDatetimePicker]="picker" [placeholder]="placeholder | translate" [formControl]="control.control"
             [min]="min" [max]="max" [disabled]="disabled">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <ngx-mat-datetime-picker #picker [showSeconds]="false"
                               [stepHour]="true" [stepMinute]="true" [stepSecond]="false"
                               [touchUi]="false" [color]="'#FFFF00'" [enableMeridian]="true"
                               [disableMinute]="false">
      </ngx-mat-datetime-picker>

      <mat-error *ngIf="control.hasError()">
        {{control.getError() | translate}}
      </mat-error>

    </mat-form-field>`
})
export class DateTimeInputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() min: Date;
  @Input() max: Date;
  @Input() control: VCFormControl;
  @Input() disabled = false;

}
