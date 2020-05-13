import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<object> {
    return this.http.post("/api/auth/admin", { email, password });
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
}
