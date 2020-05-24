import {Injectable, Renderer2, RendererFactory2} from "@angular/core";
import {Theme, themes} from "../enums";
import {BehaviorSubject, Subject} from "rxjs";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "@global/services/language.service";

@Injectable({
  providedIn: "root"
})
export class UiService {
  private STORAGE_KEY = 'darkMode';
  private render: Renderer2;
  private _toggleMenu$ = new Subject();
  private _darkModeEnabled$ = new BehaviorSubject<boolean>(null);
  private _showHeader$ = new BehaviorSubject<boolean>(true);

  darkMode$ = this._darkModeEnabled$.asObservable();
  showHeader$ = this._showHeader$.asObservable();
  toggleMenu$ = this._toggleMenu$.asObservable();

  private isLoaded = false;

  toggleMenu() {
    this._toggleMenu$.next();
  }

  constructor(rendererFactory: RendererFactory2,
              private title: Title,
              private translateService: TranslateService,
              private languageService: LanguageService
  ) {
    this.render = rendererFactory.createRenderer(null, null);
    this.languageService.isLanguageLoaded().subscribe(isLoaded => this.isLoaded = isLoaded);
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

  setTitle(title: string): void {
    if (!!title && this.isLoaded) {
      this.title.setTitle(`${this.translateService.instant(title)} | VotingChain`);
    } else {
      this.title.setTitle('VotingChain');
    }
  }
}
