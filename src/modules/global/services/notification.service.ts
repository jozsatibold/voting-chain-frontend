import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private notification = new ReplaySubject<{
    text: string;
    status: string;
    delay: number;
  }>();
  notification$ = this.notification.asObservable();

  notify(
    text: string,
    status:
      | "danger"
      | "warning"
      | "info"
      | "success"
      | "notification" = "success",
    delay: number = 5000
  ) {
    this.notification.next({ text, status, delay });
  }

  showNotification(
    text: string,
    type: "danger" | "warning" | "info" | "success" | "notification"
  ) {
    this.notify(text, type);
  }
}
