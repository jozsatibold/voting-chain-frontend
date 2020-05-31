import {Routes} from "@angular/router";
import {VoteListComponent} from "./containers/vote-list/vote-list.component";
import {VoteComponent} from "./containers/vote/vote.component";
import {VoteDetailComponent} from "@vote/containers/vote-detail/vote-detail.component";
import {VoteFormComponent} from "@vote/containers/vote-form/vote-form.component";

export const voteRoutes: Routes = [

  {
    path: '', component: VoteListComponent
  },
  { path: 'new', component: VoteFormComponent},
  {
    path: ':id', component: VoteComponent,
    children: [
      {
        path: '', component: VoteDetailComponent
      },
      {
        path: 'edit', component: VoteFormComponent
      }
    ]
  }
];
