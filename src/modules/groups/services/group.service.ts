import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {ErrorHandlingService} from "@global/services";
import {Group} from "@global/entities";
import {GroupMember} from "@groups/entities/group-users.entity";

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlingService
  ) {
  }

  getAdminGroups(): Observable<any> {
    return this.http.get('/api/groups/admin').pipe(
      catchError(err => this.errorHandler.handleError(err))
    );
  }

  getGroup(groupId: number): Observable<Group> {
    return this.http.get(`/api/groups/${groupId}`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  updateGroup(groupId: number, group: Group): Observable<any> {
    return this.http.put(`/api/groups/admin/${groupId}`, group, {responseType: "text"})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  createGroup(group: Group): Observable<{ id: number }> {
    return this.http.post('/api/groups/admin', group)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  groupMembers(groupId: number): Observable<Array<GroupMember>> {
    return this.http.get(`/api/groups/admin/${groupId}/members`)
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  deleteGroup(groupId: number): Observable<{ id: number }> {
    return this.http.delete(`/api/groups/admin/${groupId}`, {responseType: "text"})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  deleteGroupMember(groupId: number, memberId: number): Observable<{ id: number }> {
    return this.http.delete(`/api/groups/admin/member/${groupId}/${memberId}`, {responseType: "text"})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  searchMember(groupId: number, search: string): Observable<Array<GroupMember>> {
    return this.http.get(`/api/groups/admin/${groupId}`, {params: {search}})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }

  addMember(groupId: number, userId: number): Observable<Array<GroupMember>> {
    return this.http.post(`/api/groups/admin/member`, {userId, groupId}, {responseType: "text"})
      .pipe(catchError(err => this.errorHandler.handleError(err)));
  }
}
