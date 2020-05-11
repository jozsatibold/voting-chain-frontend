import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class RouteInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (environment.apiURL && !req.url.startsWith("/assets/")) {
      req = req.clone({
        url: environment.apiURL + req.url
      });
    } else {
      req = req.clone({
        url: req.url
      });
    }

    return next.handle(req);
  }
}
