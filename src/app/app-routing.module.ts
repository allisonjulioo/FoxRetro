import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TranslateComponent } from './views/translate/translate.component';

const routes: Routes = [
  { path: 'auth/login', component: AuthComponent, pathMatch: 'full' },
  { path: 'i18n/translate', component: TranslateComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
