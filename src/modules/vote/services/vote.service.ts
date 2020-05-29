import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {ErrorHandlingService} from "@global/services";
import {Vote, VoteLite} from "@global/entities";

@Injectable({
  providedIn: "root"
})
export class VoteService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {
  }

  getAdminUpcomingVotes(): Observable<Array<VoteLite>> {
    return this.http.get('/api/votes/admin/upcoming?page=0&size=100').pipe(
      catchError(err => this.errorHandler.handleError(err))
    );
  }

  getAdminFinishedVotes(): Observable<Array<VoteLite>> {
    return this.http.get('/api/votes/admin/finished?page=0&size=100').pipe(
      catchError(err => this.errorHandler.handleError(err))
    );
  }

  getVote(voteId: number): Observable<Vote> {
    return this.http.get(`/api/votes/${voteId}`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
