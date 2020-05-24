import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService, ErrorHandlingService} from "../services";
import {catchError, map, tap} from "rxjs/operators";
import {UserSandbox} from "./user.sandbox";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthSandbox {
  public isRefreshingToken = false;
  public tokenSubject = new BehaviorSubject(null);
  helper = new JwtHelperService();
  public _isActivated = new BehaviorSubject<boolean>(null);
  isActivated$ = this._isActivated.asObservable();
  token$ = this.tokenSubject.asObservable();

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private userSandbox: UserSandbox,
    private router: Router,
    private authService: AuthService
  ) {
  }

  init() {
    const token = this.getToken();
    this.verifyActivated(token);
  }

  login(email: string, pin: string): Observable<any> {
    return this.authService.login(email, pin).pipe(
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  loginWithToken(email: string, token: string): Observable<any> {
    return this.authService.loginToken(email, token).pipe(
      map((response: { authToken: string; refreshToken }) => {
        this.setToken(response.authToken);
        this.setRefreshToken(response.refreshToken);
        this.verifyActivated(response.authToken);
        return response;
      }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  private verifyActivated(token): void {
    if (token) {
      const decoded = this.helper.decodeToken(token);
      if (!!decoded) {
        this._isActivated.next(decoded.activated);
      }
    } else {
      this._isActivated.next(false);
    }
  }

  logout() {
    return this.authService.logout(localStorage.getItem("refresh-token")).pipe(
      tap(() => {
        this.clearUser();
      }),
      catchError(err => {
        const text = this.errorHandlingService.handleErrorText(err);
        if (text === 'User has already been logged out') {
          this.clearUser();
        }
        return Promise.reject(err);
      })
    );
  }

  private clearUser() {
    this.clearAuthCredentials();
    this.userSandbox.clearUser();
    this._isActivated.next(false);
    this.router.navigate(['authorization', 'login']);
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    localStorage.setItem("auth-token", token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem("refresh-token", token);
  }

  private removeTokens() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
  }

  public getToken(): string {
    const token = localStorage.getItem("auth-token");
    if (this.tokenSubject.getValue() === null) {
      this.tokenSubject.next(token);
    }
    return token;

  }

  public getRefreshToken(): string {
    return localStorage.getItem("refresh-token");
  }

  public isTokenExpired(token: string) {
    const expired = token ? this.helper.isTokenExpired(token) : true;
    if (expired) {
      this.refreshToken();
    }
    return expired;
  }

  public hasToken() {
    return this.getToken() && this.getToken() !== "";
  }

  clearAuthCredentials() {
    this.removeTokens();
    this.userSandbox.setLoginStatus(false);
    this.isRefreshingToken = false;
  }

  public refreshToken() {
    this.isRefreshingToken = true;
    this.tokenSubject.next(null);
    this.authService.refreshToken(this.getRefreshToken()).pipe(
      map(res => {
        const token = (res as any).authToken;
        this.setToken(token);
        this.verifyActivated(token);
        this.isRefreshingToken = false;
        return token;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if (err.error && err.status === 401) {
          this.clearAuthCredentials();
          this.router.navigate(["authorization"]);
          return throwError(err);
        }
        return throwError("Cant refresh token");
      })
    ).subscribe();
  }

  createUser = (data) => this.authService.createUser(data)
    .pipe(catchError(err => this.errorHandlingService.handleError(err)));
}
