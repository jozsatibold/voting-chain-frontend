import { filter, mergeMap, switchMap, take } from "rxjs/operators";
import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthSandbox } from "../../modules/global/sandboxes";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authSandbox: AuthSandbox;

  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiCall = req.url.match("^/?api/?.*$") !== null;

    if (req.url === "/api/auth/refresh" || !apiCall) {
      return next.handle(req);
    }

    this.authSandbox = this.injector.get(AuthSandbox);
    const token: string = this.authSandbox.getToken();

    if (!token) {
      return next.handle(req);
    }

    if (this.authSandbox.isRefreshingToken || this.authSandbox.isTokenExpired(token)) {
      return this.authSandbox.tokenSubject.pipe(
        filter(t => t != null),
        take(1),
        switchMap(jwtToken => {
          return next.handle(this.setAuthorizationHeader(req, jwtToken));
        })
      );
    }

    return next.handle(this.setAuthorizationHeader(req, token));
  }

  private setAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
