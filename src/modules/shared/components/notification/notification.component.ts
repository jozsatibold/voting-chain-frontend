import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, interval, Subject } from "rxjs";
import {filter, map, takeUntil, tap} from "rxjs/operators";
import { NotificationService } from "@global/services";

@Component({
  selector: "vc-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnDestroy, OnInit {
  destroy$ = new Subject<string>();
  private notificationId = 0;
  private status = {
    danger: 'error',
    warning: 'warning',
    info: 'info',
    success: 'check_circle',
    notification: 'announcement'
  };

  notifications$ = new BehaviorSubject<
    Array<{ text: string; status: string; until: number; index: number, icon: string }>
  >([]);

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    interval(500)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.verify(this.notifications$));

    this.notificationService.notification$
      .pipe(
        filter(
          data =>
            !!data &&
            !!data.text &&
            !!data.status &&
            !!data.delay &&
            +data.delay > 1000
        ),
        map(data => ({...data, icon: this.status[data.status]})),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        if (data.text) {
          const notifications = this.notifications$.getValue();
          const index = notifications.findIndex(
            notifications =>
              notifications.text === data.text &&
              data.status === notifications.status
          );
          if (index >= 0) {
            notifications.splice(index, 1);
          }
          notifications.unshift({
            text: this.changeText(data.text || "", data.status),
            status: data.status,
            index: this.notificationId,
            icon: data.icon,
            until: new Date().getTime() + data.delay
          });
          ++this.notificationId;
          this.notifications$.next(notifications);
        }
      });
  }

  verify(notifications$): void {
    const notifications = notifications$.getValue();
    if (!!notifications.length) {
      const currentMillis = new Date().getTime();
      const expired = notifications
        .map((notification, index) => ({
          until: notification.until,
          index
        }))
        .filter(notification => notification.until < currentMillis);
      expired.forEach(expired => notifications.splice(expired.index, 1));
      notifications$.next(notifications);
    }
  }

  hover(index) {
    const notifications = this.notifications$.getValue();
    notifications[index].until += 1000;
    this.notifications$.next(notifications);
  }

  changeText(text: string, status: string): string {
    return text;
    // return status !== "danger" || text.includes("LBL_")
    //   ? text
    //   : "LBL_ERROR_GENERAL_TEXT";
  }

  remove(index) {
    const notifications = this.notifications$.getValue();
    notifications.splice(index, 1);
    this.notifications$.next(notifications);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
