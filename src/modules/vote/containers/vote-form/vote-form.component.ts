import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";
import {SelectOption, VCForm, VCFormControl, Vote} from "@global/entities";
import {FormService, NotificationService} from "@global/services";
import {TypeSandbox} from "@global/sandboxes";
import {Router} from "@angular/router";
import {VoteSandbox} from "@vote/sandboxes/vote.sandbox";
import {voteForm} from "@vote/containers/vote-form/vote-fomr.config";
import {FormControl, Validators} from "@angular/forms";
import {GroupService} from "@groups/services/group.service";
import {pick, omit} from 'lodash';

@Component({
  selector: "vc-group-form",
  templateUrl: './vote-form.component.html',
  styleUrls: ['./vote-form.component.scss']
})
export class VoteFormComponent implements OnInit, OnDestroy {

  voteForm: VCForm;
  isLoading$ = new BehaviorSubject<boolean>(true);
  typeOptions$: Observable<Array<SelectOption>>;
  groupOptions$: Observable<Array<SelectOption>>;
  isSubmitted = false;
  isNew = false;
  isValidResponses$ = new BehaviorSubject<boolean>(true);

  minDate: Date;
  maxDate: Date;

  responses: Array<string> = [];
  private responseCount = 0;

  private isInvalidDate$: Observable<boolean>;

  private destroy$ = new Subject();
  private id: number;

  constructor(private voteSandbox: VoteSandbox,
              private typeSandbox: TypeSandbox,
              private groupService: GroupService,
              private notificationService: NotificationService,
              private router: Router,
              private formService: FormService) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 6);
    this.groupOptions$ = this.groupService.getAdminGroups().pipe(
      map(groups => (groups || []).map(group => ({key: group.id, value: group.name})))
    );
    this.typeOptions$ = this.typeSandbox.getTypes().pipe(map(types => (types || []).map(type => ({
      key: type.name,
      value: type.name
    }))));
    this.voteForm = this.formService.buildForm(voteForm);
    this.isInvalidDate$ = this.voteForm.valueChange().pipe(
      map(values => ({beginning: values.beginning, end: values.end})),
      filter(interval => !!interval.end && !!interval.beginning),
      map(interval => new Date(interval.beginning).getTime() > new Date(interval.end).getTime())
    );
    combineLatest([this.voteSandbox.getSelectedVote$, this.voteSandbox.getSelectedId()])
      .pipe(
        debounceTime(500),
        map(([vote, id]) => {
          if (!!id) {
            return vote;
          }
          this.isNew = true;
          this.isLoading$.next(false);
          return null;
        }),
        filter(vote => !!vote),
        tap(vote => this.id = vote.id),
        map(vote => ({
          title: vote.title,
          description: vote.description,
          type: vote.type ? vote.type.name : null,
          end: vote.end,
          beginning: vote.beginning,
          groupId: vote.group.id,
          responses: (vote.responses || []).map(response => response.value)
        })),
        takeUntil(this.destroy$)
      )
      .subscribe(group => {
        this.responseCount = 0;
        this.responses = [];
        this.voteForm.form().setValue(omit(group, ['responses']));
        (group.responses || []).forEach(response => this.addResponse(response));
        this.isLoading$.next(false);
      });
  }

  save() {
    if (this.responses.length < 2) {
      this.isValidResponses$.next(false);
      return;
    } else {
      this.isValidResponses$.next(true);
    }
    if (!this.voteForm.valid() || this.isSubmitted || (!this.isNew && !this.id)) {
      return;
    }

    this.isSubmitted = true;
    const value = this.voteForm.value();
    const vote: Vote = {
      ...pick(value, ['title', 'description', 'groupId', 'type']),
      beginning: new Date(value.beginning).getTime(),
      end: new Date(value.end).getTime(),
      responses: this.responses.map(response => ({
        value: value[response],
        logo: "",
        description: ""
      }))
    };
    (this.isNew ? this.voteSandbox.create(vote) : this.voteSandbox.update({...vote, id: this.id}))
      .subscribe(
        (resp: any) => {
          this.voteSandbox.fetchUpcomingVotes();
          this.notificationService.showNotification(this.isNew ? 'LBL_ACTION.SAVE' : 'LBL_ACTION.UPDATE', "success");
          this.voteSandbox.selectVote(this.isNew ? resp.id : this.id);
          this.isSubmitted = false;
          this.router.navigate(['votes', this.isNew ? resp.id : this.id]);
        },
        () => {
          this.isSubmitted = false;
        }
      );
  }

  delete() {
    if (this.isNew || !this.id) {
      return;
    }
    this.isSubmitted = true;
    this.voteSandbox.delete(this.id).subscribe(
      () => {
        this.notificationService.showNotification('LBL_ACTION.DELETE', "success");
        this.voteSandbox.fetchUpcomingVotes();
        this.router.navigate(['votes']);
        this.isSubmitted = false;
      },
      () => this.isSubmitted = false
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  addResponse(value = '') {
    if (this.responseCount < 10) {
      const name = `response=${this.responseCount}`;
      this.voteForm.addControl(
        new VCFormControl(new FormControl(value, [Validators.required]), [{
          type: 'required',
          error: 'LBL_INPUT.ERROR.REQUIRED'
        }]),
        name
      );
      this.responses.push(name);
      ++this.responseCount;
    }
  }

  removeResponse(name: string) {
    if (this.responses.includes(name)) {
      const index = this.responses.indexOf(name);
      if (index >= 0) {
        this.responses.splice(index, 1);
        this.voteForm.removeControl(name);
      }
    }
  }
}
