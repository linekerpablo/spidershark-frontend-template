import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/shared-services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService,
        private _authService: AuthService
    ) {}
    errorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
    errorMessageTitle = 'Atenção';
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response instanceof HttpErrorResponse) {
                    if (
                        response.url.indexOf('https://www.instagram.com') === -1
                    ) {
                        switch (response.status) {
                            case 401:
                                {
                                    this.toastr.error(
                                        'Login expirado, faça login novamente',
                                        'Opa'
                                    );
                                }
                                this._authService.logout();
                                return throwError(response);
                            case 0:
                                {
                                    this.toastr.error(
                                        this.errorMessage,
                                        this.errorMessageTitle
                                    );
                                }
                                return throwError(response);
                            case 400:
                                if (response.error) {
                                    this.toastr.error(
                                        response.error,
                                        this.errorMessageTitle
                                    );
                                } else {
                                    this.toastr.error(
                                        this.errorMessage,
                                        this.errorMessageTitle
                                    );
                                }
                                return throwError(response);
                            case 404:
                                if (response.error) {
                                    this.toastr.error(
                                        response.error,
                                        this.errorMessageTitle
                                    );
                                } else {
                                    this.toastr.error(
                                        this.errorMessage,
                                        this.errorMessageTitle
                                    );
                                }
                                return throwError(response);
                        }
                    }
                }
            })
        );
    }
}
