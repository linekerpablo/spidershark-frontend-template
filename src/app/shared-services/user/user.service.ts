import { IUserRegister } from '../../shared-models/request/userregister.request.model';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RouteUtils } from 'app/utils/route-utils';
import { ActionUser } from 'app/utils/action-utils';
import { environment } from 'environments/environment';
import { ITrocarSenha } from 'app/shared-models/request/trocar.senha.request.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _route = RouteUtils.Usuarios;
    private _alterarSenha = ActionUser.AlterarSenha;

    constructor(private http: HttpClient) {}

    public post(request: IUserRegister) {
        return this.http.post(`${environment.url_api}${this._route}`, request).pipe(tap(res => {}));
    }

    public alterarSenha(request: ITrocarSenha) {
        return this.http
            .put(`${environment.url_api}${this._route}${this._alterarSenha}`, request)
            .pipe(tap(res => {}));
    }
}
