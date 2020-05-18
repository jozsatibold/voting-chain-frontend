import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../modules/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {RouteInterceptor} from "./interceptors/route.interceptor";
import {GlobalModule} from "../modules/global";
import {MainComponent} from "./containers/main/main.component";
import {reducers} from "./+state";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
import {translationLoaderFactory} from "../modules/global/loader";
import {AuthorizationComponent} from "./containers/authorization/authorization.component";
import {LoginComponent} from "./containers/login/login.component";
import {RegistrationComponent} from "./containers/registration/registration.component";
import {HomeComponent} from "./containers/home/home.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {ProfileComponent} from "./containers/profile/profile.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const containers = [
  AppComponent,
  MainComponent,
  AuthorizationComponent,
  LoginComponent,
  RegistrationComponent,
  HomeComponent,
  ProfileComponent
];

const components = [FooterComponent, HeaderComponent];

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    GlobalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  entryComponents: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RouteInterceptor, multi: true},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
