import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './services/auth/auth.guard';
import { TranslateComponent } from './views/translate/translate.component';

const routes: Routes = [
  { path: 'auth/login', component: AuthComponent, pathMatch: 'full' },
  { path: 'main', component: MainComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'i18n/translate', component: TranslateComponent, pathMatch: 'full'  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
