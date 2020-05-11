import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserSessionType } from "../enums/user-session-types.enum";

@Injectable({
  providedIn: "root"
})
export class UiService {
  private showExtensionDialog = new BehaviorSubject<boolean>(false);
  private showMainMenu = new BehaviorSubject<boolean>(true);
  private showMainMenuRoomControllers = new BehaviorSubject<boolean>(false);
  private showChatMenu = new BehaviorSubject<boolean>(true);
  private showHeaderRoomSwitcher = new BehaviorSubject<boolean>(false);
  private sessionType = new BehaviorSubject<UserSessionType | null>(null);
  showExtensionDialog$ = this.showExtensionDialog.asObservable();
  showMainMenu$ = this.showMainMenu.asObservable();
  showMainMenuRoomControllers$ = this.showMainMenuRoomControllers.asObservable();
  showHeaderRoomSwitcher$ = this.showHeaderRoomSwitcher.asObservable();
  sessionType$ = this.sessionType.asObservable();
  showChatMenu$ = this.showChatMenu.asObservable();

  setSessionType(type: UserSessionType) {
    this.sessionType.next(type);
  }

  setExtensionDialogVisibility(val) {
    this.showExtensionDialog.next(val);
  }

  setMainMenuVisibility(val) {
    this.showMainMenu.next(val);
  }

  setMainMenuRoomControllersVisibility(val) {
    this.showMainMenuRoomControllers.next(val);
  }

  setHeaderRoomSwitcherVisibility(val) {
    this.showHeaderRoomSwitcher.next(val);
  }

  changeChatMenu() {
    this.showChatMenu.next(!this.showChatMenu.getValue());
  }

  setChatMenu(value: boolean) {
    this.showChatMenu.next(value);
  }

  toggleFullscreen(elementId: string): string {
    const document: any = window.document;
    const fs = document.getElementById(elementId);
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
      return "fullscreen";
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      return "fullscreen_exit";
    }
  }
}
