import {voteRoutes} from "./vote.routing";
import {votesReducer} from "./+state/votes.reducer";
import {VotesEffects} from "./+state/votes.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {VoteListComponent} from "./containers/vote-list/vote-list.component";
import {VoteDetailComponent} from "@vote/containers/vote-detail/vote-detail.component";
import {VoteComponent} from "@vote/containers/vote/vote.component";
import {VoteFormComponent} from "@vote/containers/vote-form/vote-form.component";

const containers = [
  VoteListComponent,
  VoteDetailComponent,
  VoteComponent,
  VoteFormComponent
];

const components = [
];

const entries = [];

const modules = [
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule.forChild(),
  RouterModule.forChild(voteRoutes),
  StoreModule.forFeature('votes', votesReducer),
  EffectsModule.forFeature([VotesEffects])
];

@NgModule({
  imports: [...modules],
  declarations: [...components, ...containers, ...entries]
})
export class VoteModule {
}
