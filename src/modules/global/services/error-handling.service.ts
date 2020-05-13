import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: "root"
})
export class ErrorHandlingService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  private _getErrorText(error): string {
    try {
      const statusCode = error.status;
      const messageError = error.error.message;

      if (statusCode === 422 && messageError === "ValidationError") {
        return error.error.errors.reduce((elem, sum) => `${sum} ${elem}`, "");
      }

      return messageError;
    } catch (err) {
      return "LBL_ERROR_GENERAL_TEXT";
    }
  }

  handleError(error: any, notification = true): Promise<any> {
    const text = this._getErrorText(error);
    if (notification) {
      this.notificationService.notify(text, "danger", 5000);
    }
    return Promise.reject(error);
  }
}
