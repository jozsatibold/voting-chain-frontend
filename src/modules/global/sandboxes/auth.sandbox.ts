import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService, ErrorHandlingService, LoadingService } from "../services";
import { User } from "../entities";
import { catchError, map, tap } from "rxjs/operators";
import { UserSandbox } from "./user.sandbox";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthSandbox {
  public isRefreshingToken = false;
  public tokenSubject = new BehaviorSubject(null);
  helper = new JwtHelperService();

  constructor(
    private loadingService: LoadingService,
    private errorHandlingService: ErrorHandlingService,
    private userSandbox: UserSandbox,
    private router: Router,
    private authService: AuthService
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.authService.login(email, password).pipe(
      map((response: { user: any; token: string; refreshToken }) => {
        this.setToken(response.token);
        this.setRefreshToken((response as any).refreshToken);
        this.loadingService.stopLoading();
        return response.user;
      }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  logout() {
    this.loadingService.startLoading();
    return this.authService.logout(localStorage.getItem("refresh-token")).pipe(
      tap(() => {
        this.clearAuthCredentials();
        this.userSandbox.clearUser();
        this.loadingService.stopLoading();
      }),
      catchError(err => this.errorHandlingService.handleError(err))
    );
  }

  loadUser(): Observable<any> {
    this.loadingService.startLoading();
    return this.authService
      .loadUser()
      .pipe(catchError(err => this.errorHandlingService.handleError(err)));
  }

  setToken(token: string) {
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
    return localStorage.getItem("auth-token");
  }

  public getRefreshToken(): string {
    return localStorage.getItem("refresh-token");
  }

  public isTokenExpired(token: string) {
    return token ? this.helper.isTokenExpired(token) : true;
  }

  public hasToken() {
    return this.getToken() && this.getToken() !== "";
  }

  clearAuthCredentials() {
    this.removeTokens();
    this.userSandbox.setLoginStatus(false);
    this.loadingService.stopLoading();
    this.isRefreshingToken = false;
  }

  public refreshToken(): Observable<any> {
    this.isRefreshingToken = true;
    this.tokenSubject.next(null);

    return this.authService.refreshToken(this.getRefreshToken()).pipe(
      map(res => {
        const token = (res as any).token;
        this.setToken(token);
        this.tokenSubject.next(token);
        this.isRefreshingToken = false;
        return token;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error && err.status === 401) {
          this.clearAuthCredentials();
          this.router.navigate(["authorization"]);
          return throwError(err);
        }
        return throwError("Cant refresh token");
      })
    );
  }
}
