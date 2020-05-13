import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ErrorHandlingService } from "./error-handling.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}
}
