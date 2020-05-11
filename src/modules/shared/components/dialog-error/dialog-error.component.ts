import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-error",
  template: `
    <app-dialog-wrapper
      buttonText="LBL_CLOSE"
      (close)="close()"
      (buttonEvent)="close()"
    >
      <h1 mat-dialog-title>{{ data.message }}</h1>
      <p>{{ data.messageError }}</p>
    </app-dialog-wrapper>
  `,
  styleUrls: ["./dialog-error.component.css"]
})
export class DialogErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
