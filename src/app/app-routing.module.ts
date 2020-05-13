import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthorizationComponent} from "./containers/authorization/authorization.component";
import {AuthGuard} from "../modules/global/guards";
import {LoginComponent} from "./containers/login/login.component";
import {RegistrationComponent} from "./containers/registration/registration.component";
import {HomeComponent} from "./containers/home/home.component";

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
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
