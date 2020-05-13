import {Injectable, Renderer2, RendererFactory2} from "@angular/core";
import {Theme, themes} from "../enums";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UiService {
  private STORAGE_KEY = 'darkMode';
  private render: Renderer2;
  private _darkModeEnabled$ = new BehaviorSubject<boolean>(null);
  private _showHeader$ = new BehaviorSubject<boolean>(true);

  darkMode$ = this._darkModeEnabled$.asObservable();
  showHeader$ = this._showHeader$.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    const enabled = localStorage.getItem(this.STORAGE_KEY);
    this.setDarkMode(!enabled || enabled === 'true');
  }

  setDarkMode(darkModeEnabled: boolean): void {
    if (this._darkModeEnabled$.getValue() !== darkModeEnabled) {
      this.changeColor(darkModeEnabled ? Theme.DARK : Theme.LIGHT);
      this._darkModeEnabled$.next(darkModeEnabled);
      localStorage.setItem(this.STORAGE_KEY, `${darkModeEnabled}`);
    }
  }

  private changeColor(theme: Theme) {
    const selectedTheme = themes[theme];
    if (!!selectedTheme) {
      Object.keys(selectedTheme).forEach((key) => {
        document.documentElement.style.setProperty(key, selectedTheme[key]);
      });
    }
  }

  showHeader(show: boolean): void {
    this._showHeader$.next(show);
  }

}
