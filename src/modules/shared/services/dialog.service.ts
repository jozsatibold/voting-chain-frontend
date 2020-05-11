import { Injectable } from "@angular/core";
import {
  DialogPosition,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  readonly DIALOG_PANEL_CLASS = "vcDialog";

  private modalInstance: MatDialogRef<any> | null = null;

  constructor(public dialog: MatDialog) {}

  open(
    popupComponent: any,
    position?: DialogPosition,
    params?: { [key: string]: any },
    disableDefaultClass = false
  ) {
    return this.modalInstance &&
      this.modalInstance.componentInstance instanceof popupComponent
      ? this.modalInstance
      : this.openNewModal(
          popupComponent,
          position,
          params,
          disableDefaultClass
        );
  }

  close(reason?: string) {
    if (!this.modalInstance) {
      return;
    }

    this.modalInstance.close(reason);
    this.modalInstance = null;
  }

  private openNewModal(
    content: any,
    position: DialogPosition,
    params?: { [key: string]: any },
    disableDefaultClass = false
  ) {
    const classes = disableDefaultClass ? [] : [this.DIALOG_PANEL_CLASS];
    if (params && params.classes && Array.isArray(params.classes)) {
      classes.push(...params.classes);
    }
    const config = { position, panelClass: classes, ...params };
    const modalRef = (this.modalInstance = this.dialog.open(content, config));
    modalRef
      .afterClosed()
      .subscribe(
        () => (this.modalInstance = null),
        () => (this.modalInstance = null)
      );

    return modalRef;
  }
}
