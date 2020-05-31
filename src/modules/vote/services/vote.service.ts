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

  create(vote: Vote): Observable<string> {
    return this.http.post('/api/votes/admin', vote)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  update(vote: Vote): Observable<string> {
    return this.http.put(`/api/votes/admin/${vote.id}`, vote)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  delete(voteId: number): Observable<string> {
    return this.http.delete(`/api/votes/admin/${voteId}`, {responseType: 'text'})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
