import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BoardsPipe } from './filters/boards.pipe';
import { MainModule } from './main/main.module';
import { ErrorInterceptor } from './services/auth/error.interceptor';
import { JwtInterceptor } from './services/auth/jwt.interceptor';
import { reducer as notification } from './store/reducer/notifications.reducer';
import { reducer as responsive } from './store/reducer/screen.reducer';
import { reducer as menu } from './store/reducer/sideMenu.reducer';
import { reducer as update } from './store/reducer/updateColumn.reducer';
import { ButtonModule } from './utils/button/button.module';
import { ConfirmModule } from './utils/confirm/confirm.module';
import { InlineEditorModule } from './utils/inline-editor/inline-editor.module';
import { SearchModule } from './utils/search/search.module';
import { SkeletonModule } from './utils/skeleton/skeleton.module';
import { ToastsModule } from './utils/toasts/toasts.module';
import { ModalNewWordComponent } from './views/translate/moda-new-word/moda-new-word.component';
import { TranslateComponent } from './views/translate/translate.component';





@NgModule({
  declarations: [
    AppComponent,
    BoardsPipe,
    TranslateComponent,
    ModalNewWordComponent,
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
      responsive,
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
