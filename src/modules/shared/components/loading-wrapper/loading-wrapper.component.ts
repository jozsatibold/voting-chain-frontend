import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading-wrapper",
  template: `
    <ng-content *ngIf="condition; else: loading"></ng-content>
    <ng-template #loading>
      <div class="loading-div" [ngStyle]="style">
        <mat-spinner [diameter]="60"></mat-spinner>
      </div>
    </ng-template>
  `,
  styleUrls: ["./loading-wrapper.component.scss"]
})
export class LoadingWrapperComponent {
  @Input() condition;
  @Input() style;
}
