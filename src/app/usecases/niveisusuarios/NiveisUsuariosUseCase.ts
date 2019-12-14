import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AcaoNiveisUsuarios } from 'app/utils/action-utils';
import { INiveisUsuariosResposta } from 'app/shared-models/response/niveisusuarios.resposta.model';

@Injectable({
  providedIn: 'root'
})
export class NiveisUsuariosUseCase {
  private _route = RouteUtils.NiveisUsuarios;
  private _buscarNivelUsuario = AcaoNiveisUsuarios.BuscarNivelUsuario;

  constructor(private _http: HttpClient) { }

  public execute(usuarioId: number) {
    return this._http.get(`${environment.url_api}${this._route}${this._buscarNivelUsuario}${usuarioId}`)
    .pipe(
      map((res: INiveisUsuariosResposta) => {
        return res;
      })
    );
  }
}
