import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {GroupSandbox} from "../../sandboxes/group.sandbox";
import {debounceTime, filter, map, takeUntil, tap} from "rxjs/operators";
import {SelectOption, VCForm} from "@global/entities";
import {FormService, NotificationService} from "@global/services";
import {Validators} from "@angular/forms";
import {TypeSandbox} from "@global/sandboxes";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "vc-group-form",
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit, OnDestroy {

  groupForm: VCForm;
  isLoading$ = new BehaviorSubject<boolean>(true);
  typeOptions$: Observable<Array<SelectOption>>;
  isSubmitted = false;
  isNew = false;

  private destroy$ = new Subject();
  private id: number;

  constructor(private groupSandbox: GroupSandbox,
              private typeSandbox: TypeSandbox,
              private notificationService: NotificationService,
              private router: Router,
              private formService: FormService) {
  }

  ngOnInit(): void {
    this.typeOptions$ = this.typeSandbox.getTypes().pipe(map(types => (types || []).map(type => ({
      key: type.name,
      value: type.name
    }))));
    this.groupForm = this.formService.buildForm([
      {
        name: 'name',
        value: '',
        validators: [
          {
            error: 'LBL_INPUT.ERROR.REQUIRED',
            validator: Validators.required
          }]
      },
      {
        name: 'description',
        value: '',
        validators: [{
          error: 'LBL_INPUT.ERROR.REQUIRED',
          validator: Validators.required
        }]
      },
      {
        name: 'type',
        value: '',
        validators: [{
          error: 'LBL_INPUT.ERROR.REQUIRED',
          validator: Validators.required
        }]
      }]);

    combineLatest([this.groupSandbox.getSelectedGroup(), this.groupSandbox.getSelectedId()])
      .pipe(
        debounceTime(500),
        map(([group, id]) => {
          if (!!id) {
            return group;
          }
          this.isNew = true;
          this.isLoading$.next(false);
          return null;
        }),
        filter(group => !!group),
        tap(group => this.id = group.id),
        map(group => ({
          name: group.name,
          description: group.description,
          type: group.type ? group.type.name : null
        })),
        takeUntil(this.destroy$)
      )
      .subscribe(group => {
        this.groupForm.form().setValue(group);
        this.isLoading$.next(false);
      });
  }

  save() {
    if (!this.groupForm.valid() || this.isSubmitted || (!this.isNew && !this.id)) {
      return;
    }
    this.isSubmitted = true;
    const value = this.groupForm.value();
    (this.isNew ? this.groupSandbox.create(value) : this.groupSandbox.update(this.id, value))
      .subscribe(
        (resp) => {
          this.groupSandbox.reloadGroups();
          this.notificationService.showNotification(this.isNew ? 'LBL_ACTION.SAVE' : 'LBL_ACTION.UPDATE', "success");
          this.groupSandbox.selectGroup(this.isNew ? resp.id : this.id);
          this.isSubmitted = false;
          this.router.navigate(['groups', this.isNew ? resp.id : this.id]);
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
    this.groupSandbox.delete(this.id).subscribe(
      () => {
        this.notificationService.showNotification('LBL_ACTION.DELETE', "success");
        this.router.navigate(['groups']);
        this.isSubmitted = false;
      },
      () => this.isSubmitted = false
    );
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
