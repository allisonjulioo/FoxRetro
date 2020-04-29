import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastsModule } from './utils/toasts/toasts.module';
import { AuthModule } from './auth/auth.module';
import { ConfirmModule } from './utils/confirm/confirm.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ButtonModule } from './utils/button/button.module';
import { SkeletonModule } from './utils/skeleton/skeleton.module';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { InlineEditorModule } from './utils/inline-editor/inline-editor.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { reducer as update } from './store/reducer/updateColumn.reducer';
import { reducer as resposive } from './store/reducer/screen.reducer';
import { reducer as menu } from './store/reducer/sideMenu.reducer';
import { reducer as notification } from './store/reducer/notifications.reducer';

import { AppComponent } from './app.component';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { ErrorInterceptor } from './services/auth/error.interceptor';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { BoardsPipe } from './filters/boards.pipe';
import { TranslateComponent } from './views/translate/translate.component';
import { ModaNewWordComponent } from './views/translate/moda-new-word/moda-new-word.component';
import { SearchModule } from './utils/search/search.module';


@NgModule({
  declarations: [
    AppComponent,
    BoardsPipe,
    TranslateComponent,
    ModaNewWordComponent,
  ],
  imports: [
    AuthModule,
    MainModule,
    ButtonModule,
    SearchModule,
    InlineEditorModule,
    SkeletonModule,
    ConfirmModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({
      update,
      resposive,
      menu,
      notification
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    DeviceDetectorModule.forRoot(),
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
