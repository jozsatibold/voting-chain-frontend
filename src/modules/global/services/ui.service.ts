import {Injectable, Renderer2, RendererFactory2} from "@angular/core";
import {Theme, themes} from "../enums";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UiService {
  private STORAGE_KEY = 'darkMode';
  private render: Renderer2;
  private darkModeEnabled = new BehaviorSubject<boolean>(null);
  darkMode$ = this.darkModeEnabled.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.render = rendererFactory.createRenderer(null, null);
  }

  initTheme() {
    const enabled = localStorage.getItem(this.STORAGE_KEY);
    this.setDarkMode(!enabled || enabled === 'true');
  }

  setDarkMode(darkModeEnabled: boolean): void {
    if (this.darkModeEnabled.getValue() !== darkModeEnabled) {
      this.changeColor(darkModeEnabled ? Theme.DARK : Theme.LIGHT);
      this.darkModeEnabled.next(darkModeEnabled);
      localStorage.setItem(this.STORAGE_KEY, `${darkModeEnabled}`);
    }
  }

  changeColor(theme: Theme) {
    const selectedTheme = themes[theme];
    if (!!selectedTheme) {
      Object.keys(selectedTheme).forEach((key) => {
        document.documentElement.style.setProperty(key, selectedTheme[key]);
      });
    }
  }
}
