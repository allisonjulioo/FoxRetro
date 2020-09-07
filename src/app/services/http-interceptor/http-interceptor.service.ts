import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toasts/toasts.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private toastService: ToastService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      setHeaders: {
        'x-access-token': this.cookieService.get('utok'),
        uid: this.cookieService.get('uid'),
      },
    });
    return next.handle(clonedRequest).pipe(
      map((res: HttpResponse<any>) => {
        const body = res.body;
        if (body) {
        }
        if (res.status === 401 || res.status === 0) {
          this.cookieService.deleteAll();
          console.log(res.status);
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastService.show(error.message, {
          delay: 3000,
          autohide: true,
          type: 'error',
        });
        this.cookieService.deleteAll();
        console.log('error ', error);
        return throwError(error);
      })
    );
  }
}
