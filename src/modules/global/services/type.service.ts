import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlingService} from "@global/services/error-handling.service";
import {Observable} from "rxjs";
import {Type} from "@global/entities/type.entiry";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TypeService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {
  }

  loadTypes(): Observable<Array<Type>> {
    return this.http.get('/api/types').pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
