import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import {NotificationTypes} from "../enums";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private notification = new ReplaySubject<{
    text: string;
    status: NotificationTypes;
    delay: number;
  }>();
  notification$ = this.notification.asObservable();

  notify(
    text: string,
    status: NotificationTypes = "success",
    delay: number = 5000
  ) {
    this.notification.next({ text, status, delay });
  }

  showNotification(
    text: string,
    type: NotificationTypes
  ) {
    this.notify(text, type);
  }
}
