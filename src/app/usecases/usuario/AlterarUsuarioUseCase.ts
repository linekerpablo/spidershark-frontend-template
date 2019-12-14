import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IAlterarUsuario } from 'app/shared-models/request/alterar.usuario.request.model';

@Injectable({
  providedIn: 'root'
})
export class AlterarUsuarioUseCase {
  private _route = RouteUtils.Usuarios;

  constructor(private _http: HttpClient) { }

  public execute(request: IAlterarUsuario) {
    return this._http.put(`${environment.url_api}${this._route}${request.UsuarioId}`, request).pipe(tap(res => { }));
  }
}
