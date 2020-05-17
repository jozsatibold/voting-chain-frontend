import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "@global/entities";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, pin: string): Observable<object> {
    return this.http.post("/api/auth/admin", { email, pin });
  }

  loginToken(email: string, token: string): Observable<object> {
    return this.http.put("/api/auth/admin", { email, token });
  }

  logout(refreshToken) {
    return this.http.post("/api/auth/logout", { refreshToken });
  }

  loadUser(): Observable<any> {
    return this.http.get("/api/users");
  }

  refreshToken(refreshToken): Observable<any> {
    return this.http.put("/api/auth/refresh", { refreshToken });
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/auth/registration', user);
  }
}
