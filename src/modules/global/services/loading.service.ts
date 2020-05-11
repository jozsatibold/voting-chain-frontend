import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private isLoading = new ReplaySubject<boolean>(1);

  isLoading$ = this.isLoading.asObservable();

  startLoading(): void {
    this.isLoading.next(true);
  }

  stopLoading(): void {
    this.isLoading.next(false);
  }
}
