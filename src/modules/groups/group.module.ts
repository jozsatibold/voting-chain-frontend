import {groupRoutes} from "./group.routing";
import {groupsReducer} from "./+state/groups.reducer";
import {GroupsEffects} from "./+state/groups.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GroupsComponent} from "./containers/groups/groups.component";
import {GroupListComponent} from "./containers/group-list/group-list.component";
import {GroupComponent} from "@groups/containers/group/group.component";
import {GroupDetailComponent} from "@groups/containers/group-detail/group-detail.component";
import {GroupMembersComponent} from "@groups/containers/group-members/group-members.component";
import {GroupFormComponent} from "@groups/containers/group-form/group-form.component";

const containers = [
  GroupsComponent,
  GroupListComponent,
  GroupComponent,
  GroupDetailComponent,
  GroupMembersComponent,
  GroupFormComponent
];

const components = [];

const modules = [
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule.forChild(),
  RouterModule.forChild(groupRoutes),
  StoreModule.forFeature('groups', groupsReducer),
  EffectsModule.forFeature([GroupsEffects])
];

@NgModule({
  imports: [...modules],
  declarations: [...components, ...containers]
})
export class GroupsModule {
}
