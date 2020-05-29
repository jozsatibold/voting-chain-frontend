import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthorizationComponent} from "./containers/authorization/authorization.component";
import {AuthGuard} from "../modules/global/guards";
import {LoginComponent} from "./containers/login/login.component";
import {RegistrationComponent} from "./containers/registration/registration.component";
import {HomeComponent} from "./containers/home/home.component";
import {PageNotFoundComponent} from "@shared/components/page-not-found/page-not-found.component";
import {ProfileComponent} from "./containers/profile/profile.component";

const routes: Routes = [
  {
    path: 'authorization',
    component: AuthorizationComponent,
    canActivate: [AuthGuard],
    data: {unauthorizedMode: true},
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {path: '**', redirectTo: 'login'}
    ]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'votes'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'groups',
        loadChildren: () => import('../modules/groups/group.module').then(module => module.GroupsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'votes',
        loadChildren: () => import('../modules/vote/vote.module').then(module => module.VoteModule),
        canActivate: [AuthGuard]
      },
      {path: '**', component: PageNotFoundComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}
