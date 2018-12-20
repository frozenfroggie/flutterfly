import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken: string;
  authService;
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  oldToken = localStorage.getItem('access_token');

  constructor(private injector: Injector) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + token)
    });
    return authReq;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const accessToken = this.authService.getAuthorizationToken();
    const authReq = this.addToken(req, accessToken);
    return <any>next.handle(authReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handle401Error(req, next);
          } else {
            return throwError(err);
          }
        }
      }
      ));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);
      return this.authService.refreshToken()
        .pipe(switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            this.isRefreshingToken = false;
            const authReq = this.addToken(req, newToken);
            return next.handle(authReq);
          }
        }))
    } else {
      return this.tokenSubject
        .pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            const authReq = this.addToken(req, token);
            return next.handle(authReq);
          })
        );
    }
  }
}
