import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { RemindComponent } from './views/remind/remind.component';
import { ButtonModule } from './../utils/button/button.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsModule } from '../utils/toasts/toasts.module';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    RemindComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    ToastsModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

