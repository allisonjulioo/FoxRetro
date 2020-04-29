import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './views/register/register.component';
import { RemindComponent } from './views/remind/remind.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'remind', component: RemindComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
