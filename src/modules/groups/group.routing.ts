import {Routes} from "@angular/router";
import {GroupsComponent} from "./containers/groups/groups.component";
import {GroupListComponent} from "./containers/group-list/group-list.component";
import {GroupComponent} from "./containers/group/group.component";
import {GroupDetailComponent} from "@groups/containers/group-detail/group-detail.component";
import {GroupFormComponent} from "@groups/containers/group-form/group-form.component";
import {StoreEraseResolver} from "@groups/resolver/store-erase-resolver.service";

export const groupRoutes: Routes = [
  {path: 'new', component: GroupFormComponent, resolve: {store: StoreEraseResolver}},
  {
    path: '', component: GroupsComponent,
    children: [
      {
        path: '', component: GroupListComponent
      },
      {
        path: ':id', component: GroupComponent,
        children: [
          {path: '', component: GroupDetailComponent},
          {path: 'edit', component: GroupFormComponent},
          {path: '**', redirectTo: ''}
        ]
      }
    ]
  }
];
