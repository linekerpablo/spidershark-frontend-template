import { IAuthLocalStorage } from './../shared-models/response/auth.localstorage.model';
import 'rxjs/add/operator/map';
import {
    HttpClient
} from '@angular/common/http';
import { Login, Logout } from '../state/app.actions';
import { shareReplay, tap } from 'rxjs/operators';
import { ActionUtils } from '../utils/action-utils';
import { AuthState } from '../state/app.state';
import { AuthUser } from '../shared-models/request/auth.user.request.model';
import { DataSharingService } from './data-sharing.service';
import { Injectable } from '@angular/core';
import { RouteUtils } from '../utils/route-utils';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { IUserAuthResponse } from 'app/shared-models/response/auth.user.response.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _route = RouteUtils.Usuarios;
    private _action = ActionUtils.Auth;
    private _logarPeloSistema = ActionUtils.LogarPeloSistema;
    private _actionEsqueciMinhaSenha = ActionUtils.EsqueciMinhaSenha;

    private authLocalStorage: IAuthLocalStorage = {} as IAuthLocalStorage;

    constructor(
        private http: HttpClient,
        private router: Router,
        private _store: Store,
        private _dataSharingService: DataSharingService
    ) {}

    isLoggedIn() {
        return this._store.selectSnapshot(AuthState.token);
    }

    get() {
        return this.http.get(environment.url_api + this._route).pipe(
            map(response => {
                return response;
            })
        );
    }

    public login(authUser: AuthUser) {
        return this.http
            .post<IUserAuthResponse>(
                environment.url_api + this._route + this._action,
                authUser
            )
            .pipe(
                tap((res: IUserAuthResponse) => {
                    this._store.dispatch(
                        new Login({ token: res.token, userName: res.email })
                    );

                    this.authLocalStorage.nome = res.nome;
                    this.authLocalStorage.email = res.email;
                    this.authLocalStorage.usuarioId = res.usuarioId;
                    this.authLocalStorage.fotoDePerfil = res.fotoDePerfil;

                    localStorage.setItem(
                        'contaLogada',
                        JSON.stringify(this.authLocalStorage)
                    );

                    this._dataSharingService.authStorage.next(this.authLocalStorage);
                }),
                shareReplay()
            );
    }

    public logarPeloSistema(authUser: AuthUser) {
        return this.http
            .post<IUserAuthResponse>(
                environment.url_api + this._route + this._logarPeloSistema,
                authUser
            )
            .pipe(
                tap((res: IUserAuthResponse) => {
                    localStorage.removeItem('contaLogada');

                    this._store.dispatch(
                        new Login({ token: res.token, userName: res.email })
                    );

                    this.authLocalStorage.nome = res.nome;
                    this.authLocalStorage.email = res.email;
                    this.authLocalStorage.usuarioId = res.usuarioId;
                    this.authLocalStorage.fotoDePerfil = res.fotoDePerfil;

                    localStorage.setItem(
                        'contaLogada',
                        JSON.stringify(this.authLocalStorage)
                    );

                    this._dataSharingService.authStorage.next(this.authLocalStorage);
                }),
                shareReplay()
            );
    }

    forgotPassword(authUser: AuthUser) {
        return this.http
            .get(
                `${environment.url_api}${this._route}${this._actionEsqueciMinhaSenha}?email=${authUser.Email}`
            )
            .map((response: IUserAuthResponse) => {
                return response;
            });
    }

    public logout(returnUrl: string = null) {
        localStorage.removeItem('contaLogada');
        this._store.dispatch(new Logout());
        this.router.navigate(['pages/auth/login'], {
            queryParams: { returnUrl: returnUrl }
        });
    }
}
