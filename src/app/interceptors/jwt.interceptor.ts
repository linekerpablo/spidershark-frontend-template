import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/app.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _store: Store) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this._store.selectSnapshot(AuthState.token);
      
      if (!request.headers.has('Content-Type')) {
        if (token) {
          request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`)});
        } else {
          request = request.clone({
            setHeaders: {
                ContentType: 'application/json'
            }
        });
        }
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      }

      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
      return next.handle(request);
    }
}
