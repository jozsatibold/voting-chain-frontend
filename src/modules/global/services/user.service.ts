import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "./error-handling.service";
import {User} from "@global/entities";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {
  }

  updateUser(user: User): Observable<any> {
    return this.http.put('/api/users', user).pipe(catchError(err => this.errorHandler.handleError(err)))
  }

  updatePassword(object: {oldPin: string, newPin: string}): Observable<any> {
    return this.http.put('/api/users/password', object).pipe(catchError(err => this.errorHandler.handleError(err)))
  }
}
