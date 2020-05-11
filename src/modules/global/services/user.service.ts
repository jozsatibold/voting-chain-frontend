import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ErrorHandlingService } from "./error-handling.service";
import { Status, User } from "../entities";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {}

  createUser(data): Observable<any> {
    return this.http
      .post("/api/users", data)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  updateUser(data): Observable<User> {
    return this.http
      .put("/api/users/me", data)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  uploadProfileImage(data): Observable<any> {
    return this.http
      .put("/api/users/me/image", data, { responseType: "text" })
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  deleteProfileImage(): Observable<any> {
    return this.http
      .delete("/api/users/me/image", { responseType: "text" })
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  getProfileImage(): Observable<any> {
    return this.http
      .get("/api/users/me/image", { responseType: "blob" })
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  getUserProfileImage(userId) {
    return this.http
      .get(`/api/users/${userId}/image`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  setUserStatus(userId, data: Status) {
    return this.http
      .put(`/api/users/${userId}/status`, data)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  clearUserStatus(userId) {
    return this.http
      .delete(`/api/users/${userId}/status`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  getUsers(params: { search?: string }) {
    return this.http
      .get("/api/users", { params })
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
